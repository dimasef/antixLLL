const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {VueLoaderPlugin} = require('vue-loader');

const PATHS = {
    src: path.join(__dirname, '../src'),
    dist: path.join(__dirname, '../dist'),
    assets: 'assets/'
}
module.exports = {
    externals: {
        paths: PATHS // передаем константу PATH во вне. 
    },
    // плагины 
    plugins: [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
          filename: `${PATHS.assets}css/[name].[hash].css`
        }),
        new CopyWebpackPlugin([
            { from: `${PATHS.src}/${PATHS.assets}img`, to: `${PATHS.assets}img` },
            { from: `${PATHS.src}/${PATHS.assets}fonts`, to: `${PATHS.assets}fonts` },
            { from: `${PATHS.src}/static`, to: '' }
        ]),
        new HtmlWebpackPlugin({
            template: `${PATHS.src}/index.html`,
            filename: './index.html'
        })
    ],

    entry: {
        app: PATHS.src, //точка входа, по дефолту смотрит в src/index.js
    },
    output: { //точка выхода
        filename: `${PATHS.assets}js/[name].[hash].js`,
        path: PATHS.dist,
        publicPath: '/'
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: {
                    name: 'vendors',
                    test: /node_modules/,
                    chunks: 'all',
                    enforce: true
                },
            }
        }
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: '/node_modules/'
        },
        {
            test: /\.vue$/,
            loader: 'vue-loader',
            options: { 
                loader: {
                    scss: 'vue-style-loader!css-loader!sass-loader'
                }
            }
        },
        {
            test: /\.(png|jpg|gif|svg)$/, 
            loader: 'file-loader',
            options: { name: '[name].[ext]' }
        },
        {
            test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/, 
            loader: 'file-loader',
            options: { name: '[name].[ext]' }
        },
        {
            test: /\.(sa|sc|c)ss$/,
            use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: { sourceMap: true }
                },
                'css-loader',
                {
                    loader: 'sass-loader',
                    options: { sourceMap: true }
                },
                {
                    loader: 'postcss-loader',
                    options: { sourceMap: true }
                },
            ]
        }]
    },
    resolve: {
        alias: {
            '~': 'src',
            'vue$': 'vue/dist/vue.js'
        }
    }
}