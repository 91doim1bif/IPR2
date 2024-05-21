const path = require("path");

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  entry: {
    main: "./src/index.ts",
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "app-bundle.js",
    publicPath: "/", // Ensures that the file paths are relative to the base path
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "images", // Where to put images, relative to the output dir
              publicPath: "images", // Where to access images from the browser
              name: "[name].[ext]", // Maintain the original file name
            },
          },
        ],
      },
    ],
  },
};
