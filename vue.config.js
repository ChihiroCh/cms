const path = require('path');
module.exports = {
  publicPath: '/cms-manage/',
  outputDir: 'dist',
  assetsDir: 'assets',
  devServer: {
    host: '127.0.0.1',
    port: 3000,
    open: true,
    openPage: 'cms-manage/'
  },
  chainWebpack: config => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal'];
    types.forEach(type =>
      addStyleResource(config.module.rule('less').oneOf(type))
    );
    // 设置别名
    config.resolve.alias.set('@', path.resolve(__dirname, './src'));
  }
};

function addStyleResource(rule) {
  rule
    .use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [path.resolve(__dirname, './src/styles/mixin.less')]
    });
}
