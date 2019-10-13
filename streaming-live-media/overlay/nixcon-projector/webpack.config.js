/* globals __dirname, require, module */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const project_dir = path.resolve(__dirname);
const CopyWebpackPlugin = require("copy-webpack-plugin")

module.exports = (env, argv) => {
	const min = argv.mode === "development" ? "" : ".[chunkhash].min";
	const optimization = {};
	if (argv.mode !== "development") {
		optimization["minimizer"] = [
		];
	}

	return {
		entry: "./app/index.js",
		output: {
			filename: `bundle${min}.js`,
			chunkFilename: `chunk__[name]__${min}.js`,
			path: path.resolve(project_dir, "dist"),
			publicPath: "/",
		},
		plugins: [
			new HtmlWebpackPlugin({
				//favicon: "app/assets/favicon.ico",
				template: "app/assets/index.html"
			}),
			new MiniCssExtractPlugin({
				filename: `[name]${min}.css`,
				chunkFilename: `[id]${min}.css`
			}),
			new CopyWebpackPlugin(
				['avatars/**/*']
			),
		],
		resolve: {
			alias: {
				"@app": path.resolve(project_dir, "app"),
				// Oh, what's this?
				"@library": path.resolve(project_dir, "library"),
			},
			modules: [
				path.resolve(`${project_dir}/node_modules`),
				path.resolve(`${project_dir}/app/modules`),
				path.resolve(`${project_dir}/vendor`),
			]
		},
		devtool: argv.mode === "development" ? "source-map" : "hidden-source-map",
		optimization,
		devServer: {
			historyApiFallback: {
				index: "/",
			},
			proxy: {
				"/api": {
					target: "http://localhost:3000",
					pathRewrite: {"^/api" : ""}
				}
			},
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					use: {
						loader: "buble-loader",
						options: {
							objectAssign: "Object.assign"
						}
					},
				},
				{
					test: /\.css$/,
					use: [
						MiniCssExtractPlugin.loader,
						{
							loader: "css-loader",
							options: {sourceMap: true}
						},
					],
				},
				{
					test: /\.less$/,
					use: [
						MiniCssExtractPlugin.loader,
						{
							loader: "css-loader",
							options: {sourceMap: true}
						},
						{
							loader: "less-loader",
							options: {sourceMap: true}
						},
					],
				},
				{
					test: /\.svg$/,
					loader: 'svgr-loader',
					options: {
						native: false,
					},
				},
			],
		},
	};
};
