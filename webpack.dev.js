const path = require('path');
const webpack = require('webpack');
const config = require('./config');
const useMocks = process.env.MOCK == 1;
const HtmlWebpackPlugin = require('html-webpack-plugin');

console.log(useMocks)
console.log(config.client)


module.exports = {
  entry: ['./src/index.tsx'],
  devtool:'eval-cheap-module-source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.bundle.js',
  },
  resolve: {
    alias: {
      Components: path.resolve(__dirname, 'src/ui/components')
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
        use: ["style-loader", "css-loader", "postcss-loader"]
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
        template: "./src/index.html"
    }),
    new webpack.DefinePlugin({
      config: JSON.stringify(config.client),
      useMocks: useMocks
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