const presets = ["@babel/preset-react", "@babel/preset-env"];
const plugins = [
  "@babel/plugin-transform-runtime",
  "@babel/plugin-proposal-object-rest-spread",
  "@babel/plugin-proposal-class-properties",
  "@babel/plugin-syntax-dynamic-import",
  "@babel/plugin-proposal-export-default-from",
  "@babel/plugin-proposal-optional-chaining",
  "lodash",
  "dva-hmr",
  ["import", { 
    "libraryName": "antd", 
    "style": (name) => `${name.replace('/lib/', '/es/')}/style`
  }, "antd"],
  ["import", { "libraryName": "@ant-design/icons", "libraryDirectory": "lib/icons", "camel2DashComponentName": false }, "@ant-design/icons"],
  ["import", { "libraryName": "@qt/web-core", "camel2DashComponentName": false }, "@qt/web-core"],
  ["import", { "libraryName": "@qt/react", "camel2DashComponentName": false }, "@qt/react"],
];

module.exports = { presets, plugins, comments: false };