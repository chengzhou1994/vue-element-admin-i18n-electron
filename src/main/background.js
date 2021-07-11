'use strict'
const path = require('path')
import { app, protocol, BrowserWindow, session, globalShortcut, ipcMain, Tray, screen } from 'electron'
// import { preload } from 'preload/preload.js'
const isDevelopment = process.env.NODE_ENV !== 'production'
// const renderProcessApi = path.join(__dirname, '/preload/preload.js')
// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{ scheme: 'app', privileges: { secure: true, standard: true } }])

async function createWindow() {
  // Create the browser window.
  const baseDirPath = path.resolve(__dirname, '..')
  console.log('11111')
  console.log('Creating a linked script..', baseDirPath)
  let size = screen.getPrimaryDisplay().workAreaSize
  let width = parseInt(size.width * 0.9)
  let height = parseInt(size.height * 0.9)
  const win = new BrowserWindow({
    width: width,
    height: height,
    frame: false,
    titleBarStyle: 'hiddenInset', // macOS 下独有的无边框 返回一个隐藏标题栏的全尺寸内容窗口，在左上角仍然有标准的窗口控制按钮（俗称“红绿灯”）
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: false,
      webSecurity: false,
      enableRemoteModule: true
      // preload: renderProcessApi
      // preload: path.resolve(__dirname, 'preload.js')
    }
    // show: false
  })

  win.on('ready-to-show', function() {
    win.show() // 初始化后再显示
  })

  // 页面加载完
  win.webContents.on('did-finish-load', function() {
    win.webContents.send('loaded', win.getMaximumSize())
  })

  // 最小化
  ipcMain.on('minimize', () => {
    try {
      win.minimize()
    } catch (err) {
      console.log(err)
    }
  })

  // 最大化
  ipcMain.on('maximize', () => {
    try {
      win.maximize()
    } catch (err) {
      console.log(err)
    }
  })

  // 还原
  ipcMain.on('unmaximize', () => {
    try {
      win.unmaximize()
    } catch (err) {
      console.log(err)
    }
  })

  // 关闭窗口
  ipcMain.on('close', () => {
    try {
      win.close()
    } catch (err) {
      console.log(err)
    }
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    console.log('加载页面:', process.env.WEBPACK_DEV_SERVER_URL)
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
    const cookieInstance = win.webContents.session.cookies
    cookieInstance.on('changed', (e, cookie, cause, removed) => {
      // let obj = { e, cookie, cause, removed }
      win.loadURL('app://./index.html')
    })
  }
}

// 忽略无效证书
app.commandLine.appendSwitch('ignore-certificate-errors')

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // 安装 Vue Devtools
    loadVueDevTools()
    // 注册快捷键
    registerToggleDevTools()
  }
  createWindow()
})

// 监听从渲染进程发来的消息
ipcMain.on('quit', () => {
  app.quit()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', data => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}

// 加载vue开发者工具
function loadVueDevTools() {
  session.defaultSession
    .loadExtension(path.join(__dirname, './devTools/vue-devtools'))
    .then(res => {
      console.log('Vue Devtools loaded successfully')
    })
    .catch(err => {
      console.error('Vue Devtools failed to install:', err.toString())
    })
}

// 注册快捷键切换打开开发者工具
function registerToggleDevTools() {
  globalShortcut.register('Command Or Control+Shift+i', function() {
    BrowserWindow.getFocusedWindow().webContents.toggleDevTools()
  })
}
