import React from "react";
import {react_to_dom} from "./sync-react";

/**
 * Gets the width of the given text svg fragment.
 */
const get_text_width = (r) => {
    const el = react_to_dom(<svg>{r}</svg>)[0];
    window.document.body.appendChild(el);
    const val = el.querySelector("text").getComputedTextLength();
    window.document.body.removeChild(el);

    return val;
}

export default get_text_width;

