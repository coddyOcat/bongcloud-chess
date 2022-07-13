import {act} from "react-dom/test-utils"
import React from "react";
import ReactDOM from 'react-dom/client'
import * as moduleApi from "../../context/index.context";
import Enter from "./Enter";

global.IS_REACT_ACT_ENVIRONMENT = true;

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'), useNavigate: () => mockedUsedNavigate,
}));


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

it('Render enter page with side', () => {
	jest.spyOn(moduleApi, 'useGlobal').mockReturnValue({checkValidRoomApi: (x) => true})
	// eslint-disable-next-line testing-library/no-unnecessary-act
	act(() => {
		container.render(<Enter/>)
	})
	expect(mockedUsedNavigate).toHaveBeenCalledTimes(0);
})

it('Render enter page with null side', () => {
	localStorage.setItem("side", "")
	jest.spyOn(moduleApi, 'useGlobal').mockReturnValue({checkValidRoomApi: (x) => true})
	// eslint-disable-next-line testing-library/no-unnecessary-act
	act(() => {
		container.render(<Enter/>)
	})
	expect(localStorage.getItem("numTable")).toEqual("0");
})

it('Enter page with join click, numTable.length_0', () => {
	localStorage.setItem("side", "white")
	jest.spyOn(moduleApi, 'useGlobal').mockReturnValue({checkValidRoomApi: (x) => true})
	// eslint-disable-next-line testing-library/no-unnecessary-act
	act(() => {
		container.render(<Enter/>)
	})
	let join_button = document.querySelectorAll('button')[0]
	// eslint-disable-next-line testing-library/no-unnecessary-act
	jest.useFakeTimers();
	jest.spyOn(global, 'setTimeout');

	act(() => {
		join_button.dispatchEvent(new MouseEvent("click", {bubbles: true}))
	})
	jest.runAllTimers();
	expect(setTimeout).toHaveBeenCalledTimes(2);
})

it('Enter page with join click, numTable.length>0, valid room', () => {
	localStorage.setItem("side", "white")
	jest.spyOn(moduleApi, 'useGlobal').mockReturnValue({checkValidRoomApi: (x) => true})
	// eslint-disable-next-line testing-library/no-unnecessary-act
	act(() => {
		container.render(<Enter/>)
	})
	let join_button = document.querySelectorAll('button')[0]
	// eslint-disable-next-line testing-library/no-unnecessary-act
	join_button.parentNode.firstChild.value = "123456"

	jest.useFakeTimers();
	jest.spyOn(global, 'setTimeout');

	act(() => {
		join_button.dispatchEvent(new MouseEvent("click", {bubbles: true}))
	})
	jest.runAllTimers();
	expect(setTimeout).toHaveBeenCalledTimes(1);
})

it('Enter page with join click, numTable.length>0, no valid room', () => {
	localStorage.setItem("side", "white")
	jest.spyOn(moduleApi, 'useGlobal').mockReturnValue({checkValidRoomApi: (x) => false})
	// eslint-disable-next-line testing-library/no-unnecessary-act
	act(() => {
		container.render(<Enter/>)
	})
	let join_button = document.querySelectorAll('button')[0]
	// eslint-disable-next-line testing-library/no-unnecessary-act
	join_button.parentNode.firstChild.value = "123456"

	jest.useFakeTimers();
	jest.spyOn(global, 'setTimeout');


	act(() => {
		join_button.dispatchEvent(new MouseEvent("click", {bubbles: true}))
	})
	jest.runAllTimers();
	expect(setTimeout).toHaveBeenCalledTimes(1);
})

it('Enter page with create click', () => {
	localStorage.setItem("side", "white")
	jest.spyOn(moduleApi, 'useGlobal').mockReturnValue({checkValidRoomApi: (x) => false})
	// eslint-disable-next-line testing-library/no-unnecessary-act
	act(() => {
		container.render(<Enter/>)
	})
	let join_button = document.querySelectorAll('button')[1]
	// eslint-disable-next-line testing-library/no-unnecessary-act

	act(() => {
		join_button.dispatchEvent(new MouseEvent("click", {bubbles: true}))
	})
	expect(mockedUsedNavigate).toHaveBeenCalledTimes(2);
})
