import React, {Component} from "react";
import global_config from "@configuration";

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
			return global_config;
		}
	}

	get GFX() {
		return this.state.GFX;
	}

	render() {
		const {config, GFX} = this;
		return (
			<div id="viewer">
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

export default Viewer;
