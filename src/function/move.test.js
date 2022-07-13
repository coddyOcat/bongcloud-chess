import {BishopMove, KingMove, KnightMove, listTarget, PawnMove, QueenMove, RookMove} from "./move";

import * as funz from "./func"

jest.spyOn(funz, "addLineMove").mockReturnValue("");
jest.spyOn(funz, "addEatMove").mockReturnValue("");
jest.spyOn(funz, "addLineMoveAndEat").mockReturnValue("");
jest.spyOn(funz, "addJumpMove").mockReturnValue("")

it("Pawn move", () => {
	let square = "b2"
	let listTargetS
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
	let side = "white"
	let setPosition = jest.fn();
	let setLastMove = jest.fn();

	PawnMove(square, listTargetS,position,side,setPosition, setLastMove)
	expect(setLastMove).toHaveBeenCalledTimes(0)

	square = "b1"
	side = "black"
	PawnMove(square, listTargetS,position,side,setPosition, setLastMove)
	expect(setLastMove).toHaveBeenCalledTimes(0)
})

it("Rook move", () => {
	let square = "b2"
	let listTargetS
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
	let side = "white"
	let setPosition = jest.fn();
	let setLastMove = jest.fn();

	RookMove(square, listTargetS,position,side,setPosition, setLastMove)
	expect(setLastMove).toHaveBeenCalledTimes(0)

	square = "b1"
	side = "black"
	RookMove(square, listTargetS,position,side,setPosition, setLastMove)
	expect(setLastMove).toHaveBeenCalledTimes(0)
})

it("Bishop move", () => {
	let square = "b2"
	let listTargetS
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
	let side = "white"
	let setPosition = jest.fn();
	let setLastMove = jest.fn();

	BishopMove(square, listTargetS,position,side,setPosition, setLastMove)
	expect(setLastMove).toHaveBeenCalledTimes(0)

	square = "b1"
	side = "black"
	BishopMove(square, listTargetS,position,side,setPosition, setLastMove)
	expect(setLastMove).toHaveBeenCalledTimes(0)
})

it("Knight move", () => {
	let square = "b2"
	let listTargetS
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
	let side = "white"
	let setPosition = jest.fn();
	let setLastMove = jest.fn();

	KnightMove(square, listTargetS,position,side,setPosition, setLastMove)
	expect(setLastMove).toHaveBeenCalledTimes(0)

	square = "b1"
	side = "black"
	KnightMove(square, listTargetS,position,side,setPosition, setLastMove)
	expect(setLastMove).toHaveBeenCalledTimes(0)
})

it("Queen move", () => {
	let square = "b2"
	let listTargetS
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
	let side = "white"
	let setPosition = jest.fn();
	let setLastMove = jest.fn();

	QueenMove(square, listTargetS,position,side,setPosition, setLastMove)
	expect(setLastMove).toHaveBeenCalledTimes(0)

	square = "b1"
	side = "black"
	QueenMove(square, listTargetS,position,side,setPosition, setLastMove)
	expect(setLastMove).toHaveBeenCalledTimes(0)
})

it("King move", () => {
	let square = "b2"
	let listTargetS
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
	let side = "white"
	let setPosition = jest.fn();
	let setLastMove = jest.fn();

	KingMove(square, listTargetS,position,side,setPosition, setLastMove)
	expect(setLastMove).toHaveBeenCalledTimes(0)

	square = "b1"
	side = "black"
	KingMove(square, listTargetS,position,side,setPosition, setLastMove)
	expect(setLastMove).toHaveBeenCalledTimes(0)
})

it("List target", () => {
	let square = "b5"
	let piece
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
	let setPosition = jest.fn();
	let setLastMove = jest.fn();

	let listTargetS
	piece = "P"
	listTargetS = listTarget(square, piece, position, setPosition, setLastMove)
	expect(listTargetS.length).toEqual(0);
	piece = "R"
	listTargetS = listTarget(square, piece, position, setPosition, setLastMove)
	expect(listTargetS.length).toEqual(0);
	piece = "N"
	listTargetS = listTarget(square, piece, position, setPosition, setLastMove)
	expect(listTargetS.length).toEqual(0);
	piece = "B"
	listTargetS = listTarget(square, piece, position, setPosition, setLastMove)
	expect(listTargetS.length).toEqual(0);
	piece = "Q"
	listTargetS = listTarget(square, piece, position, setPosition, setLastMove)
	expect(listTargetS.length).toEqual(0);
	piece = "K"
	listTargetS = listTarget(square, piece, position, setPosition, setLastMove)
	expect(listTargetS.length).toEqual(0);
	piece = "p"
	listTargetS = listTarget(square, piece, position, setPosition, setLastMove)
	expect(listTargetS.length).toEqual(0);
	piece = "r"
	listTargetS = listTarget(square, piece, position, setPosition, setLastMove)
	expect(listTargetS.length).toEqual(0);
	piece = "n"
	listTargetS = listTarget(square, piece, position, setPosition, setLastMove)
	expect(listTargetS.length).toEqual(0);
	piece = "b"
	listTargetS = listTarget(square, piece, position, setPosition, setLastMove)
	expect(listTargetS.length).toEqual(0);
	piece = "q"
	listTargetS = listTarget(square, piece, position, setPosition, setLastMove)
	expect(listTargetS.length).toEqual(0);
	piece = "k"
	listTargetS = listTarget(square, piece, position, setPosition, setLastMove)
	expect(listTargetS.length).toEqual(0);
})
