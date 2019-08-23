const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')


//plugin 可以在webpack运行到某一时刻的时候，帮你做一些事情

module.exports = {
    mode:'development',
    // entry: path.resolve(__dirname, 'src/index'),   //单页应用
    devtool: 'cheap-module-source-map',  // 开发环境定位到第几行错误
    entry: {
        main: path.resolve(__dirname, 'src/index'),
        // hello: path.resolve(__dirname, 'src/index')   //多文件上传
    },
    output: {
        // publicPath:'./',  //这个属性和HtmlWebpackPlugin联合用  引入的资源文件中加路径  生产环境下采用这个属性   这个属性是引入外部js时用的
        filename: '[name].js',  //文件名
        path: path.resolve(__dirname, 'dist/dist') //打包到指定路径  __dirname值当前文件所在路径
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.jpg|.png$/,
                use: {
                    loader: 'url-loader',   //把图片 转换成 base64
                    options: {
                        name: "[name]_[hash].[ext]",  //打包后图片文件名 name:打包的前的文件名  ext：后缀名
                        outputPath: 'images',         //打包到指定目录
                        limit: 204800,                   //如果图片大于2048bit 会打包到指定文件夹（上面两个属性才有效） 反之把图片 转换成 base64 
                    }
                }
            },
            {
                //打包字体文件
                test: /\.(eot|ttf|svg|woff)$/,
                use: {
                    loader: 'file-loader'
                }
            },
            {
                //loader执行顺序，从数组最后一个从下往上执行
                //css-loader 是css支持@import
                //style-loader 使index 加一个style标签
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                    { loader: 'postcss-loader' }

                ]
                // use:['style-loader','css-loader','sass-loader']
            },
            {
                //loader执行顺序，从数组最后一个从下往上执行
                //css-loader 是css支持@import
                //style-loader 使index 加一个style标签
                test: /\.scss$/,
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,  //如果是@import 的scss文件 ，如果没有配置importLoaders 将不会经过sass-loader 和 postcss-loader的编译 
                            modules: true      //指的是 css只作用在改js文件模块上
                        }
                    },
                    { loader: 'postcss-loader' },
                    { loader: 'sass-loader' }
                ]
                // use:['style-loader','css-loader','sass-loader']
            }
        ]
    },
    plugins: [
        //html-webpack-plugin 在打包文件夹内生成一个index.html  并把output生成的js 加入到页面中
        new HtmlWebpackPlugin({
            template: "./index.html"   //生成的index.html的模板  并把output生成的js 加入到页面中  两个index.html 一模一样 只不过多了对output的引入
        }),
        new CleanWebpackPlugin(),   //在打包之前把打包目录下的文件先删掉
        new webpack.HotModuleReplacementPlugin()
    ],
    optimization:{
        usedExports:true    //treeShaking去重无用代码  (开发环境)  
    },
    devServer: {
        //(都是在内存中，看不到的)
        contentBase: path.resolve(__dirname),   //指定服务器访问的文件在哪个目录下
        // publicPath:'/dist /output/',             //指定打包到服务器下的哪个目录下
        open: true,   //自动打开浏览器
        hot: true, //热替换    浏览器更新代码不会刷新页面
        hotOnly: true
    }


}