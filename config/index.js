// eslint-disable-next-line import/no-commonjs
const path = require("path");

const config = {
  projectName: "quick-work-taro-app",
  date: "2019-9-17",
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
  },
  alias: {
    "@": path.resolve(__dirname, "..", "src"),
  },
  sourceRoot: "src",
  outputRoot: "dist",
  plugins: {
    babel: {
      sourceMap: true,
      presets: [
        [
          "env",
          {
            modules: false,
          },
        ],
      ],
      plugins: [
        "transform-decorators-legacy",
        "transform-class-properties",
        "transform-object-rest-spread",
      ],
    },
  },
  defineConstants: {},
  copy: {
    patterns: [],
    options: {},
  },
  weapp: {
    module: {
      postcss: {
        autoprefixer: {
          enable: true,
          config: {
            browsers: ["last 3 versions", "Android >= 4.1", "ios >= 8"],
          },
        },
        pxtransform: {
          enable: true,
          config: {},
        },
        url: {
          enable: true,
          config: {
            limit: 409600, // 设定转换尺寸上限
          },
        },
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true , 经本人实测，不建议启用
          config: {
            namingPattern: "module", // 转换模式，取值为 global/module
            generateScopedName: "[name]__[local]___[hash:base64:5]",
          },
        },
      },
    },
  },
  h5: {
    publicPath: "/",
    staticDirectory: "static",
    esnextModules: ["taro-ui"],
    module: {
      postcss: {
        autoprefixer: {
          enable: true,
          config: {
            browsers: ["last 3 versions", "Android >= 4.1", "ios >= 8"],
          },
        },
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: "module", // 转换模式，取值为 global/module
            generateScopedName: "[name]__[local]___[hash:base64:5]",
          },
        },
      },
    },
  },
};

module.exports = function(merge) {
  // eslint-disable-next-line no-process-env
  if (process.env.NODE_ENV === "development") {
    return merge({}, config, require("./dev"));
  }
  return merge({}, config, require("./prod"));
};
