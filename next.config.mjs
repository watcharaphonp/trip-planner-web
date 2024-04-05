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
    env: {
      appTitle: 'Trip Planner',
      appName: 'trip-planner',
      appDescription: 'Description here',
      backendUrl: 'http://localhost:3001'
    },
};

export default nextConfig;
