const path = require("path")

function resolve(dir) {
  return path.join(__dirname, dir);
}

const config = {
  chainWebpack: config => {
    config.resolve.alias
      .set("@gif", resolve("gif"))
      .set("@img", resolve("images"))
  },
  css: {
    loaderOptions: {
      less: {
        // DO NOT REMOVE THIS LINE
        javascriptEnabled: true
      }
    }
  },
}

module.exports = config;