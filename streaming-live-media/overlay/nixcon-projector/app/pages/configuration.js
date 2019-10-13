import React, {Component} from "react";
import CONFIG from "@configuration";

import Viewer from "./viewer";

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

	render() {
		const {config} = this.state;

		return (
			<div>
				<header>
					<h1>GFX Configuration</h1>
				</header>
				<div className="configuration">
					<form>
						{
							["name", "alias", "avatar"].map((name) =>
								<div>
									<label>
										<span>{name}</span>
										<Text onChange={(value) => this.setConfig(name, value)} value={config[name]} />
									</label>
								</div>
							)
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
