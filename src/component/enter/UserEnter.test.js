import ReactDOM from "react-dom/client";
import {act} from "react-dom/test-utils";
import * as moduleApi from "../../context/index.context";
import React from "react";
import UserEnter from "./UserEnter";

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

it('Render user enter page', () => {
	jest.mock('react-router-dom', () => ({
		...jest.requireActual('react-router-dom'),
		useParams: () => ({
			state: 'join'
		})
	}));
	jest.spyOn(moduleApi, 'useGlobal').mockReturnValue({
		createRoomApi: x => {
		}, checkValidRoomApi: (x) => true, joinRoomApi: x => {
		}
	})
	// eslint-disable-next-line testing-library/no-unnecessary-act
	act(() => {
		container.render(<UserEnter/>)
	})
	expect(mockedUsedNavigate).toHaveBeenCalled();
})

it('User enter page with join click, player_0', () => {
	jest.mock('react-router-dom', () => ({
		...jest.requireActual('react-router-dom'),
		useParams: () => ({
			state: 'join'
		})
	}));
	jest.spyOn(moduleApi, 'useGlobal').mockReturnValue({
		createRoomApi: x => {
		}, checkValidRoomApi: (x) => true, joinRoomApi: x => {
		}
	})

	// eslint-disable-next-line testing-library/no-unnecessary-act
	act(() => {
		container.render(<UserEnter/>)
	})

	jest.useFakeTimers();
	jest.spyOn(global, 'setTimeout');

	let buttons = document.querySelector('button')
	act(() => {
		buttons.dispatchEvent(new MouseEvent("click", {bubbles: true}))
	})

	jest.runAllTimers();

	expect(setTimeout).toHaveBeenCalledTimes(2);
})

it('User enter page with join click, player>0', () => {
	jest.mock('react-router-dom', () => ({
		...jest.requireActual('react-router-dom'),
		useParams: () => ({
			state: 'join'
		})
	}));
	jest.spyOn(moduleApi, 'useGlobal').mockReturnValue({
		createRoomApi: x => {
		}, checkValidRoomApi: (x) => true, joinRoomApi: x => {
		}
	})

	// eslint-disable-next-line testing-library/no-unnecessary-act
	act(() => {
		container.render(<UserEnter/>)
	})

	jest.useFakeTimers();
	jest.spyOn(global, 'setTimeout');

	let buttons = document.querySelector('button')

	buttons.parentNode.firstChild.value = "abcdefghiklm"
	act(() => {
		buttons.dispatchEvent(new MouseEvent("click", {bubbles: true}))
	})

	jest.runAllTimers();

	expect(mockedUsedNavigate).toHaveBeenCalledTimes(1);
})