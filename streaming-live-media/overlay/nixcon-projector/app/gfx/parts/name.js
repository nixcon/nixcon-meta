import React from "react";
import {fontFamily} from "@app/gfx/variables";
import get_text_width from "@app/lib/get_text_width";

// Hack to ensure there's no clipping
const OFFSET = 2;

const Txt = ({name}) =>
		<text
			xml:space="preserve"
			style={{
				fontSize: "22px",
				fill: "#ffffff",
				fontFamily,
			}}
			y={23 + OFFSET}
			x={38 + OFFSET}
		>
			{name}
		</text>
;

const Name = ({name = "", x = 0, y = 0}) =>
	<svg
		x={x - OFFSET}
		y={y - OFFSET}
	>
		<rect
			style={{
				fill: "#5277c3",
				stroke: "#000000",
				strokeWidth: 2,
				paintOrder: "markers fill stroke"
			}}
			width={get_text_width(<Txt name={name} />) + 49}
			height="28"
			x={OFFSET}
			y={OFFSET}
			rx="14"
			ry="14" />
		<Txt name={name} />
	</svg>
;

export default Name;
