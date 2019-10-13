import React from "react";

const Avatar = ({config = {}}) =>
	<g>
		<rect
			ry="3.9605429"
			rx="3.9605429"
			y="231.89549"
			x="12.404685"
			height="38.232288"
			width="38.232292"
			id="rect829-7-7"
			style={{
				opacity: 1,
				vectorEffect: "none",
				fill: "none",
				fillOpacity: 1,
				stroke: "#4d4d4d",
				strokeWidth: 1.984375,
				strokeLinecap: "round",
				strokeLinejoin: "round",
				strokeMiterlimit: 4,
				strokeDasharray: "none",
				strokeDashoffset: 0,
				strokeOpacity: 1,
				paintOrder: "markers fill stroke"
			}}
		/>
		<image
			width="38.100002"
			height="38.100002"
			preserveAspectRatio="none"
			xlink:href={`/avatars/${config["avatar"]}`}
			id="image1326"
			x="12.47083"
			y="231.96164"
			mask="url(#mask1424)"
			style={{
				strokeWidth: 1.08571446
			}}
			transform="matrix(0.97222217,0,0,0.97222217,0.87558029,6.9725549)" />
	</g>
;

const Name = ({config = {}}) =>
	<g>
		{/* fixme: autosize */}
		<rect
			style={{
				opacity: 1,
				vectorEffect: "none",
				fill: "#5277c3",
				fillOpacity: 1,
				stroke: "#4d4d4d",
				strokeWidth: 1.98437502,
				strokeLinecap: "round",
				strokeLinejoin: "round",
				strokeMiterlimit: 4,
				strokeDasharray: "none",
				strokeDashoffset: 0,
				strokeOpacity: 1,
				paintOrder: "markers fill stroke"
			}}
			id="rect829"
			width="257.09918"
			height="28.574997"
			x="15.944888"
			y="239.84999"
			rx="14.287498"
			ry="13.5948" />
		<text
			xml:space="preserve"
			style={{
				fontSize: "22.61494637px",
				lineHeight: 1.25,
				letterSpacing: "0px",
				wordSpacing: "0px",
				stroke: "none",
				fontStyle: "normal",
				fontVariant: "normal",
				fontWeight: "normal",
				fontStretch: "normal",
				fontFamily: 'Noto Sans',
				textAlign: "start",
				textAnchor: "start",
				strokeWidth: 0.24588007,
				fill: "#ffffff",
				fillOpacity: 1,

			}}
			x="55.625828"
			y="261.71515"
			id="text833">
			{config["name"]}
		</text>
	</g>
;
const Alias = ({config = {}}) =>
	<g>
		{/* fixme: autosize */}
		<rect
			style={{
				opacity: 1,
				vectorEffect: "none",
				fill: "#4d4d4d",
				fillOpacity: 1,
				stroke: "#4d4d4d",
				strokeWidth: 1.984375,
				strokeLinecap: "round",
				strokeLinejoin: "round",
				strokeMiterlimit: 4,
				strokeDasharray: "none",
				strokeDashoffset: 0,
				strokeOpacity: 1,
				paintOrder: "markers fill stroke"
			}}
			id="rect829-6"
			width="98.921707"
			height="22.772797"
			x="42.939281"
			y="268.42499"
			rx="11.3864"
			ry="10.346989" />
		<text
			xml:space="preserve"
			style={{
				fontSize: "15.71967316px",
				lineHeight: 1.25,
				letterSpacing: "0px",
				wordSpacing: "0px",
				fill: "#ffffff",
				fillOpacity: 1,
				stroke: "none",
				strokeWidth: 0.15589215,
				fontStyle: "normal",
				fontVariant: "normal",
				fontWeight: "normal",
				fontStretch: "normal",
				fontFamily: 'Noto Sans',
				textAlign: "start",
				textAnchor: "start",
			}}
			x="49.015213"
			y="285.24823"
			id="text833-7">
			{config["alias"]}
		</text>
	</g>
;

const GFX = ({config}) =>
	<svg
		width="1920"
		height="1080"
		viewBox="0 0 507.99999 285.75001"
		version="1.1"
		id="name-gfx"
	>
		<defs id="defs2">
			<mask maskUnits="userSpaceOnUse" id="mask1424">
				<rect
					style={{
						opacity: 1,
						vectorEffect: "none",
						fill: "#ffffff",
						fillOpacity: 1,
						stroke: "none",
						strokeWidth: 1.98437512,
						strokeLinecap: "round",
						strokeLinejoin: "round",
						strokeMiterlimit: 4,
						strokeDasharray: "none",
						strokeDashoffset: 0,
						strokeOpacity: 1,
						paintOrder: "markers fill stroke"
					}}
					id="rect1426"
					width="38.099998"
					height="38.099998"
					x="12.47083"
					y="231.96164"
					rx="3.9468389"
					ry="3.9468389"
				/>
			</mask>
			<filter id="shadow-blur">
				<feGaussianBlur stdDeviation="1.5997083" />
			</filter>
		</defs>
		<g
			transform="translate(0,-11.249983)">
			{/* fixme: somehow reuse rectangles component */}
			{/* Shadow */}
			<g
				style={{
					opacity: 0.44100001,
					filter: "url(#shadow-blur)"
				}}
				transform="translate(2, 2)"
				className="shadow"
			>
				<Alias config={config} />
				<Name config={config} />
				<Avatar />
			</g>
			<Alias config={config} />
			<Name config={config} />
			<Avatar config={config} />
			{/*
			*/}
		</g>
	</svg>
;

export default GFX;
