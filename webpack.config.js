const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = env => {
  const apiEnv = JSON.stringify(env.API_ENV);

  return {
    entry: ['@babel/polyfill', path.resolve(__dirname, 'src/index.jsx')],
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].[hash].js',
      publicPath: '/'
    },
    module: {
      rules: [
        {
          exclude: /node_modules/,
          test: /\.(js|jsx)$/,
          loader: 'babel-loader'
        },
        {
          test: /\.mjs$/,
          include: /node_modules/,
          type: 'javascript/auto'
        },
        // {
        //   test: /\.(js|jsx)$/,
        //   enforce: 'pre',
        //   loader: 'eslint-loader',
        //   options: {
        //     emitWarning: true
        //   }
        // },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            // Creates `style` nodes from JS strings
            'style-loader',
            // Translates CSS into CommonJS
            'css-loader',
            // Compiles Sass to CSS
            'sass-loader'
          ]
        },
        {
          test: /\.(gif|svg|jpg|png|jpeg)$/,
          loader: 'url-loader'
        },
        {
          test: /\.(otf|ttf|woff|woff2)$/,
          loader: 'file-loader'
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.jsx', '.mjs'],
      fallback: {
        querystring: require.resolve('querystring-es3'),
        'react-error-overlay': '6.0.9'
      }
    },
    devServer: {
      // contentBase: path.resolve(__dirname, 'dist'),
      port: 8080,
      host: 'localhost',
      historyApiFallback: true,
      hot: true
      // open: 'chrome',
      // disableHostCheck: true
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'src/index.html',
        favicon: `./img/favicon/favicon-${apiEnv.replace(/['"]+/g, '')}.ico`
      }),
      new webpack.DefinePlugin({
        'process.env.API_ENV': apiEnv
      }),
      new webpack.EnvironmentPlugin({
        'process.env.API_ENV': apiEnv
      })
    ]
  };
};
