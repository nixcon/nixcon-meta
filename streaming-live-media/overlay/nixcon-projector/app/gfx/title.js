import React from "react";
import isEmpty from "lodash/isEmpty";

import Name from "./parts/name";

const GFX = ({config}) =>
	<div className="screen">
		{/*<div>Talk</div>*/}
		<h1>{config["talk"]}</h1>
		<div>Speaker</div>
		<h2>{config["name"]}</h2>
		<hr />
		<img src="/app/assets/nixcon2019.svg" />
		<h3>NixCon 2019</h3>
	</div>
;

export default GFX;
