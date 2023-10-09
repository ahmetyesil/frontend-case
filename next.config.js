const webpack = require("webpack");
const nextTranslate = require("next-translate-plugin");
require("dotenv").config({ path: `${process.env.ENVIRONMENT}` });
module.exports = nextTranslate({
  images: {
    domains: [
      "localhost",
      "dev-meeting.telepati.live",
      "test-meeting.telepati.live",
    ],
  },
  reactStrictMode: false,
  poweredByHeader: false,
  eslint: {
    ignoreDuringBuilds: true,
  },

  webpack(config, options) {
    const { isServer } = options;
    config.module.rules.push({
      test: /\.(ogg|mp3|wav|mpe?g)$/i,
      exclude: config.exclude,
      use: [
        {
          loader: require.resolve("url-loader"),
          options: {
            limit: config.inlineImageLimit,
            fallback: require.resolve("file-loader"),
            publicPath: `${config.assetPrefix}/_next/static/images/`,
            outputPath: `${isServer ? "../" : ""}static/images/`,
            name: "[name]-[hash].[ext]",
            esModule: config.esModule || false,
          },
        },
      ],
    });
    config.plugins.push(new webpack.EnvironmentPlugin(process.env));

    return config;
  },
});
