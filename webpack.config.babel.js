import { resolve } from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { getIfUtils, removeEmpty } from 'webpack-config-utils';

const src = resolve(__dirname, './src');

export default (env) => {
  const { ifNotProduction } = getIfUtils(env);
  return {
    entry: './src/index.jsx',
    output: {
      path: `${__dirname}/dist`,
      publicPath: '/',
      filename: 'bundle.js'
    },
    resolve: {
      alias: {
        css: resolve(src, './css'),
        components: resolve(src, './components')
      },
      modules: ['node_modules', 'bower_components', 'src'],
      extensions: ['.js', '.css', '.less', '.jsx', '.json']
    },
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: 'eslint-loader'
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.less$/,
          use: removeEmpty([
            ifNotProduction('css-hot-loader'),
            MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'less-loader',
              options: {
                relativeUrls: false
              }
            }
          ])
        }
      ]
    },
    plugins: removeEmpty([
      ifNotProduction(new webpack.HotModuleReplacementPlugin()),
      new MiniCssExtractPlugin({
        filename: 'css/main.css',
        chunkFilename: 'css/main.css'
      }),
      new HtmlWebpackPlugin({
        title: 'React Intrnship',
        filename: 'index.html',
        template: './src/index.html',
        minify: {
          html5: true,
          removeComments: true,
          useShortDoctype: true,
          removeTagWhitespace: true,
          removeStyleLinkTypeAttributes: true,
          removeScriptTypeAttributes: true,
          removeRedundantAttributes: true,
          processConditionalComments: true,
          minifyCSS: true,
          minifyJS: true,
          keepClosingSlash: true,
          collapseWhitespace: true
        },
        hash: true
      })
    ]),
    devServer: {
      host: 'localhost',
      port: 3000,
      hot: true,
      before(app) {
        app.get('/api/users', (req, res) => setTimeout(
          () => res.json([
            {
              firstName: 'John',
              lastName: 'Smith',
              age: 35
            },
            {
              firstName: 'Chuck',
              lastName: 'Norris',
              age: 75
            },
            {
              firstName: 'Johny',
              lastName: 'Depp',
              age: 50
            },
            {
              firstName: 'Andew',
              lastName: 'Anderson',
              age: 34
            }
          ]),
          5000
        ));
      }
    },
    devtool: 'source-map'
  };
};
