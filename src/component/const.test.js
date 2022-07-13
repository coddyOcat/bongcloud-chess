import {columnKey} from "./const";

global.IS_REACT_ACT_ENVIRONMENT = true;
// ! The purpose of the flag is to tell React that it's running in a unit test-like environment.

it('Constant var', () => {
	expect(columnKey).toEqual(["_", "a", "b", "c", "d", "e", "f", "g", "h"]);
})