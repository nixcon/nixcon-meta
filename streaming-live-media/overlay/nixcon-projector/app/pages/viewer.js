import React, {Component} from "react";
import PropTypes from "prop-types";
import {fontFamily} from "@app/gfx/variables";

const Null = () => null;

class Viewer extends Component {
	constructor() {
		super();
		this.state = {
			gfx: "null",
			GFX: Null,
		};
	}

	UNSAFE_componentWillMount() {
		this.componentDidUpdate({});
	}

	componentDidUpdate(prevProps) {
		const {config} = this;
		if (!config) { return; }
		const {gfx} = config;

		if (gfx && gfx != this.state["gfx"]) {
			import(`@app/gfx/${config["gfx"]}`)
				.then(({default: GFX}) => this.setState({GFX, gfx}))
			;
		}
	}

	get config() {
		if (this.props.config) {
			return this.props.config;
		}
		else {
			return this.context.configuration.config;
		}
	}

	get GFX() {
		return this.state.GFX;
	}

	render() {
		const {config, GFX} = this;
		return (
			<div id="viewer">
				<style>{`
					.screen {
						font-family: "${fontFamily}";
					}
				`}
				</style>
				<GFX config={config} />
			</div>
		);
	}
}

//const Viewer = ({config = global_config}) =>
//	<div id="viewer">
//		<GFX config={config} />
//	</div>
//;
Viewer.contextTypes = {
	configuration: PropTypes.object,
};

export default Viewer;
