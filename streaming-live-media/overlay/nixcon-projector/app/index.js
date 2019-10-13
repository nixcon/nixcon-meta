import React from "react";
import ReactDOM from "react-dom";
import "./styles";

let page = window.location.pathname.replace(/^\/+/, "");
if (page === "") {
	page = "index";
}

const id = `app-${page}`;
const html = document.documentElement;

html.classList.add(id);
html.classList.add("loaded");
html.id = id;

const Error = ({error}) =>
	<div className="error">
		<pre>
			{error.toString()}
		</pre>
	</div>
;

// The cheapest "router" you can get.
import(`./pages/${page}`)
.then(({default: App}) => 
	ReactDOM.render(<App />, document.getElementById("root"))
)
.catch((err) => {
	ReactDOM.render(<Error error={err} />, document.getElementById("root"))
})
