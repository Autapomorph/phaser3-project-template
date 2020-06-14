const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const OfflinePlugin = require('offline-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const commonConfig = require('./common');

process.env.NODE_ENV = 'production';

module.exports = (env = {}) =>
  merge.smart(commonConfig, {
    mode: 'production',
    output: {
      filename: '[name].[contenthash].js',
      chunkFilename: '[name].[contenthash].js',
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new CopyPlugin({
        patterns: [
          {
            from: 'assets',
            to: 'assets',
          },
        ],
      }),
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
        chunkFilename: '[name].[contenthash].css',
      }),
      new OfflinePlugin({
        responseStrategy: 'network-first',
        caches: {
          main: [':rest:'],
          additional: [':externals:'],
          optional: ['favicons/**/*'],
        },
        safeToUseOptionalCaches: true,
        ServiceWorker: {
          events: true,
        },
      }),
      new BundleAnalyzerPlugin({ analyzerMode: env.analyze ? 'server' : 'disabled' }),
    ],
    optimization: {
      moduleIds: 'hashed',
      runtimeChunk: true,
      splitChunks: {
        chunks: 'all',
      },
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
      maxEntrypointSize: 1 * 1024 * 1024,
      maxAssetSize: 1 * 1024 * 1024,
    },
    stats: {
      all: false,
      assets: true,
      excludeAssets: [/assets/, /favicons/],
    },
  });
