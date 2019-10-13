import React from "react";

const GFX = ({config}) =>
	<div className="name-gfx">
		<h1>{config["name"]}</h1>
		<h2>{config["alias"]}</h2>
	</div>
	;

export default GFX;
