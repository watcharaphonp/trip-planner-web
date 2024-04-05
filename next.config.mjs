import path from 'path';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

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
      appTitle: process.env.APP_TITLE,
      appName: process.env.APP_NAME,
      appDescription: process.env.APP_DESCRIPTION,
      backendUrl: process.env.BACKEND_URL
    },
};

export default nextConfig;
