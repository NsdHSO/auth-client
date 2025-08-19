const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const path = require('path');

module.exports = (config, options) => {
  // Load .env from workspace root by default, allow per-app override
  const envPathCandidates = [
    path.resolve(__dirname, '../../.env'), // workspace root
    path.resolve(__dirname, '.env'),       // app-level override
  ];

  const existingEnvPath = envPathCandidates.find((p) => {
    try {
      require('fs').accessSync(p);
      return true;
    } catch (_) {
      return false;
    }
  });

  // Mutate and extend the config
  config.plugins = config.plugins || [];
  config.plugins.push(
    new Dotenv({
      path: existingEnvPath, // if undefined, dotenv-webpack falls back to default .env
      systemvars: true,      // also read from process.env
      silent: true,
      expand: true,
      allowEmptyValues: true,
      allowlist: ['REMOTE_URL', 'TEVET_API_REMOTE']
    })
  );

  // Example: define a build-time flag you can use in code (avoid redefining NODE_ENV)
  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env.REMOTE_LOGIN': JSON.stringify(process.env.REMOTE_URL || ''),
      __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
    })
  );

  return config;
};

