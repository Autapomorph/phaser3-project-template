const path = require('path');
const { EnvironmentPlugin } = require('webpack');
const DotenvPlugin = require('dotenv-webpack');
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const FaviconsPlugin = require('favicons-webpack-plugin');
const WebpackBarPlugin = require('webpackbar');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, '..', 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: [/\.vert$/, /\.frag$/],
        type: 'asset/source',
      },
      {
        test: /\.(gif|png|jpe?g|svg|xml)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new DotenvPlugin(),
    new EnvironmentPlugin({
      CANVAS_RENDERER: true,
      WEBGL_RENDERER: true,
    }),
    new ESLintPlugin(),
    new HtmlPlugin({
      template: './src/index.html',
    }),
    new FaviconsPlugin({
      logo: './assets/icons/logo.png',
      prefix: 'favicons/',
      favicons: {
        appName: 'Phaser 3 Project Template',
        start_url: '/',
        display: 'fullscreen',
        background: '#fff',
        theme_color: '#fff',
        icons: {
          coast: false,
          firefox: false,
          windows: false,
          yandex: false,
        },
      },
    }),
    new WebpackBarPlugin(),
    new FriendlyErrorsPlugin(),
  ],
};
