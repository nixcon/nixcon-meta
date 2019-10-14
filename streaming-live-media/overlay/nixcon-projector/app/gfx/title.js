import React from "react";
import isEmpty from "lodash/isEmpty";

import Name from "./parts/name";

const GFX = ({config}) =>
	<div className="screen">
		{/*<div>Talk</div>*/}
		<h1>{config["talk"]}</h1>
		<div>Speaker</div>
		<h2>{config["name"]}</h2>
	</div>
;

export default GFX;
