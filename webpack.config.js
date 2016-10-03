import webpack from 'webpack';
import path from 'path'

module.exports = {
  entry: {
    'main': `${__dirname}/_dev/js/main`,
    'vendor': [
      'three',
      'gsap',
      'pixi.js',
      'velocity-animate',
    ]
  },
  output: {
    path: `${__dirname}/assets/js/`,
    filename: '[name].bundle.js'
  },
  node: {
    fs: 'empty'
  },
  module: {
    loaders: [
      {
        test: /\.json$/,
        include: path.join(__dirname, 'node_modules', 'pixi.js'),
        loader: 'json',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      }
    ],
    postLoaders: [
      {
        include: path.resolve(__dirname, 'node_modules/pixi.js'),
        loader: 'ify'
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery',
      "window.jQuery": "jquery",
      THREE: 'three',
      PIXI: 'pixi.js',
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

