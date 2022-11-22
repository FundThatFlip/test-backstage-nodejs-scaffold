/** @type {import('next').NextConfig} */
const remotes = require('./micro-frontends');
const NextFederationPlugin = require('@module-federation/nextjs-mf');
const deps = require('./package.json').dependencies;

const nextConfig = {
  reactStrictMode: true,
  env: {
    DOMAIN: `${process.env.DOMAIN}`,
    COGNITO_DOMAIN: process.env.COGNITO_DOMAIN,
    COGNITO_POOL: process.env.COGNITO_POOL,
    CLIENT_ID: process.env.CLIENT_ID,
  },
  distDir: '.next',
  webpack: (config, options) => {
    config.experiments = {
      topLevelAwait: true,
      layers: true
    };

    config.module.rules = [
      ...config.module.rules,
      // ensure our libs barrel files don't constitute imports
      {
        test: /src\/.*index.ts/i,
        sideEffects: false,
      },
    ];

    config.plugins.push(
      new NextFederationPlugin({
        name: 'global_spa',
        filename: 'static/chunks/remoteEntry.js',
        remotes,
        shared: {
          react: {
            singleton: true,
            requiredVersion: deps.react,
          },
          "react-dom": {
            singleton: true,
            requiredVersion: deps["react-dom"],
          }
        }
      })
    );
    return config;
  }
};

module.exports = nextConfig;
