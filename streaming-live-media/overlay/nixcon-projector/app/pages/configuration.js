import React, {Component} from "react";
import CONFIG from "@configuration";

import Viewer from "./viewer";

const fs = window.require ? window.require("fs") : null;

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
		this.state = {
			config: Object.assign({}, CONFIG),
		};
	}

	setConfig(name, value) {
		const config = Object.assign({}, this.state.config);
		config[name] = value;
		this.setState({config});
	}

	get canSave() {
		return fs !== null;
	}

	save(e) {
		e.preventDefault();
		const {config} = this.state;
		// Hmmm, this assumes cwd is the location of configuration.json
		// FIXME: Fix configuration.json as a well known location.
		fs.writeFileSync("./configuration.json", JSON.stringify(config, null, "  "));

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
						{
							["name", "alias", "avatar"].map((name) =>
								<div key={name}>
									<label>
										<span>{name}</span>
										<Text onChange={(value) => this.setConfig(name, value)} value={config[name]} />
									</label>
								</div>
							)
						}

						{
							this.canSave &&
								<div>
									<button type="submit">Save</button>
								</div>
						}
					</form>
				</div>
				<div className="preview">
					<Viewer />
				</div>
			</div>
		);
	}
}

export default Configurator;
