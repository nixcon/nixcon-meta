import React from "react";
import ReactDOM from "react-dom";
import "./styles";
import ConfigurationProvider from "@app/providers/configuration";

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

const App = ({children}) =>
	<ConfigurationProvider>
		{children}
	</ConfigurationProvider>
;

// The cheapest "router" you can get.
import(`./pages/${page}`)
.then(({default: Page}) => 
	ReactDOM.render(<App><Page /></App>, document.getElementById("root"))
)
.catch((err) => {
	ReactDOM.render(<Error error={err} />, document.getElementById("root"))
})
