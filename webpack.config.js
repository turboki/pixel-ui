const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
    output: {
        filename: 'static/js/main.js',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            },
            {
                test: /\.(jpg|png|svg)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        name: 'static/images/[name].[ext]'
                    }
                },
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }, {
                    loader: "sass-loader"
                }]
            },
            {
                test: /\.css$/,
                use: [{
                    loader: "style-loader"
                },{
                    loader: 'css-loader'
                }]
            },
            {
                test: /\.(woff|woff2|ttf|eot)$/,
                loader: 'file-loader',
                options: {
                    name: 'static/fonts/[name].[ext]'
                },
                include: /node_modules/
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        })
    ]
};