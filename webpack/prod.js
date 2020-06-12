const merge = require('webpack-merge');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const OfflinePlugin = require('offline-plugin');

const base = require('./base');

module.exports = merge.smart(base, {
  mode: 'production',
  output: {
    filename: 'bundle.[contenthash].js',
  },
  devtool: false,
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: 'assets',
          to: 'assets',
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: 'style.[contenthash].css',
    }),
    new OfflinePlugin(),
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: false,
          },
        },
        extractComments: false,
      }),
      new OptimizeCSSAssetsPlugin(),
    ],
  },
  performance: {
    maxEntrypointSize: 900000,
    maxAssetSize: 900000,
  },
  stats: {
    all: false,
    assets: true,
    excludeAssets: [/assets/, /favicons/],
  },
});
