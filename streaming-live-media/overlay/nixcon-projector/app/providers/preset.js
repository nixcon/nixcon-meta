import React, {Component} from "react";
import PropTypes from "prop-types";

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

	var preset_path = path.join(config_dir, "preset.json");

	var mkdir_p = function(path) {
		if (!fs.existsSync(path)) {
			fs.mkdirSync(path, {recursive: true});
		}
	}
}

class PresetProvider extends Component {
	constructor() {
		super();
		this.state = {
			configs: [],
		};
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

		const {configs} = this.state;

		return {
			preset: {
				configs,
				save,
				can_save,
			},
		};
	}

	read_config() {
		if (electron) {
			if (fs.existsSync(preset_path)) {
				this.setState({
					configs: window.require(preset_path),
				})
			}
		}
	}

	save(data) {
		mkdir_p(config_dir);
		fs.writeFileSync(preset_path, JSON.stringify(data, null, "  "));
		this.setState({configs: data});
		console.log("Saved");
	}

	get can_save() {
		return electron;
	}
}

PresetProvider.childContextTypes = {
	preset: PropTypes.object,
}

export default PresetProvider;
