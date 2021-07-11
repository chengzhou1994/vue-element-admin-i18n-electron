'use strict'
const path = require('path')
const defaultSettings = require('./src/renderer/settings.js')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = defaultSettings.title || 'vue Element Admin' // page title

// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following method:
// port = 9527 npm run dev OR npm run dev --port = 9527
const port = process.env.port || process.env.npm_config_port || 9527 // dev port

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    before: require('./mock/mock-server.js')
  },
  configureWebpack: config => {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    config.entry.app = './src/renderer/main.js'
    return {
      name: name,
      resolve: {
        alias: {
          '@': resolve('src/renderer')
        }
      }
    }
  },
  chainWebpack(config) {
    // it can improve the speed of the first screen, it is recommended to turn on preload
    // it can improve the speed of the first screen, it is recommended to turn on preload
    config.plugin('preload').tap(() => [
      {
        rel: 'preload',
        // to ignore runtime.js
        // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: 'initial'
      }
    ])

    // when there are many pages, it will cause too many meaningless requests
    config.plugins.delete('prefetch')

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/renderer/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/renderer/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    config.when(process.env.NODE_ENV !== 'development', config => {
      config
        .plugin('ScriptExtHtmlWebpackPlugin')
        .after('html')
        .use('script-ext-html-webpack-plugin', [
          {
            // `runtime` must same as runtimeChunk name. default is `runtime`
            inline: /runtime\..*\.js$/
          }
        ])
        .end()
      /*      config.plugin('copy').tap(args => [
        [
          {
            from: './preload',
            to: 'preload',
            toType: 'dir',
            ignore: ['index.html', '.DS_Store']
          },
          {
            from: './public',
            to: 'public',
            toType: 'dir',
            ignore: ['index.html', '.DS_Store']
          }
        ]
      ]) */
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial' // only package third parties that are initially dependent
          },
          elementUI: {
            name: 'chunk-elementUI', // split elementUI into a single package
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
          },
          commons: {
            name: 'chunk-commons',
            test: resolve('src/components'), // can customize your rules
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true
          }
        }
      })
      // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
      config.optimization.runtimeChunk('single')
    })
  },
  //
  pluginOptions: {
    electronBuilder: {
      mainProcessFile: 'src/main/background.js',
      removeElectronJunk: false, // 移除Electron 有时会产生一堆垃圾输出
      // 打包参数配置
      builderOptions: {
        appId: 'vue-element-admin.com', // 包名
        productName: 'vue-element-admin', // 项目名 这也是生成的exe文件的前缀名
        icon: './public/icons/.ico',
        files: ['**/*', 'static/*'], // 打包的资源无法包含 build 目录
        extraFiles: {
          // from: './preload',
          // to: 'preload'
          // from: 'preload/preload.js',
          // to: 'preload'
        },
        asar: true, //查看打包后的目录结构
        copyright: 'chengzhou', //版权  信息
        compression: 'store', // "store" | "normal"| "maximum" 打包压缩情况(store 相对较快)，store 39749kb, maximum 39186kb
        // 构建win的选项
        mac: {
          icon: './public/icons/app.png', // 自定义图标路径，如果不指定就用electron默认图标
          target: ['zip', 'dmg'], // 目标封装类型，默认使用niss，win平台一般也是用这个，可写可不写
          category: 'com.catpoint-category.utilities'
        },
        linux: {
          icon: './public/icons/app.png'
        },
        // 构建win的选项
        win: {
          // 图标路径 windows系统中icon需要256*256的ico格式图片，更换应用图标亦在此处
          icon: './public/icons/app.ico',
          target: [
            {
              // 打包成一个独立的 exe 安装程序
              target: 'nsis',
              // 这个意思是打出来32 bit + 64 bit的包，但是要注意：这样打包出来的安装包体积比较大
              arch: [
                'x64'
                // 'ia32'
              ]
            }
          ]
          // target: ['zip', 'nsis']
          // arch: ['ia32', 'x64'] // Windows 环境下打出 32 位和 64 位二合一包
        },
        //  niss工具配置，niss一般用来配置安装和卸载程序的，
        nsis: {
          oneClick: false, // 一键安装
          allowElevation: true, // 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。
          allowToChangeInstallationDirectory: true, // 允许修改安装目录
          installerIcon: './public/icons/app.ico', // 安装图标
          uninstallerIcon: './public/icons/app.ico', //卸载图标
          installerHeaderIcon: './public/icons/app.ico', // 安装时头部图标
          createDesktopShortcut: true, // 创建桌面图标
          createStartMenuShortcut: true, // 创建开始菜单图标
          shortcutName: 'chengzhou', // 图标名称
          license: './LICENSE.txt'
        },
        nodeIntegration: true, // 设置开启nodejs环境
        // contextIsolation: false, // electron为12x版本新增此行
        nodeIntegrationInWorker: true // 是否在Web工作器中启用了Node集成
      }
    }
  }
}
