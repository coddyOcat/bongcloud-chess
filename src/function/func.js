import {customPieces} from "../resource/piece";
import {updateTable} from "../firebase/db";

export const columnKey = ["_", "a", "b", "c", "d", "e", "f", "g", "h"];
export const column = {
	a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8,
};

export const getColumn = (square, step) => {
	const ind = columnKey.findIndex((x) => x === square[0]) + step;
	if (ind > 0 && ind <= 8) {
		return columnKey[columnKey.findIndex((x) => x === square[0]) + step];
	} else {
		return "";
	}
};

export const getRow = (square, step) => {
	const row = parseInt(square[1]) + step;
	if (row > 0 && row <= 8) {
		return parseInt(square[1]) + step;
	} else {
		return "";
	}
};

export const WhiteSide = ["P", "R", "N", "B", "Q", "K"];
export const BlackSide = ["p", "r", "n", "b", "q", "k"];
export const BothSide = [...WhiteSide, ...BlackSide];

export const encodePosition = (position) => {
	let strPos = "";
	const arrInd = [...Array(8).keys()];
	arrInd.forEach((r) => {
		arrInd.forEach((c) => {
			const square = columnKey[c + 1] + (r + 1);
			const piece = position[square];
			strPos += piece;
		});
	});
	return strPos;
};

export const decodePosition = (strPos, position, setPosition) => {
	const arrInd = [...Array(8).keys()];
	arrInd.forEach((r) => {
		arrInd.forEach((c) => {
			const square = columnKey[c + 1] + (r + 1);
			const ind = c + r * 8;
			position[square] = strPos[ind];
		});
	});
	setPosition({...position});
};

export const movePieceToTarget = async (event, position, setPosition, setLastMove) => {
	const targetDiv = event.currentTarget;
	const sourceDiv = targetDiv.parentNode.parentNode;
	const pieceDiv = targetDiv.parentNode.querySelector(`div[data-piece]`);

	const targetSquare = targetDiv.getAttribute("target-square");
	const sourceSquare = sourceDiv.getAttribute("data-square");
	const pieceType = pieceDiv.getAttribute("data-piece");

	position[targetSquare] = position[sourceSquare];
	position[sourceSquare] = "1";
	const data = {
		position: encodePosition(position)
	};
	// console.log(data, position[targetSquare], position[sourceSquare])
	await updateTable(parseInt(localStorage.getItem("numTable")), data);
	document.querySelectorAll(`div[target-square]`).forEach((x) => {
		x.parentNode.style.backgroundColor = "";
		x.parentNode.removeChild(x);
	});

	if ((pieceType === "P" || pieceType === "p") && targetSquare[1] === "8") {
		var side = "white";
		if (pieceType === "p") {
			side = "black";
		}
		const promoteDiv = newElementPromoteOption(side, targetSquare, position, setPosition, setLastMove);
		if (column[targetSquare[0]] < column[sourceSquare[0]]) {
			promoteDiv.style.left = "-50%";
		} else {
			promoteDiv.style.left = "50%";
		}
		sourceDiv.appendChild(promoteDiv);
	} else {
		setLastMove(pieceType + targetSquare);
	}
};

export const choosePromote = (event, square, position, setPosition, setLastMove) => {
	const element = event.currentTarget;
	position[square] = element.getAttribute("promote-piece");
	setLastMove(position[square] + square);
	setPosition({...position});
	element.parentNode.parentNode.removeChild(element.parentNode);
};

export const newElementTarget = (sourceSquare, targetSquare, isEnemy, side, position, setPosition, setLastMove) => {
	const newDiv = document.createElement("div");
	newDiv.setAttribute("target-square", targetSquare);
	newDiv.style.display = "flex";
	newDiv.style.position = "absolute";
	newDiv.style.width = "100%";
	newDiv.style.height = "100%";

	newDiv.addEventListener("mousedown", (event) => movePieceToTarget(event, position, setPosition, setLastMove));

	var increaseX = column[targetSquare[0]] - column[sourceSquare[0]];
	var increaseY = parseInt(sourceSquare[1]) - parseInt(targetSquare[1]);
	if (side === "black") {
		increaseX = -increaseX;
		increaseY = -increaseY;
	}
	newDiv.style.top = `${increaseY * 100}%`;
	newDiv.style.left = `${increaseX * 100}%`;

	const sign = document.createElement("div");
	sign.style.width = "40%";
	sign.style.height = "40%";
	sign.style.borderRadius = "50%";
	sign.style.backgroundColor = isEnemy ? "var(--target-enemy-background)" : "var(--target-no-enemy-background)";
	sign.style.margin = "auto";
	sign.style.zIndex = 1;

	newDiv.appendChild(sign);

	return newDiv;
};

export const newElementPromoteOption = (side, square, position, setPosition, setLastMove) => {
	const newDiv = document.createElement("div");
	newDiv.style.width = "100%";
	newDiv.style.height = "400%";
	newDiv.style.position = "relative";
	newDiv.style.top = "-150%";
	newDiv.style.zIndex = "2";

	const chessPieces = customPieces("california");

	const WhitePromote = ["Q", "R", "B", "N"];
	const BlackPromote = ["q", "r", "b", "n"];

	const SidePromote = side === "white" ? WhitePromote : BlackPromote;

	const check = side === "white" ? 0 : 1;
	SidePromote.forEach((x, idx) => {
		const newOption = document.createElement("div");
		newOption.setAttribute("promote-piece", x);
		newOption.style.width = "100%";
		newOption.style.height = "25%";
		newOption.style.backgroundColor = idx % 2 === check ? "var(--light-square-background)" : "var(--dark-square-background)";
		newOption.style.backgroundSize = "contain";
		newOption.style.backgroundImage = `url(${chessPieces[x]})`;
		newOption.style.filter = "drop-shadow(8px 8px 1px #700121)";
		newOption.style.cursor = "pointer";
		newOption.addEventListener("mousedown", (event) => choosePromote(event, square, position, setPosition, setLastMove));
		newDiv.appendChild(newOption);
	});

	return newDiv;
};

export const addLineMove = (listMove, listTargetS, square, position, side, setPosition, setLastMove) => {
	for (let i = 0; i < listMove.length; i++) {
		let targetSquare = listMove[i];
		if (targetSquare.length !== 2) {
			break;
		}
		if (!BothSide.find((x) => x === position[targetSquare])) {
			listTargetS.push(newElementTarget(square, targetSquare, false, side, position, setPosition, setLastMove));
		} else {
			break;
		}
	}
};

export const addJumpMove = (listMove, listTargetS, square, position, side, setPosition, setLastMove) => {
	for (let i = 0; i < listMove.length; i++) {
		let targetSquare = listMove[i];
		if (targetSquare.length !== 2) {
			continue;
		}
		const Side = side === "white" ? WhiteSide : BlackSide;
		const OpSide = side === "white" ? BlackSide : WhiteSide;
		if (OpSide.find((x) => x === position[targetSquare])) {
			listTargetS.push(newElementTarget(square, targetSquare, true, side, position, setPosition, setLastMove));
		} else if (Side.find((x) => x === position[targetSquare])) {
		} else {
			listTargetS.push(newElementTarget(square, targetSquare, false, side, position, setPosition, setLastMove));
		}
	}
};

export const addEatMove = (listMove, listTargetS, square, position, side, setPosition, setLastMove) => {
	for (let i = 0; i < listMove.length; i++) {
		let targetSquare = listMove[i];
		if (targetSquare.length !== 2) {
			continue;
		}
		const OpSide = side === "white" ? BlackSide : WhiteSide;
		if (OpSide.find((x) => x === position[targetSquare])) {
			listTargetS.push(newElementTarget(square, targetSquare, true, side, position, setPosition, setLastMove));
		}
	}
};

export const addLineMoveAndEat = (listMove, listTargetS, square, position, side, setPosition, setLastMove) => {
	for (let i = 0; i < listMove.length; i++) {
		let targetSquare = listMove[i];
		if (targetSquare.length !== 2) {
			break;
		}
		const Side = side === "white" ? WhiteSide : BlackSide;
		const OpSide = side === "white" ? BlackSide : WhiteSide;
		if (OpSide.find((x) => x === position[targetSquare])) {
			listTargetS.push(newElementTarget(square, targetSquare, true, side, position, setPosition, setLastMove));
			break;
		} else if (Side.find((x) => x === position[targetSquare])) {
			break;
		} else {
			listTargetS.push(newElementTarget(square, targetSquare, false, side, position, setPosition, setLastMove));
		}
	}
};
