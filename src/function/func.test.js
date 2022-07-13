import * as funcz from "./func";
import {
	addEatMove,
	addJumpMove,
	addLineMove, addLineMoveAndEat,
	choosePromote,
	decodePosition,
	encodePosition,
	getColumn,
	getRow,
	movePieceToTarget,
	newElementPromoteOption,
	newElementTarget
} from "./func";
import * as DB from "../firebase/db"
import ReactDOM from "react-dom/client";
import {act} from "react-dom/test-utils";
import React from "react";
import Board from "../component/chess/Board";
import * as moduleApi from "../context/chess.context";
import * as piece from "../resource/piece"

global.IS_REACT_ACT_ENVIRONMENT = true;
// ! The purpose of the flag is to tell React that it's running in a unit test-like environment.

jest.spyOn(DB, 'updateTable').mockReturnValue("")

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

it('Get Column', () => {
	expect(getColumn("a1", 1)).toEqual("b");
	expect(getColumn("x1", 1)).toEqual("");
})

it('Get Row', () => {
	expect(getRow("a1", 1)).toEqual(2);
	expect(getRow("a9", 1)).toEqual("");
})

it("Encode position", () => {
	const position = {
		a1: "R",
		a2: "P",
		a3: "1",
		a4: "1",
		a5: "1",
		a6: "1",
		a7: "p",
		a8: "r",
		b1: "N",
		b2: "P",
		b3: "1",
		b4: "1",
		b5: "1",
		b6: "1",
		b7: "p",
		b8: "n",
		c1: "B",
		c2: "P",
		c3: "1",
		c4: "1",
		c5: "1",
		c6: "1",
		c7: "p",
		c8: "b",
		d1: "Q",
		d2: "P",
		d3: "1",
		d4: "1",
		d5: "1",
		d6: "1",
		d7: "p",
		d8: "q",
		e1: "K",
		e2: "P",
		e3: "1",
		e4: "1",
		e5: "1",
		e6: "1",
		e7: "p",
		e8: "k",
		f1: "B",
		f2: "P",
		f3: "1",
		f4: "1",
		f5: "1",
		f6: "1",
		f7: "p",
		f8: "b",
		g1: "N",
		g2: "P",
		g3: "1",
		g4: "1",
		g5: "1",
		g6: "1",
		g7: "p",
		g8: "n",
		h1: "R",
		h2: "P",
		h3: "1",
		h4: "1",
		h5: "1",
		h6: "1",
		h7: "p",
		h8: "r",
	};
	const strPos = "RNBQKBNRPPPPPPPP11111111111111111111111111111111pppppppprnbqkbnr"
	expect(encodePosition(position)).toEqual(strPos)
})

it("Decode position", () => {
	const position = {
		a1: "R",
		a2: "P",
		a3: "1",
		a4: "1",
		a5: "1",
		a6: "1",
		a7: "p",
		a8: "r",
		b1: "N",
		b2: "P",
		b3: "1",
		b4: "1",
		b5: "1",
		b6: "1",
		b7: "p",
		b8: "n",
		c1: "B",
		c2: "P",
		c3: "1",
		c4: "1",
		c5: "1",
		c6: "1",
		c7: "p",
		c8: "b",
		d1: "Q",
		d2: "P",
		d3: "1",
		d4: "1",
		d5: "1",
		d6: "1",
		d7: "p",
		d8: "q",
		e1: "K",
		e2: "P",
		e3: "1",
		e4: "1",
		e5: "1",
		e6: "1",
		e7: "p",
		e8: "k",
		f1: "B",
		f2: "P",
		f3: "1",
		f4: "1",
		f5: "1",
		f6: "1",
		f7: "p",
		f8: "b",
		g1: "N",
		g2: "P",
		g3: "1",
		g4: "1",
		g5: "1",
		g6: "1",
		g7: "p",
		g8: "n",
		h1: "R",
		h2: "P",
		h3: "1",
		h4: "1",
		h5: "1",
		h6: "1",
		h7: "p",
		h8: "r",
	};
	const strPos = "RNBQKBNRPPPPPPPP11111111111111111111111111111111pppppppprnbqkbnr"
	let setPosition = jest.fn()
	decodePosition(strPos, position, setPosition)
	expect(setPosition).toHaveBeenCalledTimes(1);
})

it("Move piece to target", () => {
	const customDarkSquareStyle = {
		backgroundColor: "var(--dark-square-background)"
	}

	const customLightSquareStyle = {
		backgroundColor: "var(--light-square-background)"
	}

	let position = {
		a1: "R",
		a2: "P",
		a3: "1",
		a4: "1",
		a5: "1",
		a6: "1",
		a7: "p",
		a8: "r",
		b1: "N",
		b2: "P",
		b3: "1",
		b4: "1",
		b5: "1",
		b6: "1",
		b7: "p",
		b8: "n",
		c1: "B",
		c2: "P",
		c3: "1",
		c4: "1",
		c5: "1",
		c6: "1",
		c7: "p",
		c8: "b",
		d1: "Q",
		d2: "P",
		d3: "1",
		d4: "1",
		d5: "1",
		d6: "1",
		d7: "p",
		d8: "q",
		e1: "K",
		e2: "P",
		e3: "1",
		e4: "1",
		e5: "1",
		e6: "1",
		e7: "p",
		e8: "k",
		f1: "B",
		f2: "P",
		f3: "1",
		f4: "1",
		f5: "1",
		f6: "1",
		f7: "p",
		f8: "b",
		g1: "N",
		g2: "P",
		g3: "1",
		g4: "1",
		g5: "1",
		g6: "1",
		g7: "p",
		g8: "n",
		h1: "R",
		h2: "P",
		h3: "1",
		h4: "1",
		h5: "1",
		h6: "1",
		h7: "p",
		h8: "r",
	};

	jest.spyOn(moduleApi, 'useChess').mockReturnValue({
		position: position,
		customDarkSquareStyle: customDarkSquareStyle,
		customLightSquareStyle: customLightSquareStyle,
		customChessPieces: {
			P: "",
			R: "",
			N: "",
			B: "",
			Q: "",
			K: "",
			p: "",
			r: "",
			n: "",
			b: "",
			q: "",
			k: "",
		},
		onPieceClick: () => {
		}
	})

	// eslint-disable-next-line testing-library/no-unnecessary-act
	act(() => {
		container.render(<Board/>)
	})
	let piece = document.querySelector('div[data-square]')
	const newDiv = document.createElement("div");
	newDiv.setAttribute("target-square", "a1");

	piece.parentNode.appendChild(newDiv)
	let currentTar = document.querySelector('div[target-square]')
	let event = {currentTarget: currentTar}
	let setPosition = jest.fn()
	let setLastMove = jest.fn()

	movePieceToTarget(event, position, setPosition, setLastMove)
	expect(setLastMove).toHaveBeenCalledTimes(0);
})

it("Choose promote to target", () => {
	const newDiv = document.createElement("div");
	newDiv.setAttribute("promote-piece", "Q");
	const grandParentNode = document.createElement("div");
	const parentNode = document.createElement("div");
	parentNode.appendChild(newDiv)
	grandParentNode.appendChild(parentNode)

	let event = {currentTarget: newDiv}
	let position = {
		a1: "R",
		a2: "P",
		a3: "1",
		a4: "1",
		a5: "1",
		a6: "1",
		a7: "p",
		a8: "r",
		b1: "N",
		b2: "P",
		b3: "1",
		b4: "1",
		b5: "1",
		b6: "1",
		b7: "p",
		b8: "n",
		c1: "B",
		c2: "P",
		c3: "1",
		c4: "1",
		c5: "1",
		c6: "1",
		c7: "p",
		c8: "b",
		d1: "Q",
		d2: "P",
		d3: "1",
		d4: "1",
		d5: "1",
		d6: "1",
		d7: "p",
		d8: "q",
		e1: "K",
		e2: "P",
		e3: "1",
		e4: "1",
		e5: "1",
		e6: "1",
		e7: "p",
		e8: "k",
		f1: "B",
		f2: "P",
		f3: "1",
		f4: "1",
		f5: "1",
		f6: "1",
		f7: "p",
		f8: "b",
		g1: "N",
		g2: "P",
		g3: "1",
		g4: "1",
		g5: "1",
		g6: "1",
		g7: "p",
		g8: "n",
		h1: "R",
		h2: "P",
		h3: "1",
		h4: "1",
		h5: "1",
		h6: "1",
		h7: "p",
		h8: "r",
	};
	let setPosition = jest.fn()
	let setLastMove = jest.fn()

	choosePromote(event, "a8", position, setPosition, setLastMove);
	expect(setLastMove).toHaveBeenCalledTimes(0);
})

it("New element target", () => {
	jest.spyOn(funcz, 'movePieceToTarget').mockReturnValue("")
	let position = {
		a1: "R",
		a2: "P",
		a3: "1",
		a4: "1",
		a5: "1",
		a6: "1",
		a7: "p",
		a8: "r",
		b1: "N",
		b2: "P",
		b3: "1",
		b4: "1",
		b5: "1",
		b6: "1",
		b7: "p",
		b8: "n",
		c1: "B",
		c2: "P",
		c3: "1",
		c4: "1",
		c5: "1",
		c6: "1",
		c7: "p",
		c8: "b",
		d1: "Q",
		d2: "P",
		d3: "1",
		d4: "1",
		d5: "1",
		d6: "1",
		d7: "p",
		d8: "q",
		e1: "K",
		e2: "P",
		e3: "1",
		e4: "1",
		e5: "1",
		e6: "1",
		e7: "p",
		e8: "k",
		f1: "B",
		f2: "P",
		f3: "1",
		f4: "1",
		f5: "1",
		f6: "1",
		f7: "p",
		f8: "b",
		g1: "N",
		g2: "P",
		g3: "1",
		g4: "1",
		g5: "1",
		g6: "1",
		g7: "p",
		g8: "n",
		h1: "R",
		h2: "P",
		h3: "1",
		h4: "1",
		h5: "1",
		h6: "1",
		h7: "p",
		h8: "r",
	};
	let setPosition = jest.fn()
	let setLastMove = jest.fn()
	const diV = newElementTarget("a1", "a2", false, "black", position, setPosition, setLastMove);
	expect(diV.getAttribute("target-square")).toEqual("a2");
})

it("New element promote option", () => {
	jest.spyOn(funcz, 'choosePromote').mockReturnValue("")
	jest.spyOn(piece, 'customPieces').mockReturnValue({
		P: "",
		R: "",
		N: "",
		B: "",
		Q: "",
		K: "",
		p: "",
		r: "",
		n: "",
		b: "",
		q: "",
		k: "",
	})
	let position = {
		a1: "R",
		a2: "P",
		a3: "1",
		a4: "1",
		a5: "1",
		a6: "1",
		a7: "p",
		a8: "r",
		b1: "N",
		b2: "P",
		b3: "1",
		b4: "1",
		b5: "1",
		b6: "1",
		b7: "p",
		b8: "n",
		c1: "B",
		c2: "P",
		c3: "1",
		c4: "1",
		c5: "1",
		c6: "1",
		c7: "p",
		c8: "b",
		d1: "Q",
		d2: "P",
		d3: "1",
		d4: "1",
		d5: "1",
		d6: "1",
		d7: "p",
		d8: "q",
		e1: "K",
		e2: "P",
		e3: "1",
		e4: "1",
		e5: "1",
		e6: "1",
		e7: "p",
		e8: "k",
		f1: "B",
		f2: "P",
		f3: "1",
		f4: "1",
		f5: "1",
		f6: "1",
		f7: "p",
		f8: "b",
		g1: "N",
		g2: "P",
		g3: "1",
		g4: "1",
		g5: "1",
		g6: "1",
		g7: "p",
		g8: "n",
		h1: "R",
		h2: "P",
		h3: "1",
		h4: "1",
		h5: "1",
		h6: "1",
		h7: "p",
		h8: "r",
	};
	let setPosition = jest.fn()
	let setLastMove = jest.fn()
	const diV = newElementPromoteOption("white", "a1", position, setPosition, setLastMove)
	expect(diV.childElementCount).toEqual(4);
})

it("Add line move", () => {
	jest.spyOn(funcz, 'newElementTarget').mockReturnValue("")
	let listMove = ["a3", "a1", "a"]
	let position = {
		a1: "R",
		a2: "P",
		a3: "1",
		a4: "1",
		a5: "1",
		a6: "1",
		a7: "p",
		a8: "r",
		b1: "N",
		b2: "P",
		b3: "1",
		b4: "1",
		b5: "1",
		b6: "1",
		b7: "p",
		b8: "n",
		c1: "B",
		c2: "P",
		c3: "1",
		c4: "1",
		c5: "1",
		c6: "1",
		c7: "p",
		c8: "b",
		d1: "Q",
		d2: "P",
		d3: "1",
		d4: "1",
		d5: "1",
		d6: "1",
		d7: "p",
		d8: "q",
		e1: "K",
		e2: "P",
		e3: "1",
		e4: "1",
		e5: "1",
		e6: "1",
		e7: "p",
		e8: "k",
		f1: "B",
		f2: "P",
		f3: "1",
		f4: "1",
		f5: "1",
		f6: "1",
		f7: "p",
		f8: "b",
		g1: "N",
		g2: "P",
		g3: "1",
		g4: "1",
		g5: "1",
		g6: "1",
		g7: "p",
		g8: "n",
		h1: "R",
		h2: "P",
		h3: "1",
		h4: "1",
		h5: "1",
		h6: "1",
		h7: "p",
		h8: "r",
	};
	let setPosition = jest.fn()
	let setLastMove = jest.fn()
	let listTargetS = []
	addLineMove(listMove, listTargetS, "", position, "white", setPosition, setLastMove);
	expect(listTargetS.length).toEqual(1)
	listMove = ["a"]
	addLineMove(listMove, listTargetS, "", position, "white", setPosition, setLastMove);
	expect(listTargetS.length).toEqual(1)
})

it("Add jump move", () => {
	jest.spyOn(funcz, 'newElementTarget').mockReturnValue("")
	let listMove = ["a3", "a7", "a1", "a"]
	let position = {
		a1: "R",
		a2: "P",
		a3: "1",
		a4: "1",
		a5: "1",
		a6: "1",
		a7: "p",
		a8: "r",
		b1: "N",
		b2: "P",
		b3: "1",
		b4: "1",
		b5: "1",
		b6: "1",
		b7: "p",
		b8: "n",
		c1: "B",
		c2: "P",
		c3: "1",
		c4: "1",
		c5: "1",
		c6: "1",
		c7: "p",
		c8: "b",
		d1: "Q",
		d2: "P",
		d3: "1",
		d4: "1",
		d5: "1",
		d6: "1",
		d7: "p",
		d8: "q",
		e1: "K",
		e2: "P",
		e3: "1",
		e4: "1",
		e5: "1",
		e6: "1",
		e7: "p",
		e8: "k",
		f1: "B",
		f2: "P",
		f3: "1",
		f4: "1",
		f5: "1",
		f6: "1",
		f7: "p",
		f8: "b",
		g1: "N",
		g2: "P",
		g3: "1",
		g4: "1",
		g5: "1",
		g6: "1",
		g7: "p",
		g8: "n",
		h1: "R",
		h2: "P",
		h3: "1",
		h4: "1",
		h5: "1",
		h6: "1",
		h7: "p",
		h8: "r",
	};
	let setPosition = jest.fn()
	let setLastMove = jest.fn()
	let listTargetS = []
	addJumpMove(listMove, listTargetS, "", position, "white", setPosition, setLastMove);
	expect(listTargetS.length).toEqual(2)
	listMove = ["a"]
	addJumpMove(listMove, listTargetS, "", position, "white", setPosition, setLastMove);
	expect(listTargetS.length).toEqual(2)
})

it("Add eat move", () => {
	jest.spyOn(funcz, 'newElementTarget').mockReturnValue("")
	let listMove = ["a3", "a7", "a1", "a"]
	let position = {
		a1: "R",
		a2: "P",
		a3: "1",
		a4: "1",
		a5: "1",
		a6: "1",
		a7: "p",
		a8: "r",
		b1: "N",
		b2: "P",
		b3: "1",
		b4: "1",
		b5: "1",
		b6: "1",
		b7: "p",
		b8: "n",
		c1: "B",
		c2: "P",
		c3: "1",
		c4: "1",
		c5: "1",
		c6: "1",
		c7: "p",
		c8: "b",
		d1: "Q",
		d2: "P",
		d3: "1",
		d4: "1",
		d5: "1",
		d6: "1",
		d7: "p",
		d8: "q",
		e1: "K",
		e2: "P",
		e3: "1",
		e4: "1",
		e5: "1",
		e6: "1",
		e7: "p",
		e8: "k",
		f1: "B",
		f2: "P",
		f3: "1",
		f4: "1",
		f5: "1",
		f6: "1",
		f7: "p",
		f8: "b",
		g1: "N",
		g2: "P",
		g3: "1",
		g4: "1",
		g5: "1",
		g6: "1",
		g7: "p",
		g8: "n",
		h1: "R",
		h2: "P",
		h3: "1",
		h4: "1",
		h5: "1",
		h6: "1",
		h7: "p",
		h8: "r",
	};
	let setPosition = jest.fn()
	let setLastMove = jest.fn()
	let listTargetS = []
	addEatMove(listMove, listTargetS, "", position, "white", setPosition, setLastMove);
	expect(listTargetS.length).toEqual(1)
	listMove = ["a"]
	addEatMove(listMove, listTargetS, "", position, "white", setPosition, setLastMove);
	expect(listTargetS.length).toEqual(1)
})

it("Add line and eat move", () => {
	jest.spyOn(funcz, 'newElementTarget').mockReturnValue("")
	let listMove = ["a3", "a7", "a1", "a"]
	let position = {
		a1: "R",
		a2: "P",
		a3: "1",
		a4: "1",
		a5: "1",
		a6: "1",
		a7: "p",
		a8: "r",
		b1: "N",
		b2: "P",
		b3: "1",
		b4: "1",
		b5: "1",
		b6: "1",
		b7: "p",
		b8: "n",
		c1: "B",
		c2: "P",
		c3: "1",
		c4: "1",
		c5: "1",
		c6: "1",
		c7: "p",
		c8: "b",
		d1: "Q",
		d2: "P",
		d3: "1",
		d4: "1",
		d5: "1",
		d6: "1",
		d7: "p",
		d8: "q",
		e1: "K",
		e2: "P",
		e3: "1",
		e4: "1",
		e5: "1",
		e6: "1",
		e7: "p",
		e8: "k",
		f1: "B",
		f2: "P",
		f3: "1",
		f4: "1",
		f5: "1",
		f6: "1",
		f7: "p",
		f8: "b",
		g1: "N",
		g2: "P",
		g3: "1",
		g4: "1",
		g5: "1",
		g6: "1",
		g7: "p",
		g8: "n",
		h1: "R",
		h2: "P",
		h3: "1",
		h4: "1",
		h5: "1",
		h6: "1",
		h7: "p",
		h8: "r",
	};
	let setPosition = jest.fn()
	let setLastMove = jest.fn()
	let listTargetS = []
	addLineMoveAndEat(listMove, listTargetS, "", position, "white", setPosition, setLastMove);
	expect(listTargetS.length).toEqual(2)
	listMove = ["a"]
	addLineMoveAndEat(listMove, listTargetS, "", position, "white", setPosition, setLastMove);
	expect(listTargetS.length).toEqual(2)
	listMove = ["a1"]
	addLineMoveAndEat(listMove, listTargetS, "", position, "white", setPosition, setLastMove);
	expect(listTargetS.length).toEqual(2)
})
