const path = require('path');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const {VueLoaderPlugin} = require('vue-loader');

module.exports = env => {
  const isProduction = env.NODE_ENV==='production';
  const isOptimize   = env.optimize==='true'
  const config = {
    entry: {
      main: path.resolve('src/ui/widget/HeaderLine.vue'),
      vendor: [
                'element-ui',
                'lodash',
                'reflect-metadata',
                'util',
                'vue',
                'vue-class-component',
                'vue-property-decorator',
                'vuex'
              ]
    },
    output: {
      filename: 'webpack.[name].modern_bundle.js',
      chunkFilename: 'webpack.[name].extension_bundle.js',
      path: path.resolve('web-published'),
      libraryTarget: 'umd'
    },
    module: {
      rules: [{
        test: /.tsx?$/,
        loader: 'ts-loader',
        include: [
          path.resolve('src')
        ],
        options: {
          appendTsSuffixTo: [/\.vue$/]
        }
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          extractCSS: isProduction?false:false  // disabled for now.  When enabled, this fails.  need to investigate.
        }
      },
      {
        test: /\.css$|\.scss$/,
        use: [
          { loader: "vue-style-loader" },      // injects style tags into the HTML
          { loader: "css-loader" },            // all CSS transformations including SASS etc.
        ],      
        include: [
          path.resolve('src'), path.resolve('node_modules')
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader'
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader'
      }    
    ]
    },
    resolve: {
      // so that module resolution is relative to the source directory
      modules: [path.resolve('src'), 'node_modules'],
      alias: {
        'vue$': 'vue/dist/vue.esm.js' // full vue lib.  We need the full view library with the template compiler
                                      // since we have some Vue components dynamically created in code vs .vue files.
      },
      extensions: ['.json', '.ts', '.js', '.css', '.vue']
    },
    devtool: 'source-map',

    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        // Extract all 3rd party modules into a separate 'vendor' chunk
        minChunks: (module) => /node_modules/.test(module.context),
      }),    
      new webpack.optimize.CommonsChunkPlugin({
        name: 'bootstrap' // contains webpack module loader runtime
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(env.NODE_ENV)  
      }),
      new ExtractTextPlugin('vue-components.css'),
      new VueLoaderPlugin()
    ],

    stats: {
      chunks:true
    },

    // configuration used when running webpack-dev-server
    devServer: {
      clientLogLevel: 'info',
      host: 'localhost',
      port: 8080,
      overlay: { warnings: true, errors: true },
      historyApiFallback: {
        index: 'web-test/index.html'
      },
      hot: true  // use the HotModuleReplacementPlugin for granular live reloading
    }
  };

  return config;
};

