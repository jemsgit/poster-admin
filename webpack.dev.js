const path = require('path');
const webpack = require('webpack');
const config = require('./config');
const useMocks = process.env.UI_MOCK == 1;
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: ['./src/ui/index.tsx'],
  devtool:'inline-source-map',
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
      config: webpack.DefinePlugin.runtimeValue(
        () => JSON.stringify(config.client),
        // Passing the second argument as `true` reevaluates the defined expression.
        // Beware that this disables module caching and must be used with caution.
        true,
      ),
      useMocks: useMocks,
      version: '"test_env"',
      tag: '"1.2.3"'
    })
  ],
  devServer: {
    static: path.join(__dirname, 'dist'),
    compress: true,
    port: 8080,
    liveReload: true,
    historyApiFallback: true,
    open: true,
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    },
    proxy: {
      '/api': 'http://localhost:3000'
    }
}
}