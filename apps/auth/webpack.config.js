const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const path = require('path');

module.exports = (config, options) => {
  // Ensure NODE_ENV aligns with Angular build mode
  const mode = options?.buildOptions?.optimization ? 'production' : 'development';
  process.env.NODE_ENV = process.env.NODE_ENV || mode;

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
    })
  );

  // Example: define a build-time flag you can use in code
  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env.TEVET_API': JSON.stringify(process.env.TEVET_API || ''),
      __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
    })
  );

  return config;
};

