const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './scripts/script.js', // Entry point file path
  output: {
    filename: 'bundle.js',
    path: __dirname + '/scripts'
  },
  plugins: [
    new Dotenv(),
  ],
};