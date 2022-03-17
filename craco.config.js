const path = require('path')

// 导入 postcss的插件
const pxToViewport = require('postcss-px-to-viewport')
// 配置插件 传入 视口的宽度
const vw = pxToViewport({
  // 视口宽度，一般就是 375（ 设计稿一般采用二倍稿，宽度为 375 ）
  viewportWidth: 375,
})
module.exports = {
  // 此处省略 webpack 配置
  webpack: {
    // 配置别名
    alias: {
      // 约定：使用 @ 表示 src 文件所在路径
      '@': path.resolve(__dirname, 'src'),
      '@scss': path.resolve(__dirname, 'src', 'assets', 'style'),
    },
  },
  devServer: {
    host: '0.0.0.0',
  },
  // 样式相关的配置
  style: {
    // postcss的配置
    // 后处理
    // less/sass-->写对应的代码-->解析为css
    // postcss--->css-->返回处理之后的css
    postcss: {
      // 配置插件
      plugins: [vw],
    },
  },
}
