module.exports = {
  target: 'serverless',
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(png|jp(e*)g|svg|gif)$/,
      use: 'file-loader',
    })

    return config
  },
}
