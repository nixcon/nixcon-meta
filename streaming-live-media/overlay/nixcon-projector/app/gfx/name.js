import React from "react";
import isEmpty from "lodash/isEmpty";

import Avatar from "./parts/avatar";
import Name from "./parts/name";
import Alias from "./parts/alias";

const Arrangement = ({config, x = 0, y = 0}) =>
	<g>
		{isEmpty(config["alias"]) || <Alias alias={config["alias"]} x={30 + x} y={36 + y} />}
		<Name name={config["name"]}                                 x={ 3 + x} y={ 8 + y} />
		<Avatar avatar={config["avatar"]}                           x={ 0 + x} y={ 0 + y} />
	</g>

const GFX = ({config}) =>
	<svg
		width="1920"
		height="1080"
		viewBox="0 0 508 286"
	>
		<defs>
			<filter id="shadow-blur">
				<feGaussianBlur stdDeviation="1.6" />
			</filter>
		</defs>
		<g
			transform="translate(0,-12)"
		>
			{/* fixme: somehow reuse rectangles component */}
			{/* Shadow */}
			<g
				style={{
					opacity: 0.5,
					filter: "url(#shadow-blur)"
				}}
				transform="translate(1, 3)"
				className="shadow"
			>
				<Arrangement config={config} x={13} y={232} />
			</g>
			<Arrangement config={config} x={13} y={232} />
		</g>
	</svg>
;

export default GFX;
