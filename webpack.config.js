const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const extractSASS = new ExtractTextPlugin('[name].css');

module.exports = {
  context: path.join(__dirname, '/src/model'),
  entry: { 
    calculator: './index.js'
  },

  output: {
    path: path.join(__dirname + '/public'),
    filename: '[name].bundle.js',    
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
    extractSASS
  ]
}
