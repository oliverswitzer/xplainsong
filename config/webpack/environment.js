const webpack = require('webpack');

const { environment } = require('@rails/webpacker');

environment.config.resolve.alias = {
  wavesurfer: require.resolve('wavesurfer.js')
};

module.exports = environment;