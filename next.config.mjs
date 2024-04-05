import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
    swcMinify: true,
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
      config.module.rules.push(
        {
          test: /\.md$/,
          type: 'asset/source',
        }
      )

    //   config.externals = [...config.externals, 'hnswlib-node']; 
      return config
    },
};

export default nextConfig;
