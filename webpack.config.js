const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    context: path.resolve(__dirname, './src'),
        entry: {
          app: ['./stylesheet/styles.js', './javascript/index.js'],
        },
    output: {
        path: path.resolve(__dirname, './build'),
        filename: 'javascript/bundle.js',
        publicPath: '/',
    },
    devServer: {
        contentBase: path.resolve(__dirname, './src'),
    },
    module: {
        rules: [
          {
            test: /\.js$/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015']
            }
          },
          {
              test: /\.scss$/,
              use: ExtractTextPlugin
                .extract({
                    fallbackLoader: 'style-loader',
                    loader: [
                        { loader: 'css-loader', query: { modules: false, sourceMaps: true } },
                        { loader: 'sass-loader'},
                    ]
                })
          },
          {
              test: /\.(jpe?g|png|gif|svg)$/i,
              loaders: [
                  'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
                  'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
              ]
          }
          // Loaders for other file types can go here
        ],
    },
    node: {
      fs: 'empty'
    },
    plugins: [
        new ExtractTextPlugin({
            filename: 'stylesheet/main.css',
            allChunks: true,
        }),
    ],
}
