import webpack from 'webpack';

module.exports = {
  entry: {
    'main': `${__dirname}/_dev/js/main`,
    'vendor': [
      'three',
      'gsap',
      'velocity-animate',
    ]
  },
  output: {
    path: `${__dirname}/assets/js/`,
    filename: '[name].bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      THREE: 'three',
      TweenMax: 'gsap',
      Velocity: 'velocity-animate',
    }),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
    /*
     *new webpack.optimize.OccurenceOrderPlugin(),
     *new webpack.DefinePlugin({
     *  'process.env': {
     *    'NODE_ENV': JSON.stringify('production')
     *  }
     *}),
     */
    /*
     *new webpack.optimize.UglifyJsPlugin({
     *  output: {
     *    comments: '@license',
     *  },
     *  compressor: {
     *    warnings: false
     *  }
     *})
     */
  ],
};

