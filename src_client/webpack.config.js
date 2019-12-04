const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');



module.exports = (env, argv) => ({
  entry: ['./src_client/index.js', './src_client/scss/style.scss'],
  output: {
    path: path.resolve(__dirname, '../dist_client'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.txt$/, use: 'raw-loader'
      },

      // See https://developerhandbook.com/webpack/how-to-configure-scss-modules-for-webpack/
      {
        test: /\.s?[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: argv.mode === 'development',
            },
          },
          {
            loader: 'css-loader',
            options: {
              modules: true, // exports class names like ._2WFZLb-WTBN6_FU-2qmMZc
              sourceMap: argv.mode === 'development',
            }
          },
          'postcss-loader',
          'sass-loader',
        ],

      },
      {
          test: /\.(woff|woff2|eot|ttf)$/,
          use: [
             { loader: 'file-loader' }
           ]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({ template: './src_client/assets/index.html' }),
    new MiniCssExtractPlugin(),
  ],
  devServer: {
    historyApiFallback: true
  }
});
