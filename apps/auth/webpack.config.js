const Dotenv = require('dotenv-webpack');
const path = require('path');

module.exports = (config) => {
  const envPath = path.resolve(__dirname, '../../.env');

  config.plugins = config.plugins || [];
  config.plugins.push(
    new Dotenv({
      path: envPath,
      systemvars: true,
      silent: true,
      expand: true,
      allowEmptyValues: true,
    })
  );

  return config;
};

