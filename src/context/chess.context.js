import React, {useContext, useEffect, useState} from "react";
import {customPieces} from "../resource/piece";
import {realtime, updateTable} from "../firebase/db";
import {onValue, ref} from "firebase/database"
import {listKingTarget} from "../function/king";
import {listTarget} from "../function/move";
import {decodePosition, encodePosition} from "../function/func";

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
	const numTable = localStorage.getItem("numTable")
	const [whitePlayer, setWhitePlayer] = useState("")
	const [blackPlayer, setBlackPlayer] = useState("")
	const side = localStorage.getItem("side")
	const [position, setPosition] = useState({
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
	});
	const [sideWin, setSideWin] = useState("");
	const [sideMove, setSideMove] = useState("");
	const [lastMove, setLastMove] = useState("")
	const [historyMove, setHistoryMove] = useState([]);

	useEffect(() => {
		const valueRef = ref(realtime, numTable)
		onValue(valueRef, (snapshot) => {
			const data = snapshot.val()
			if (whitePlayer !== data.whitePlayer) {
				setWhitePlayer(data.whitePlayer)
				localStorage.setItem("whitePlayer", whitePlayer)
			}
			if (blackPlayer !== data.blackPlayer) {
				setBlackPlayer(data.blackPlayer)
				localStorage.setItem("blackPlayer", blackPlayer)
			}
			if (sideMove !== data.sideMove) {
				setSideMove(data.sideMove)
			}
			if (sideWin !== data.sideWin) {
				setSideWin(data.sideWin)
			}
			if (encodePosition(position) !== data.position) {
				decodePosition(data.position, position, setPosition)
			}
		})
	})

	useEffect(() => {
		if (lastMove !== "") {
			if (sideMove === "white") {
				let opMove = "black"
				updateTable(parseInt(numTable), {sideMove: opMove})
			}
			if (sideMove === "black") {
				let opMove = "white"
				updateTable(parseInt(numTable), {sideMove: opMove})
			}
			historyMove.push(lastMove);
			setHistoryMove([...historyMove]);
		}
	}, [lastMove])

	const onPieceClick = async (event) => {
		if (sideWin !== "") return;
		if (sideMove !== side) return;
		if (side === "white" && event.currentTarget.getAttribute("data-piece") === event.currentTarget.getAttribute("data-piece").toLowerCase()) {
			return;
		}
		if (side === "black" && event.currentTarget.getAttribute("data-piece") === event.currentTarget.getAttribute("data-piece").toUpperCase()) {
			return;
		}
		const parent = event.currentTarget.parentNode;
		if (parent.style["background-color"] === "var(--piece-selected-background)") {
			parent.style["background-color"] = "";
			document.querySelectorAll(`div[target-square]`).forEach((x) => {
				x.parentNode.removeChild(x);
			});
		} else {
			document.querySelectorAll(`div[data-piece]`).forEach((x) => {
				x.parentNode.style["background-color"] = "";
			});
			document.querySelectorAll(`div[target-square]`).forEach((x) => {
				x.parentNode.removeChild(x);
			});
			parent.style["background-color"] = "var(--piece-selected-background)";
			const square = parent.parentNode.getAttribute("data-square");
			const piece = event.currentTarget.getAttribute("data-piece");
			if (piece === "K" || piece === "k") {
				listKingTarget(square, piece, position, setPosition, setLastMove).forEach((element) => parent.appendChild(element));
			} else {
				listTarget(square, piece, position, setPosition, setLastMove).forEach((element) => parent.appendChild(element));
			}
		}
	}

	return (<ChessContext.Provider
		value={{
			customLightSquareStyle, customDarkSquareStyle,

			customChessPieces,

			whitePlayer, blackPlayer, side,

			position,

			sideWin, sideMove,

			onPieceClick
		}}
	>
		{children}
	</ChessContext.Provider>)
}