import React from "react";
import config from "@configuration";

const App = () =>
	<div id="viewer">
		<h1>{config["name"]}</h1>
		<h2>{config["alias"]}</h2>
	</div>
	;

export default App;
