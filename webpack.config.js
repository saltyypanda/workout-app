const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = [
    {
        // First configuration for openai.min.js
        entry: './index.ts',
        module: {
            rules: [
                {
                    test: /\.ts?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        output: {
            filename: 'openai.min.js',
            path: path.resolve(__dirname, 'dist'),
            globalObject: 'this',
            library: {
                name: 'OpenAI',
                type: 'umd',
            }
        }
    },
    {
        // Second configuration for openai.module.min.js
        entry: './index.ts',
        module: {
            rules: [
                {
                    test: /\.ts?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        output: {
            filename: 'openai.module.min.js',
            path: path.resolve(__dirname, 'dist'),
            library: {
                type: 'module',
            },
        },
        experiments: {
            outputModule: true
        }
    },
    {
        // Third configuration for your own script.js
        entry: './scripts/script.js', // Entry point file path
        output: {
            filename: 'bundle.js',
            path: __dirname + '/scripts'
        },
        plugins: [
            new Dotenv(),
        ],
    }    
];