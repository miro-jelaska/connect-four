module.exports = {
    entry: './app/scripts/main.ts',
    output: {
        filename: './build/scripts/main.js'
    },
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
    },
    module: {
        loaders: [
            { test: /\.ts$/, loader: 'ts-loader' }
        ]
    }
};