module.exports = {
  chainWebpack: config => {
    config.plugin('define').tap(args => {
      args[0]['process.env'].BASE_URL = JSON.stringify(process.env.BASE_URL)

      return args
    })
  },
  css: {
    loaderOptions: {
      scss: {
        // 配置全局scss变量
        prependData: '@import "~@/style/variate.scss";'
      }
    }
  },
  // 修改启动端口，因8080被公司限制，无法本地调试
  devServer: {
    port: 8081
  }
}
