import React, {Component} from "react";
import PropTypes from "prop-types";
import findIndex from "lodash/findIndex";
import isEmpty from "lodash/isEmpty";
import isEqual from "lodash/isEqual";
import pick from "lodash/pick";
import pickBy from "lodash/pickBy";

const text_configs = [
	"talk",
	"name",
	"alias",
	"avatar"
];

const normalize = (v) =>
	pickBy(
		pick(v, text_configs),
		(v) => !isEmpty(v)
	)
;

class Presets extends Component {
	constructor() {
		super();
	}
	get current() {
		const {preset: {configs}} = this.context;
		const {config} = this.props;

		return findIndex(configs, (el) => isEqual(normalize(el), normalize(config)));
	}
	handleChange(e) {
		const value = parseInt(e.target.value);
		const {preset: {configs}} = this.context;

		const config = configs[value];

		this.props.onChange(config);
	}
	handleRemove() {
		if (this.current === -1) {
			return;
		}
		const {preset: {configs, save}} = this.context;

		const data = [].concat(
			configs.slice(0, this.current),
			configs.slice(this.current+1),
		);

		save(data);
	}
	handleAdd() {
		const {config} = this.props;

		const {preset: {configs, save}} = this.context;

		save([].concat(configs, [config]));
	}
	render() {
		const {preset} = this.context;
		const {current} = this;

		return (
			<div className="presets">
				<h3>Presets</h3>
				<select size="9" onChange={(e) => this.handleChange(e)} value={current.toString()}>
					<option disabled="disabled" value="-1">Choose a preset to change the configuration...</option>
					{preset.configs.map((config, i) => {
						const {name, talk = "[no talk]"} = config;

						return (
							<option value={i} key={i}>{name} / {talk}</option>
						);
					})}
				</select>
				<div>
					<button onClick={() => this.handleAdd()}>➕Add preset</button>
					<button onClick={() => this.handleRemove()}>➖Remove preset</button>
				</div>
			</div>
		);
	}
}

Presets.contextTypes = {
	preset: PropTypes.object,
}


export default Presets;
