import {act} from "react-dom/test-utils";
import React from "react";
import ButtonEnter from "./ButtonEnter";
import ReactDOM from "react-dom/client";

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
		container.render(<ButtonEnter value={""} handleButton={() => {
		}}/>)
	})

	let join_button = document.querySelector('button')
	act(() => {
		join_button.dispatchEvent(new MouseEvent('mouseover', {'bubbles': true}))
	})
	expect(join_button.style.background).toEqual("")
})

it("Mouse hover out button", () => {
	// eslint-disable-next-line testing-library/no-unnecessary-act
	act(() => {
		container.render(<ButtonEnter value={""} handleButton={() => {
		}}/>)
	})

	let join_button = document.querySelector('button')
	act(() => {
		join_button.dispatchEvent(new MouseEvent('mouseout', {'bubbles': true}))
	})
	expect(join_button.style.background).toEqual("")
})