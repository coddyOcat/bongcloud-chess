import React, {useContext} from "react";
import {customPieces} from "../resource/piece";

const ChessContext = React.createContext();

export const useChess = () => useContext(ChessContext)

export const ChessProvider = ({children}) => {
	// style
	const customDarkSquareStyle = {
		backgroundColor: "var(--dark-square-background)"
	}

	const customLightSquareStyle = {
		backgroundColor: "var(--light-square-background)"
	}

	// piece image
	const customChessPieces = customPieces("california");

	// game state
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

	return (<ChessContext.Provider
		value={{
			customLightSquareStyle, customDarkSquareStyle,

			customChessPieces,

			position
		}}
	>
		{children}
	</ChessContext.Provider>)
}