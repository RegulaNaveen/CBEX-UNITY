const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, 'src/index.jsx'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [{
            exclude: /node_modules/,
            test: /\.(js|jsx)$/,
            loader: 'babel-loader'
        },
        {
            test: /\.(js|jsx)$/,
            enforce: 'pre',
            loader: 'eslint-loader',
            options: {
                emitWarning: true
            }
        },
        {
            test: /\.s[ac]ss$/i,
            use: [
                // Creates `style` nodes from JS strings
                'style-loader',
                // Translates CSS into CommonJS
                'css-loader',
                // Compiles Sass to CSS
                'sass-loader',
            ],
        },]
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        port: 8080,
        historyApiFallback: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "src/index.html"
        })
    ]
};