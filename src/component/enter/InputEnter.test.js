import ReactDOM from "react-dom/client";
import {act} from "react-dom/test-utils";
import React from "react";
import InputEnter from "./InputEnter";

global.IS_REACT_ACT_ENVIRONMENT = true;

let container = null;
beforeEach(() => {
	// setup a DOM element as a render target
	container = document.createElement("div");
	document.body.appendChild(container);
	container = ReactDOM.createRoot(container)
});

afterEach(() => {
	// cleanup on exiting
	act(() => container.unmount())
	container = null;
});

it("Mouse hover enter button", () => {
	// eslint-disable-next-line testing-library/no-unnecessary-act
	act(() => {
		container.render(<InputEnter type={""} placeholder={""}/>)
	})

	let input_text = document.querySelector('input')
	act(() => {
		input_text.dispatchEvent(new FocusEvent('focus', {'bubbles' : true}))
		input_text.dispatchEvent(new FocusEvent('blur', {'bubbles' : true}))
	})
})