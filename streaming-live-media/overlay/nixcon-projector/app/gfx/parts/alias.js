import React from "react";
import isEmpty from "lodash/isEmpty";
import {fontFamily} from "@app/gfx/variables";
import get_text_width from "@app/lib/get_text_width";

// Hack to ensure there's no clipping
const OFFSET = 2;

const Txt = ({alias}) =>
		<text
			xml:space="preserve"
			style={{
				fontSize: "16px",
				fill: "#ffffff",
				fontFamily,
			}}
			y={18 + OFFSET}
			x={6  + OFFSET}
		>
			{alias}
		</text>
;

const Alias = ({alias = "", x = 0, y = 0}) =>
	<svg
		x={x - OFFSET}
		y={y - OFFSET}
	>
		<rect
			style={{
				fill: "#4d4d4d",
				stroke: "#000000",
				strokeWidth: 2,
				paintOrder: "markers fill stroke"
			}}
			width={get_text_width(<Txt alias={alias} />) + 15}
			height="23"
			rx="12"
			ry="12"
			x={OFFSET}
			y={OFFSET}
		/>
		<Txt alias={alias} />
	</svg>
;

export default Alias;
