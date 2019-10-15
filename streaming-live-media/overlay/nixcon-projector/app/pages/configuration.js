import React, {Component} from "react";
import PropTypes from "prop-types";
import Presets from "@app/components/presets";
import fromPairs from "lodash/fromPairs";

import Viewer from "./viewer";

const gfxes = [
	"name",
	"title",
];

const text_configs = [
	"talk",
	"name",
	"alias",
	"avatar"
];

const Text = ({value, onChange}) =>
	<input
		type="text"
		value={value}
		onChange={(e) => onChange(e.target.value)}
	/>
;

class Configurator extends Component {
	constructor() {
		super();
		this.state = {};
	}

	UNSAFE_componentWillMount() {
		this.setState({
			config: Object.assign({}, this.configuration.config),
		});
	}

	get configuration() {
		return this.context.configuration;
	}

	setConfig(name, value) {
		const config = Object.assign({}, this.state.config);
		config[name] = value;
		this.setState({config});
	}

	mergeConfig(in_config) {
		console.log(in_config);
		const blank = fromPairs(text_configs.map((k) => [k, ""]));
		const config = Object.assign({}, this.state.config, blank, in_config);
		this.setState({config});
	}

	save(e) {
		e.preventDefault();
		const {config} = this.state;
		this.configuration.save(config);

		return false;
	}

	render() {
		const {config} = this.state;

		return (
			<div>
				<header>
					<h1>GFX Configuration</h1>
				</header>
				<div className="configuration">
					<form onSubmit={(e) => this.save(e)}>
						<h3>Configuration</h3>
						<div>
							<label>
								<span>GFX</span>
								<select defaultValue="" value={config["gfx"]} onChange={(e) => this.setConfig("gfx", e.target.value)}>
									<option disabled value="">Choose...</option>
									{gfxes.map((name) => <option key={name} value={name}>{name}</option>)}
								</select>
							</label>
						</div>
						{
							text_configs.map((name) =>
								<div key={name}>
									<label>
										<span>{name}</span>
										<Text onChange={(value) => this.setConfig(name, value)} value={config[name]} />
									</label>
								</div>
							)
						}

						{
							this.configuration.can_save &&
								<div>
									<p>
										Please ensure the GFX scene is not shown in obs
										before switching GFX.
									</p>
									<button type="submit">Save data and switch GFX</button>
								</div>
						}
					</form>
					<div>
						<Presets
							onChange={(config) => this.mergeConfig(config)}
							config={config}
						/>
					</div>
				</div>
				<div className="preview">
					<Viewer config={config} />
				</div>
			</div>
		);
	}
}

Configurator.contextTypes = {
	configuration: PropTypes.object,
};

export default Configurator;
