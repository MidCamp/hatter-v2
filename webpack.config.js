const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const globImporter = require('node-sass-glob-importer');

// Conditionally return a list of plugins to use based on the current environment.
function getPlugins() {
    var plugins = [];

    // Always expose NODE_ENV to webpack, you can now use `process.env.NODE_ENV`
    // inside your code for any environment checks;
    plugins.push(new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }
    }));

    // If we decide to bundle js we'll need to enable this if we want to use jQuery or
    // Drupal.behaviors
    /*
    plugins.push(new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        Drupal: 'Drupal',
        drupalSettings: 'drupalSettings',
    }));
    */

    plugins.push(new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: 'css/[name].bundle.css'
    }));

    // Conditionally add plugins for Production builds.
    // Enable if we bundle JS
    /*if (process.env.NODE_ENV === 'production') {
        // Uglify JS
        plugins.push(new UglifyJsPlugin({
            cache: true,
            parallel: true,
            uglifyOptions: {
                warnings: true,
                mangle: true,
                output: { comments: false }
            },
            sourceMap: false
        }));
    }*/

    return plugins;
}

module.exports = {
    devtool: 'source-map',
    entry: {
        /**
         * At some point we may need to introduce 'babel-polyfill' to the base entry below if we intend to use more
         * advanced ES2015+ built-ins like Promise or WeakMap, static methods like Array.from or Object.assign.
         *
         * See https://babeljs.io/docs/usage/polyfill/
         */
        base: ['./source/scss/styles.scss']
    },
    mode: process.env.NODE_ENV || 'development',
    module: {
        rules: [
            // Enable if we bundle js.
            // https://webpack.js.org/loaders/eslint-loader/
            /*{
                test: /\.js$/,
                enforce: 'pre', // preload the eslint loader
                exclude: [path.resolve(__dirname, 'node_modules/'),path.resolve(__dirname, 'holly-hunt-portal/')],
                use: {
                    loader: 'eslint-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },
            {
                test: /\.js$/,
                exclude: [path.resolve(__dirname, 'node_modules/'),path.resolve(__dirname, 'holly-hunt-portal/')],
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },*/
            {
                test: /\.css$/,
                exclude: [path.resolve(__dirname, 'node_modules/')],
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.scss$/,
                exclude: [path.resolve(__dirname, 'node_modules/')],
                use: [
                    { loader: MiniCssExtractPlugin.loader },
                    { loader: 'css-loader', options: { importLoaders: 1, sourceMap: true } },
                    { loader: 'postcss-loader', options: { sourceMap: true } },
                    { loader: 'sass-loader',
                        options: {
                          sassOptions: {
                            precision: 8,
                            sourceMap: true,
                            importer: globImporter()
                          }
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'css/images',
                            publicPath: 'images',
                        },
                    },
                ],
            },
            {
                test: /\.(otf|woff)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'css/fonts',
                            publicPath: 'fonts',
                        },
                    },
                ],
            },
        ]
    },
    output: {
        filename: 'js/[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: getPlugins()
};
