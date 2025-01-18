const { merge } = require(`webpack-merge`);
const common = require(`./webpack.common.js`);
const { EnvironmentPlugin } = require("webpack");
require("dotenv").config();

module.exports = merge(common, {
  mode: `development`,
  devtool: "eval-source-map",
  devServer: {
    watchFiles: ["./src/template.html"],
  },
  plugins: [
    new EnvironmentPlugin({
      API_KEY: process.env.WEATHER_API_KEY,
      API_URL: process.env.WEATHER_API,
    }),
  ],
});
