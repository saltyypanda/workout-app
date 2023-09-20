const path = require('path');

module.exports = {
    mode: 'development',
  entry: './src/script.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      // Define aliases for your libraries
      'axios': path.resolve(__dirname, 'node_modules/axios'),
      'dotenv': path.resolve(__dirname, 'node_modules/dotenv'),
      'openai': path.resolve(__dirname, 'node_modules/openai')
    },
    fallback: {
        stream: require.resolve("stream-browserify"),
        buffer: require.resolve("buffer/"),
        crypto: require.resolve("crypto-browserify"),
        os: require.resolve("os-browserify/browser"),
        path: require.resolve('path-browserify')
      }
  }
};