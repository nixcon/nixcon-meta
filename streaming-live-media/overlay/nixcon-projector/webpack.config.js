/* globals __dirname, require, module */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const project_dir = path.resolve(__dirname);
const CopyWebpackPlugin = require("copy-webpack-plugin")

const fs = require("fs");
const process = require("process");

// Using var to hoist the name up in the scope.
const config_dir = path.join(
	(process.env.XDG_CONFIG_HOME || path.join(process.env.HOME, ".config")),
	"nixcon-projector"
);

const config_path = path.join(config_dir, "config.json");
const mkdir_p = function(path) {
	if (!fs.existsSync(path)) {
		fs.mkdirSync(path, {recursive: true});
	}
}

mkdir_p(config_dir);
if (!fs.existsSync(config_path)) {
	fs.writeFileSync(config_path, JSON.stringify({}, null, "  "));
}

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
				[path.join(config_dir, "avatars/**/*")]
			),
		],
		resolve: {
			alias: {
				"@app": path.resolve(project_dir, "app"),
				"@library": path.resolve(project_dir, "library"),
				"@configuration": path.join(config_dir, "config.json"),
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
