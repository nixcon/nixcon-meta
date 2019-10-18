import React from "react";
import ReactDOMServer from "react-dom/server";

// Synchronuously renders React to DOM elements.
// Do note that for some stuff (e.g. SVG DOM api) you may need
// to render the document to DOM by appending it, otherwise things
// like width may be zero.
const react_to_dom = (r) => {
	const el = document.createElement("DIV");
	const markup = ReactDOMServer.renderToStaticMarkup(r);
	el.innerHTML = markup;

	return el.children;
};

export {react_to_dom};
