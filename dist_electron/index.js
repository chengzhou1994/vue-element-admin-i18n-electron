/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/main/background.js":
/*!********************************!*\
  !*** ./src/main/background.js ***!
  \********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron */ \"electron\");\n/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);\n\r\nconst path = __webpack_require__(/*! path */ \"path\")\r\n\r\n// import { preload } from 'preload/preload.js'\r\nconst isDevelopment = \"development\" !== 'production'\r\n// const renderProcessApi = path.join(__dirname, '/preload/preload.js')\r\n// Scheme must be registered before the app is ready\r\nelectron__WEBPACK_IMPORTED_MODULE_0__[\"protocol\"].registerSchemesAsPrivileged([{ scheme: 'app', privileges: { secure: true, standard: true } }])\r\n\r\nasync function createWindow() {\r\n  // Create the browser window.\r\n  const baseDirPath = path.resolve(__dirname, '..')\r\n  console.log('11111')\r\n  console.log('Creating a linked script..', baseDirPath)\r\n  let size = electron__WEBPACK_IMPORTED_MODULE_0__[\"screen\"].getPrimaryDisplay().workAreaSize\r\n  let width = parseInt(size.width * 0.9)\r\n  let height = parseInt(size.height * 0.9)\r\n  const win = new electron__WEBPACK_IMPORTED_MODULE_0__[\"BrowserWindow\"]({\r\n    width: width,\r\n    height: height,\r\n    // frame: false,\r\n    // titleBarStyle: 'hiddenInset', // macOS 下独有的无边框 返回一个隐藏标题栏的全尺寸内容窗口，在左上角仍然有标准的窗口控制按钮（俗称“红绿灯”）\r\n    webPreferences: {\r\n      // Use pluginOptions.nodeIntegration, leave this alone\r\n      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info\r\n      nodeIntegration: false,\r\n      contextIsolation: false,\r\n      webSecurity: false,\r\n      enableRemoteModule: true\r\n    }\r\n    // show: false\r\n  })\r\n\r\n  win.on('ready-to-show', function() {\r\n    win.show() // 初始化后再显示\r\n  })\r\n\r\n  // 页面加载完\r\n  win.webContents.on('did-finish-load', function() {\r\n    win.webContents.send('loaded', win.getMaximumSize())\r\n  })\r\n\r\n  // 最小化\r\n  electron__WEBPACK_IMPORTED_MODULE_0__[\"ipcMain\"].on('minimize', () => {\r\n    try {\r\n      win.minimize()\r\n    } catch (err) {\r\n      console.log(err)\r\n    }\r\n  })\r\n\r\n  // 最大化\r\n  electron__WEBPACK_IMPORTED_MODULE_0__[\"ipcMain\"].on('maximize', () => {\r\n    try {\r\n      win.maximize()\r\n    } catch (err) {\r\n      console.log(err)\r\n    }\r\n  })\r\n\r\n  // 还原\r\n  electron__WEBPACK_IMPORTED_MODULE_0__[\"ipcMain\"].on('unmaximize', () => {\r\n    try {\r\n      win.unmaximize()\r\n    } catch (err) {\r\n      console.log(err)\r\n    }\r\n  })\r\n\r\n  // 关闭窗口\r\n  electron__WEBPACK_IMPORTED_MODULE_0__[\"ipcMain\"].on('close', () => {\r\n    try {\r\n      win.close()\r\n    } catch (err) {\r\n      console.log(err)\r\n    }\r\n  })\r\n\r\n  if (true) {\r\n    // Load the url of the dev server if in development mode\r\n    console.log('加载页面:', \"http://localhost:9527/\")\r\n    await win.loadURL(\"http://localhost:9527/\")\r\n    if (!process.env.IS_TEST) win.webContents.openDevTools()\r\n  } else {}\r\n}\r\n\r\n// 忽略无效证书\r\nelectron__WEBPACK_IMPORTED_MODULE_0__[\"app\"].commandLine.appendSwitch('ignore-certificate-errors')\r\n\r\n// Quit when all windows are closed.\r\nelectron__WEBPACK_IMPORTED_MODULE_0__[\"app\"].on('window-all-closed', () => {\r\n  // On macOS it is common for applications and their menu bar\r\n  // to stay active until the user quits explicitly with Cmd + Q\r\n  if (process.platform !== 'darwin') {\r\n    electron__WEBPACK_IMPORTED_MODULE_0__[\"app\"].quit()\r\n  }\r\n})\r\n\r\nelectron__WEBPACK_IMPORTED_MODULE_0__[\"app\"].on('activate', () => {\r\n  // On macOS it's common to re-create a window in the app when the\r\n  // dock icon is clicked and there are no other windows open.\r\n  if (electron__WEBPACK_IMPORTED_MODULE_0__[\"BrowserWindow\"].getAllWindows().length === 0) createWindow()\r\n})\r\n\r\n// This method will be called when Electron has finished\r\n// initialization and is ready to create browser windows.\r\n// Some APIs can only be used after this event occurs.\r\nelectron__WEBPACK_IMPORTED_MODULE_0__[\"app\"].on('ready', async () => {\r\n  if (isDevelopment && !process.env.IS_TEST) {\r\n    // 安装 Vue Devtools\r\n    loadVueDevTools()\r\n    // 注册快捷键\r\n    registerToggleDevTools()\r\n  }\r\n  createWindow()\r\n})\r\n\r\n// 监听从渲染进程发来的消息\r\nelectron__WEBPACK_IMPORTED_MODULE_0__[\"ipcMain\"].on('quit', () => {\r\n  electron__WEBPACK_IMPORTED_MODULE_0__[\"app\"].quit()\r\n})\r\n\r\n// Exit cleanly on request from parent process in development mode.\r\nif (isDevelopment) {\r\n  if (process.platform === 'win32') {\r\n    process.on('message', data => {\r\n      if (data === 'graceful-exit') {\r\n        electron__WEBPACK_IMPORTED_MODULE_0__[\"app\"].quit()\r\n      }\r\n    })\r\n  } else {\r\n    process.on('SIGTERM', () => {\r\n      electron__WEBPACK_IMPORTED_MODULE_0__[\"app\"].quit()\r\n    })\r\n  }\r\n}\r\n\r\n// 加载vue开发者工具\r\nfunction loadVueDevTools() {\r\n  electron__WEBPACK_IMPORTED_MODULE_0__[\"session\"].defaultSession\r\n    .loadExtension(path.join(__dirname, './devTools/vue-devtools'))\r\n    .then(res => {\r\n      console.log('Vue Devtools loaded successfully')\r\n    })\r\n    .catch(err => {\r\n      console.error('Vue Devtools failed to install:', err.toString())\r\n    })\r\n}\r\n\r\n// 注册快捷键切换打开开发者工具\r\nfunction registerToggleDevTools() {\r\n  electron__WEBPACK_IMPORTED_MODULE_0__[\"globalShortcut\"].register('Command Or Control+Shift+i', function() {\r\n    electron__WEBPACK_IMPORTED_MODULE_0__[\"BrowserWindow\"].getFocusedWindow().webContents.toggleDevTools()\r\n  })\r\n}\r\n\n\n//# sourceURL=webpack:///./src/main/background.js?");

/***/ }),

/***/ 0:
/*!**************************************!*\
  !*** multi ./src/main/background.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! E:\\vue-element-admin-i18n-electron\\src\\main\\background.js */\"./src/main/background.js\");\n\n\n//# sourceURL=webpack:///multi_./src/main/background.js?");

/***/ }),

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"electron\");\n\n//# sourceURL=webpack:///external_%22electron%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ })

/******/ });