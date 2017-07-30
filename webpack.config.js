const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const extractSASS = new ExtractTextPlugin('[name].css');
const webpack = require('webpack');
const webpackHMR = new webpack.HotModuleReplacementPlugin();

module.exports = {
  entry: {
    app: path.join(__dirname, './src/webpack_entry.js'),
  },
  output: {
    path: path.join(__dirname + '/public'),
    filename: '[name].bundle.js',
    publicPath: 'http://localhost:8080/public/'
  },
  devServer: {
    hot: true,
    inline: true,
    contentBase: ['./src'],
    publicPath: 'http://localhost:8080/public/'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' }
          //{ loader: 'postcss-loader' }
        ]
      },
      {
        test: /\.scss$/,
        // use: defaultSassLoader,
        use: extractSASS.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          { loader: 'babel-loader' }
        ],
        include: [
          path.resolve(__dirname, 'src')
        ],
      }
    ]
  },
  plugins: [
    extractSASS,
    webpackHMR
  ]
}
