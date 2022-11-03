const path = require("path");
const webpack = require("webpack");

module.exports = {
    entry: "./src/index.tsx",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader",
                ]
            }
        ]
    },

    mode: "development",

    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },

    devServer: {
        static: {
            directory: path.join(__dirname, "dist"),
        },
        liveReload: false,
        hot: true,
        port: 3000
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],


    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist")
    }
};