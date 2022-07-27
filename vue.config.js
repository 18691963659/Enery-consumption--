const path = require('path')
const resolve = dir => {
    return path.join(__dirname, dir)
}
const webpack = require('webpack')
module.exports = {

    publicPath: './',
    chainWebpack: config => {
        config.resolve.alias
            .set('_c', resolve('src/components')) // key,value自行定义，比如.set('@@', resolve('src/components'))

        config.plugin('provide').use(webpack.ProvidePlugin, [{
            $: 'jquery',
            jquery: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }])
    },

    devServer: {
        host: "",
        port: "",
        https: false,
        open: true,
        proxy: {
            '/api': {
                target: 'http://www.nmc.cn', // 你请求的第三方接口
                changeOrigin: true,
                autoRewrite: true,
                ws: true,
                cookieDomainRewrite: true,
                /* 在本地会创建一个虚拟服务端，然后发送请求的数据，
                         并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题 */
                pathRewrite: { // 路径重写，
                    /* 替换target中的请求地址，也就是说以后你在请求
                    http://127.0.0.1:8888/api/private/v1/这个地址的时候直接写成/api/即可。 */

                    '^/api': '',
                }
            }
        },
    },


}