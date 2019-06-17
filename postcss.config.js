module.exports = {
    plugins: [
      require('autoprefixer'),
      require('css-mqpacker'), //media query packer: сжимает все медиа запросы 
      require('cssnano')
    ]
  }