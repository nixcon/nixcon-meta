import React, {Component} from "react";
import PropTypes from "prop-types";
import ConfigurationForBrowser from "@configuration";

const electron = !!window.require;
// Using var to hoist the name up in the scope.
if (electron) {
	var fs      = window.require("fs");
	var path    = window.require("path");
	var process = window.require("process");

	var config_dir = path.join(
		(process.env.XDG_CONFIG_HOME || path.join(process.env.HOME, ".config")),
		"nixcon-projector"
	);

	var config_path = path.join(config_dir, "config.json");

	var mkdir_p = function(path) {
		if (!fs.existsSync(path)) {
			fs.mkdirSync(path, {recursive: true});
		}
	}
}

class ConfigurationProvider extends Component {
	constructor() {
		super();
		this.state = {};
		this.save = this.save.bind(this);
	}

	UNSAFE_componentWillMount() {
		this.read_config();
	}

	// Pass-through rendering
	render() {
		const {children} = this.props;

		return children;
	}

	getChildContext() {
		const {save, can_save} = this;

		const {config} = this.state;

		return {
			configuration: {
				config,
				save,
				can_save,
			},
		};
	}

	read_config() {
		if (electron) {
			if (fs.existsSync(config_path)) {
				this.setState({
					config: window.require(config_path),
				})
			}
		}
		else {
			this.setState({
				config: ConfigurationForBrowser,
			})
		}
	}

	save(config) {
		mkdir_p(config_dir);
		fs.writeFileSync(config_path, JSON.stringify(config, null, "  "));
		console.log("Saved");
	}

	get can_save() {
		return fs !== null;
	}
}

ConfigurationProvider.childContextTypes = {
	configuration: PropTypes.object,
}

export default ConfigurationProvider;
