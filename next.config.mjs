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
      backendUrl: 'https://4555-2405-9800-b920-46c6-9465-e3e3-e66-d1bf.ngrok-free.app'
    },
};

export default nextConfig;
