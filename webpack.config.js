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
            },
            {
                include: path.resolve(__dirname, 'node_modules/pixi.js'),
                loader: 'ify-loader'
            },
        ],
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
        new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: 'vendor.bundle.js'}),
    ],
};

