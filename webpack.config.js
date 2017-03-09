const path = require('path')
const webpack = require("webpack");

let packages = require(path.resolve(__dirname, 'package.json'))
console.log(path.resolve(__dirname, './packages/react-router-dom/modules/index.js'))
module.exports = {
  //context: __dirname + "/app",
  entry: {
      "main": ["./demo/index.js"],
  },
  resolve: {
        modules: ["web_modules", "node_modules", "components", "modules", "less", "stores"],
        extensions: [".js", ".json", ".jsx", ".css", ".less"],
        aliasFields: ["browser"],
        alias: {
          //'react-router-dom': path.resolve(__dirname, './packages/react-router-dom/modules/index.js')
          //'react-router-dom': path.resolve(__dirname, './node_modules/react-router-dom/index.js')
          // 'react': pathToReact,
          // 'react-dom': pathToReactDom,
          // // 'react-router': pathToReactRouter
          // "es6-promise": pathToEs6Promise,
          // "whatwg-fetch": pathToFetch,
          // "fastclick": pathToFastClick,
          // "UAParser": pathToUAParser
        }
    },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    chunkFilename: '[chunkhash].chunk.js',
    publicPath: "/dist",
    libraryTarget: 'umd'

  },
  module: {
    //noParse: [pathToEs6Promise, pathToFetch, pathToFastClick, /ua-parser\.js/],
    rules: [
      {
        test: /\.css$/,
        use: 'style!css'
      },
      // LESS
      {
        test: /\.less$/,//"modifyVars": '+ JSON.stringify(require('./variables.less.js'))  +',
        use: [//'style!css!postcss!less'
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [
                  require('precss'),
                  require('autoprefixer')
                ];
              }
            }
          },
          {
            loader: 'less-loader'
          }
        ]
      },
      // iconfont
      {
        test: /\.((woff2?|svg)(\?v=[0-9]\.[0-9]\.[0-9]))|(woff2?|svg|jpe?g|png|gif|ico)$/,
        use: 'url-loader'
      },
      // iconfont
      {
        test: /\.((ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9]))|(ttf|eot)$/,
        use: 'url-loader'
      },
      {
          test: /\.jsx?$/,// run npm install babel-core babel-preset-es2015 babel-preset-react
          use: {
            loader: 'babel',
            options: {
              presets: ['react', 'es2015', 'stage-1'],
              plugins: [["transform-es2015-modules-commonjs", {//https://babeljs.io/docs/plugins/transform-es2015-modules-commonjs/
                "allowTopLevelThis": true
              }]]
            }
          },
          include: [
            __dirname
            //path.resolve(__dirname, "demo"),
          //  path.resolve(__dirname, "packages")

          ]

     },
    ],
  },
  resolveLoader: {
    modules: ["web_loaders", "web_modules", "node_loaders", "node_modules"],
    moduleExtensions: ['-loader'],
    extensions: ['.js', '.json', '.coffee']
    //include://没有这个配置
  },
  //"node_modules/.bin/webpack-dev-server  --devtool eval --progress --colors --hot --port 80 --inline  --content-base ."
  devServer: {
    contentBase: path.join(__dirname, "demo"),
    watchContentBase: true,
    compress: true,
    port: 80,
    hot: true,// 为什么不起作用
    inline: true,
    watchOptions: {
      aggregateTimeout: 1000,
      poll: true,
      //ignored: // ///node_modules/
    }
  },
  devtool: "inline-source-map",
  plugins: [
    // Promise: 'imports?this=>global!exports?global.Promise!es6-promise',
    // fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch',
    // new webpack.ProvidePlugin({
    //    Promise: 'imports?this=>global!es6-promise',
    //    fetch: 'imports?this=>global!whatwg-fetch',
    // }),
    new webpack.DefinePlugin({
      __DEBUG__: true,
      __VERSION__:  JSON.stringify(packages.version)
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendors",
      // (the commons chunk name)

      filename: "vendors.js",
      // (the filename of the commons chunk)

      minChunks: 3,
      children: true,
      // (Modules must be shared between 3 entries)

      // chunks: ["pageA", "pageB"],
      // (Only use these entries)
    })
    //new webpack.SourceMapDevToolPlugin({})
    //new webpack.optimize.OccurenceOrderPlugin(),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: "vendors",
    //   filename: "vendors.js"
    // }),
  ],
};
