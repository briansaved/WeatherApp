const path = require("path");
const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin"); //default with webpack 4
const CopyPlugin = require("copy-webpack-plugin"); //important for copying filse
// const WorkboxPlugin = require("workbox-webpack-plugin"); //service worker

module.exports = {
  mode: "production",
  entry: "./src/client/index.js",
  optimization: {
    minimizer: [new TerserPlugin({}), new OptimizeCSSAssetsPlugin({})],
  }, //Terser minifies JS and OptimizesCssAssets optimizes css files
  output: {
    libraryTarget: "var",
    library: "Client",
    filename: "[name]-[contentHash].js", //cache busting
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.html$/i,
        use: ["html-loader"],
      },
      {
        test: /\.(svg|jpe?g|gif|png)$/i,
        use: {
          loader: "file-loader",
          options: {
            //filename: "[name]-[hash].[ext]", is default anyway
            outputPath: "images",
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/client/views/index.html",
      filename: "./index.html",
    }),
    new CleanWebpackPlugin({
      // Simulate the removal of files
      dry: true,
      // Write Logs to Console
      verbose: true,
      // Automatically remove all unused webpack assets on rebuild
      cleanStaleWebpackAssets: true,
      protectWebpackAssets: false,
    }),
    new MiniCssExtractPlugin({
      //utputs the CSS files in separate folders
      filename: "[name]-[contentHash].css", //cache busring
    }),
    new CopyPlugin({
      //will copy the icon files to build
      patterns: [
        { from: "src/client/media/icons", to: "src/client/media/icons" },
      ],
    }),
    // new WorkboxPlugin.GenerateSW(), //Service worker
  ],
};
