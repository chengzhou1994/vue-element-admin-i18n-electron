/******/ ;(function(modules) {
  // webpackBootstrap
  /******/ // The module cache
  /******/ var installedModules = {} // The require function
  /******/
  /******/ /******/ function __webpack_require__(moduleId) {
    /******/
    /******/ // Check if module is in cache
    /******/ if (installedModules[moduleId]) {
      /******/ return installedModules[moduleId].exports
      /******/
    } // Create a new module (and put it into the cache)
    /******/ /******/ var module = (installedModules[moduleId] = {
      /******/ i: moduleId,
      /******/ l: false,
      /******/ exports: {}
      /******/
    }) // Execute the module function
    /******/
    /******/ /******/ modules[moduleId].call(module.exports, module, module.exports, __webpack_require__) // Flag the module as loaded
    /******/
    /******/ /******/ module.l = true // Return the exports of the module
    /******/
    /******/ /******/ return module.exports
    /******/
  } // expose the modules object (__webpack_modules__)
  /******/
  /******/
  /******/ /******/ __webpack_require__.m = modules // expose the module cache
  /******/
  /******/ /******/ __webpack_require__.c = installedModules // define getter function for harmony exports
  /******/
  /******/ /******/ __webpack_require__.d = function(exports, name, getter) {
    /******/ if (!__webpack_require__.o(exports, name)) {
      /******/ Object.defineProperty(exports, name, { enumerable: true, get: getter })
      /******/
    }
    /******/
  } // define __esModule on exports
  /******/
  /******/ /******/ __webpack_require__.r = function(exports) {
    /******/ if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
      /******/ Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' })
      /******/
    }
    /******/ Object.defineProperty(exports, '__esModule', { value: true })
    /******/
  } // create a fake namespace object // mode & 1: value is a module id, require it // mode & 2: merge all properties of value into the ns // mode & 4: return value when already ns object // mode & 8|1: behave like require
  /******/
  /******/ /******/ /******/ /******/ /******/ /******/ __webpack_require__.t = function(value, mode) {
    /******/ if (mode & 1) value = __webpack_require__(value)
    /******/ if (mode & 8) return value
    /******/ if (mode & 4 && typeof value === 'object' && value && value.__esModule) return value
    /******/ var ns = Object.create(null)
    /******/ __webpack_require__.r(ns)
    /******/ Object.defineProperty(ns, 'default', { enumerable: true, value: value })
    /******/ if (mode & 2 && typeof value != 'string')
      for (var key in value)
        __webpack_require__.d(
          ns,
          key,
          function(key) {
            return value[key]
          }.bind(null, key)
        )
    /******/ return ns
    /******/
  } // getDefaultExport function for compatibility with non-harmony modules
  /******/
  /******/ /******/ __webpack_require__.n = function(module) {
    /******/ var getter =
      module && module.__esModule
        ? /******/ function getDefault() {
            return module['default']
          }
        : /******/ function getModuleExports() {
            return module
          }
    /******/ __webpack_require__.d(getter, 'a', getter)
    /******/ return getter
    /******/
  } // Object.prototype.hasOwnProperty.call
  /******/
  /******/ /******/ __webpack_require__.o = function(object, property) {
    return Object.prototype.hasOwnProperty.call(object, property)
  } // __webpack_public_path__
  /******/
  /******/ /******/ __webpack_require__.p = '' // Load entry module and return exports
  /******/
  /******/
  /******/ /******/ return __webpack_require__((__webpack_require__.s = 0))
  /******/
})(
  /************************************************************************/
  /******/ {
    /***/ './src/main/background.js':
      /*!********************************!*\
  !*** ./src/main/background.js ***!
  \********************************/
      /*! no exports provided */
      /***/ function(module, __webpack_exports__, __webpack_require__) {
        'use strict'
        eval(
          "__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron */ \"electron\");\n/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);\n\n\n\nconst isDevelopment = \"development\" !== 'production'\nglobal.appDirname = __dirname\n\n// Scheme must be registered before the app is ready\nelectron__WEBPACK_IMPORTED_MODULE_0__[\"protocol\"].registerSchemesAsPrivileged([{ scheme: 'app', privileges: { secure: true, standard: true } }])\nconst path = __webpack_require__(/*! path */ \"path\")\nasync function createWindow() {\n  // Create the browser window.\n  const baseDirPath = path.resolve(__dirname, '..')\n\n  console.log('11111')\n  console.log('Creating a linked script..', baseDirPath)\n  let size = electron__WEBPACK_IMPORTED_MODULE_0__[\"screen\"].getPrimaryDisplay().workAreaSize\n  let width = parseInt(size.width * 0.9)\n  let height = parseInt(size.height * 0.9)\n  const win = new electron__WEBPACK_IMPORTED_MODULE_0__[\"BrowserWindow\"]({\n    devTools: true,\n    width: width,\n    height: height,\n    icon: path.resolve(__dirname, './logo.png'),\n    movable: true, //????????????\n    minimizable: true, //???????????????\n    maximizable: true, //???????????????\n    fullscreen: false, //MAC?????????????????????\n    skipTaskbar: false, //???????????????????????????\n    acceptFirstMouse: true, //???????????????????????????????????????\n    show: false,\n    // frame: false,\n    // titleBarStyle: 'hiddenInset', // macOS ????????????????????? ?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????\n    webPreferences: {\n      // Use pluginOptions.nodeIntegration, leave this alone\n      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info\n      nodeIntegration: false,\n      contextIsolation: false,\n      webSecurity: false,\n      enableRemoteModule: true,\n      webviewTag: true // Boolean (??????) - ???????????? <webview> tag??????. ???????????? false.\n    }\n  })\n\n  win.on('ready-to-show', function() {\n    win.show() // ?????????????????????\n  })\n\n  // ???????????????\n  win.webContents.on('did-finish-load', function() {\n    win.webContents.send('loaded', win.getMaximumSize())\n  })\n\n  // ?????????\n  electron__WEBPACK_IMPORTED_MODULE_0__[\"ipcMain\"].on('minimize', () => {\n    try {\n      win.minimize()\n    } catch (err) {\n      console.log(err)\n    }\n  })\n\n  // ?????????\n  electron__WEBPACK_IMPORTED_MODULE_0__[\"ipcMain\"].on('maximize', () => {\n    try {\n      win.maximize()\n    } catch (err) {\n      console.log(err)\n    }\n  })\n\n  // ??????\n  electron__WEBPACK_IMPORTED_MODULE_0__[\"ipcMain\"].on('unmaximize', () => {\n    try {\n      win.unmaximize()\n    } catch (err) {\n      console.log(err)\n    }\n  })\n\n  // ????????????\n  electron__WEBPACK_IMPORTED_MODULE_0__[\"ipcMain\"].on('close', () => {\n    try {\n      win.close()\n    } catch (err) {\n      console.log(err)\n    }\n  })\n\n  if (true) {\n    // Load the url of the dev server if in development mode\n    console.log('????????????:', \"http://localhost:9527/\")\n    await win.loadURL(\"http://localhost:9527/\")\n    if (!process.env.IS_TEST) win.webContents.openDevTools()\n  } else {}\n}\n\n// ??????????????????\nelectron__WEBPACK_IMPORTED_MODULE_0__[\"app\"].commandLine.appendSwitch('ignore-certificate-errors')\n\n// Quit when all windows are closed.\nelectron__WEBPACK_IMPORTED_MODULE_0__[\"app\"].on('window-all-closed', () => {\n  // On macOS it is common for applications and their menu bar\n  // to stay active until the user quits explicitly with Cmd + Q\n  if (process.platform !== 'darwin') {\n    electron__WEBPACK_IMPORTED_MODULE_0__[\"app\"].quit()\n  }\n})\n\nelectron__WEBPACK_IMPORTED_MODULE_0__[\"app\"].on('activate', () => {\n  // On macOS it's common to re-create a window in the app when the\n  // dock icon is clicked and there are no other windows open.\n  if (electron__WEBPACK_IMPORTED_MODULE_0__[\"BrowserWindow\"].getAllWindows().length === 0) createWindow()\n})\n\n// This method will be called when Electron has finished\n// initialization and is ready to create browser windows.\n// Some APIs can only be used after this event occurs.\nelectron__WEBPACK_IMPORTED_MODULE_0__[\"app\"].on('ready', async () => {\n  if (isDevelopment && !process.env.IS_TEST) {\n    // ?????? Vue Devtools\n    loadVueDevTools()\n    // ???????????????\n    registerToggleDevTools()\n  }\n  createWindow()\n})\n\n// ????????????????????????????????????\nelectron__WEBPACK_IMPORTED_MODULE_0__[\"ipcMain\"].on('quit', () => {\n  electron__WEBPACK_IMPORTED_MODULE_0__[\"app\"].quit()\n})\n\n// Exit cleanly on request from parent process in development mode.\nif (isDevelopment) {\n  if (process.platform === 'win32') {\n    process.on('message', data => {\n      if (data === 'graceful-exit') {\n        electron__WEBPACK_IMPORTED_MODULE_0__[\"app\"].quit()\n      }\n    })\n  } else {\n    process.on('SIGTERM', () => {\n      electron__WEBPACK_IMPORTED_MODULE_0__[\"app\"].quit()\n    })\n  }\n}\n\n// ??????vue???????????????\nfunction loadVueDevTools() {\n  electron__WEBPACK_IMPORTED_MODULE_0__[\"session\"].defaultSession\n    .loadExtension(path.join(__dirname, './devTools/vue-devtools'))\n    .then(res => {\n      console.log('Vue Devtools loaded successfully')\n    })\n    .catch(err => {\n      console.error('Vue Devtools failed to install:', err.toString())\n    })\n}\n\n// ??????????????????????????????????????????\nfunction registerToggleDevTools() {\n  electron__WEBPACK_IMPORTED_MODULE_0__[\"globalShortcut\"].register('Command Or Control+Shift+i', function() {\n    electron__WEBPACK_IMPORTED_MODULE_0__[\"BrowserWindow\"].getFocusedWindow().webContents.toggleDevTools()\n  })\n}\n\n\n//# sourceURL=webpack:///./src/main/background.js?"
        )

        /***/
      },

    /***/ 0:
      /*!**************************************!*\
  !*** multi ./src/main/background.js ***!
  \**************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        eval(
          'module.exports = __webpack_require__(/*! E:\\vue-element-admin-i18n-electron\\src\\main\\background.js */"./src/main/background.js");\n\n\n//# sourceURL=webpack:///multi_./src/main/background.js?'
        )

        /***/
      },

    /***/ electron:
      /*!***************************!*\
  !*** external "electron" ***!
  \***************************/
      /*! no static exports found */
      /***/ function(module, exports) {
        eval('module.exports = require("electron");\n\n//# sourceURL=webpack:///external_%22electron%22?')

        /***/
      },

    /***/ path:
      /*!***********************!*\
  !*** external "path" ***!
  \***********************/
      /*! no static exports found */
      /***/ function(module, exports) {
        eval('module.exports = require("path");\n\n//# sourceURL=webpack:///external_%22path%22?')

        /***/
      }

    /******/
  }
)
