var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: ['webpack/hot/dev-server', path.resolve(__dirname, 'src/')],
    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath:'/',
        filename: 'js/bundle.js'
    },
    module: {
        loaders: [
            {
             test: /\.(less|css)$/,
             loader: ExtractTextPlugin.extract('css!autoprefixer!less')
            }, 
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react']
                }

            }, 
            {
                 test: /\.(jpe?g|gif|png|ico|svg)$/,
                 loader: 'url?limit=1000&name=images/[name].[ext]'
                 //  loader: 'url?limit=1000&name=images/[name].[hash:4].[ext]'
           }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
         filename: "index.html", // 生成html存放的路径
         inject: 'body', // 允许插件修改哪些内容，包括head与body
         template: "./src/index.html", // html模板路径
         hash:true, //为静态资源生成hash值
         minify:{   //压缩HTML文件
            removeComments:true,    //移除HTML中的注释
            collapseWhitespace:true //删除空白符与换行符
          }
        }),
        new ExtractTextPlugin('css/app.min.css'),
        new webpack.ProvidePlugin({
            $: "jquery", //引入插件jquery
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
        new webpack.ProvidePlugin({ //加载reqwest
            reqwest: 'reqwest'
        }),
        new webpack.optimize.UglifyJsPlugin({
         compressor: {
           warnings: false,
           screw_ie8: true
         }
        })

    ]
};