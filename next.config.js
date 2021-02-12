const siteConfig = require('./site.config');
const isProd = siteConfig.env.prod;

const nextConfig = () => {
  return {
    reactStrictMode: true,
    images: {
      domains: [],
    },
    webpack(config, options) {
      config.module.rules.push({
        test: /\.svg$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              babel: true,
              svgoConfig: {
                plugins: [
                  {
                    removeViewBox: false,
                    inlineStyles: false,
                  },
                ],
              },
            },
          },
        ],
      });

      isProd &&
        config.module.rules[1].oneOf.forEach((one) => {
          Array.isArray(one.use) &&
            one.use.forEach((l) => {
              if (l.options.modules?.getLocalIdent) {
                delete l.options.modules.getLocalIdent;
                l.options.modules = {
                  ...l.options.modules,
                  localIdentName: '[hash:base64:5]',
                };
              }
            });
        });

      config.output.filename = options.isServer
        ? '[name].js'
        : `static/js/[name]${options.dev ? '' : '-[chunkhash]'}.js`;
      config.output.chunkFilename = options.isServer
        ? `${options.dev ? '[name]' : '[name].[contenthash]'}.js`
        : `static/js/${options.dev ? '[name]' : '[name].[contenthash]'}.js`;

      return config;
    },
  };
};

module.exports = nextConfig;
