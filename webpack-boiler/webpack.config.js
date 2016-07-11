const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const validate = require('webpack-validator');

// plugin configs
const parts = require('./libs/parts');

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build')
};

const common = {
  entry: {
    app: PATHS.app
  },
  output: {
    path: PATHS.build,
    filename: '[name].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack demo'
    })
  ]
};

var config;

// Detect how npm is run and branch based on that
switch(process.env.npm_lifecycle_event) {
  case 'build':

    config = merge(
      common,
      {
        devtool: 'source-map'
      },
      // set up our css from our app path
      parts.setupCSS(PATHS.app)
    );
    break;
  default:
    config = merge(
      common,

      {
        devtool: 'eval-source-map'
      },
      parts.setupCSS(PATHS.app),
      parts.devServer({
        //customize host/port here if needed
        host: process.env.HOST,
        port: process.env.PORT
      })
    );
}

module.exports = validate(config);
