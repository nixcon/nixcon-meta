import React from "react";
import isEmpty from "lodash/isEmpty";

let ID = 1;

const OFFSET = 2;
const Avatar = ({avatar = "", x = 0, y = 0, _id = ID++}) =>
	<svg
		x={x - OFFSET}
		y={y - OFFSET}
	>
		<defs>
			<mask id={`avatar-mask_${_id}`}>
				<rect
					fill="#ffffff"
					width="36"
					height="36"
					x={1 + OFFSET}
					y={1 + OFFSET}
					rx="2.8"
					ry="2.8"
				/>
			</mask>
		</defs>
		<g>
			<rect
				ry="4"
				rx="4"
				x={OFFSET}
				y={OFFSET}
				height="38"
				width="38"
				style={{
					vectorEffect: "none",
					fill: "#fff",
					stroke: "#000000",
					strokeWidth: 2,
					paintOrder: "markers fill stroke"
				}}
			/>
			{
				!isEmpty(avatar) &&
					<image
						width="36"
						height="36"
						preserveAspectRatio="xMidYMid slice"
						xlink:href={`/avatars/${avatar}`}
						x={1 + OFFSET}
						y={1 + OFFSET}
						mask={`url(#avatar-mask_${_id})`}
					/>
			}
		</g>
	</svg>
		;

export default Avatar;
