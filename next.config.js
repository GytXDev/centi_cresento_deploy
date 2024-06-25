const withVideos = require('next-videos')

module.exports = withVideos({
  reactStrictMode: true, 
  swcMinify: true, 
  distDir: 'build',
  webpack(config, options) {
    return config
  }
})
