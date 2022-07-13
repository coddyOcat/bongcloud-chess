import {act} from "react-dom/test-utils"
import ReactDOM from 'react-dom/client'
import NoPage from "./NoPage";

global.IS_REACT_ACT_ENVIRONMENT = true;

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: () => mockedUsedNavigate,
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

it('Render no page', () => {
	// eslint-disable-next-line testing-library/no-unnecessary-act
	act(() => {
		container.render(<NoPage/>)
	})

	expect(mockedUsedNavigate).toHaveBeenCalled();
})