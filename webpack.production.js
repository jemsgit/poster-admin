const path = require('path');
const webpack = require('webpack');
const config = require('./config');
const useMocks = process.env.UI_MOCK == 1;
const VERSION = process.env.VERSION;
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  mode: 'production',
  entry: ['./src/ui/index.tsx'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.bundle.js',
  },
  resolve: {
    alias: {
      Components: path.resolve(__dirname, 'src/ui/components'),
      ui: path.resolve(__dirname, 'src/ui'),
    }
  },
  module: {
    rules: [{
      test: /\.(js|ts)x?$/,
      use: [{ loader: require.resolve('ts-loader'), options: {} }],
      resolve: { extensions: [".js", ".jsx", ".tsx", ".ts"] },
      exclude: /node_modules/,
    },
    {
        test: /\.css$/,
        use: ["style-loader", {
          loader: "css-loader",
          options: {
            sourceMap: true,
          },
        }, { loader: "postcss-loader", options: { sourceMap: true } }]
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
        template: "./src/ui/index.html"
    }),
    new webpack.DefinePlugin({
      config: JSON.stringify(config.client),
      useMocks: useMocks,
      version: JSON.stringify(VERSION),
      tag: VERSION
    })
  ]
}