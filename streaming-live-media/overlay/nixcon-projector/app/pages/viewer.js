import React from "react";
import global_config from "@configuration";
import GFX from "@app/gfx/name";

const App = ({config = global_config}) =>
	<div id="viewer">
		<GFX config={config} />
	</div>
;

export default App;
