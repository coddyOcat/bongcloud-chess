import {addEatMove, addJumpMove, addLineMove, addLineMoveAndEat, getColumn, getRow,} from "./func";

const PawnMove = (
	square,
	listTargetS,
	position,
	side,
	setPosition,
	setLastMove
) => {
	var step;
	if (side === "white") {
		step = 1;
	} else {
		step = -1;
	}
	var listMainMove;
	if (square[1] === "2" || square[1] === "7") {
		listMainMove = [
			getColumn(square, 0) + getRow(square, step),
			getColumn(square, 0) + getRow(square, step * 2),
		];
	} else {
		listMainMove = [getColumn(square, 0) + getRow(square, step)];
	}
	var listEatMove = [
		getColumn(square, -1) + getRow(square, step),
		getColumn(square, 1) + getRow(square, step),
	];

	addLineMove(
		listMainMove,
		listTargetS,
		square,
		position,
		side,
		setPosition,
		setLastMove
	);
	addEatMove(
		listEatMove,
		listTargetS,
		square,
		position,
		side,
		setPosition,
		setLastMove
	);
};

const RookMove = (
	square,
	listTargetS,
	position,
	side,
	setPosition,
	setLastMove
) => {
	var listMainMove;
	listMainMove = [...Array(8).keys()].map((x) => {
		return getColumn(square, 0) + getRow(square, x + 1);
	});
	addLineMoveAndEat(
		listMainMove,
		listTargetS,
		square,
		position,
		side,
		setPosition,
		setLastMove
	);
	listMainMove = [...Array(8).keys()].map((x) => {
		return getColumn(square, 0) + getRow(square, -x - 1);
	});
	addLineMoveAndEat(
		listMainMove,
		listTargetS,
		square,
		position,
		side,
		setPosition,
		setLastMove
	);
	listMainMove = [...Array(8).keys()].map((x) => {
		return getColumn(square, x + 1) + getRow(square, 0);
	});
	addLineMoveAndEat(
		listMainMove,
		listTargetS,
		square,
		position,
		side,
		setPosition,
		setLastMove
	);
	listMainMove = [...Array(8).keys()].map((x) => {
		return getColumn(square, -x - 1) + getRow(square, 0);
	});
	addLineMoveAndEat(
		listMainMove,
		listTargetS,
		square,
		position,
		side,
		setPosition,
		setLastMove
	);
};

const BishopMove = (
	square,
	listTargetS,
	position,
	side,
	setPosition,
	setLastMove
) => {
	var listMainMove;
	listMainMove = [...Array(8).keys()].map((x) => {
		return getColumn(square, x + 1) + getRow(square, x + 1);
	});
	addLineMoveAndEat(
		listMainMove,
		listTargetS,
		square,
		position,
		side,
		setPosition,
		setLastMove
	);
	listMainMove = [...Array(8).keys()].map((x) => {
		return getColumn(square, -x - 1) + getRow(square, -x - 1);
	});
	addLineMoveAndEat(
		listMainMove,
		listTargetS,
		square,
		position,
		side,
		setPosition,
		setLastMove
	);
	listMainMove = [...Array(8).keys()].map((x) => {
		return getColumn(square, x + 1) + getRow(square, -x - 1);
	});
	addLineMoveAndEat(
		listMainMove,
		listTargetS,
		square,
		position,
		side,
		setPosition,
		setLastMove
	);
	listMainMove = [...Array(8).keys()].map((x) => {
		return getColumn(square, -x - 1) + getRow(square, x + 1);
	});
	addLineMoveAndEat(
		listMainMove,
		listTargetS,
		square,
		position,
		side,
		setPosition,
		setLastMove
	);
};

const KnightMove = (
	square,
	listTargetS,
	position,
	side,
	setPosition,
	setLastMove
) => {
	var listMainMove = [
		getColumn(square, -2) + getRow(square, -1),
		getColumn(square, -2) + getRow(square, 1),
		getColumn(square, -1) + getRow(square, -2),
		getColumn(square, -1) + getRow(square, 2),
		getColumn(square, 1) + getRow(square, -2),
		getColumn(square, 1) + getRow(square, 2),
		getColumn(square, 2) + getRow(square, -1),
		getColumn(square, 2) + getRow(square, 1),
	];

	addJumpMove(
		listMainMove,
		listTargetS,
		square,
		position,
		side,
		setPosition,
		setLastMove
	);
};

const QueenMove = (
	square,
	listTargetS,
	position,
	side,
	setPosition,
	setLastMove
) => {
	var listMainMove;
	listMainMove = [...Array(8).keys()].map((x) => {
		return getColumn(square, 0) + getRow(square, x + 1);
	});
	addLineMoveAndEat(
		listMainMove,
		listTargetS,
		square,
		position,
		side,
		setPosition,
		setLastMove
	);
	listMainMove = [...Array(8).keys()].map((x) => {
		return getColumn(square, 0) + getRow(square, -x - 1);
	});
	addLineMoveAndEat(
		listMainMove,
		listTargetS,
		square,
		position,
		side,
		setPosition,
		setLastMove
	);
	listMainMove = [...Array(8).keys()].map((x) => {
		return getColumn(square, x + 1) + getRow(square, 0);
	});
	addLineMoveAndEat(
		listMainMove,
		listTargetS,
		square,
		position,
		side,
		setPosition,
		setLastMove
	);
	listMainMove = [...Array(8).keys()].map((x) => {
		return getColumn(square, -x - 1) + getRow(square, 0);
	});
	addLineMoveAndEat(
		listMainMove,
		listTargetS,
		square,
		position,
		side,
		setPosition,
		setLastMove
	);
	listMainMove = [...Array(8).keys()].map((x) => {
		return getColumn(square, x + 1) + getRow(square, x + 1);
	});
	addLineMoveAndEat(
		listMainMove,
		listTargetS,
		square,
		position,
		side,
		setPosition,
		setLastMove
	);
	listMainMove = [...Array(8).keys()].map((x) => {
		return getColumn(square, -x - 1) + getRow(square, -x - 1);
	});
	addLineMoveAndEat(
		listMainMove,
		listTargetS,
		square,
		position,
		side,
		setPosition,
		setLastMove
	);
	listMainMove = [...Array(8).keys()].map((x) => {
		return getColumn(square, x + 1) + getRow(square, -x - 1);
	});
	addLineMoveAndEat(
		listMainMove,
		listTargetS,
		square,
		position,
		side,
		setPosition,
		setLastMove
	);
	listMainMove = [...Array(8).keys()].map((x) => {
		return getColumn(square, -x - 1) + getRow(square, x + 1);
	});
	addLineMoveAndEat(
		listMainMove,
		listTargetS,
		square,
		position,
		side,
		setPosition,
		setLastMove
	);
};

const KingMove = (
	square,
	listTargetS,
	position,
	side,
	setPosition,
	setLastMove
) => {
	var listMainMove = [
		getColumn(square, -1) + getRow(square, -1),
		getColumn(square, -1) + getRow(square, 0),
		getColumn(square, -1) + getRow(square, 1),
		getColumn(square, 0) + getRow(square, 1),
		getColumn(square, 1) + getRow(square, 1),
		getColumn(square, 1) + getRow(square, 0),
		getColumn(square, 1) + getRow(square, -1),
		getColumn(square, 0) + getRow(square, -1),
	];
	addJumpMove(
		listMainMove,
		listTargetS,
		square,
		position,
		side,
		setPosition,
		setLastMove
	);
};

export const listTarget = (
	square,
	piece,
	position,
	setPosition,
	setLastMove
) => {
	const listTargetS = [];
	var side = "white";
	switch (piece) {
		case "P":
			PawnMove(square, listTargetS, position, side, setPosition, setLastMove);
			break;
		case "R":
			RookMove(square, listTargetS, position, side, setPosition, setLastMove);
			break;
		case "N":
			KnightMove(square, listTargetS, position, side, setPosition, setLastMove);
			break;
		case "B":
			BishopMove(square, listTargetS, position, side, setPosition, setLastMove);
			break;
		case "Q":
			QueenMove(square, listTargetS, position, side, setPosition, setLastMove);
			break;
		case "K":
			KingMove(square, listTargetS, position, side, setPosition, setLastMove);
			break;
		case "p":
			side = "black";
			PawnMove(square, listTargetS, position, side, setPosition, setLastMove);
			break;
		case "r":
			side = "black";
			RookMove(square, listTargetS, position, side, setPosition, setLastMove);
			break;
		case "n":
			side = "black";
			KnightMove(square, listTargetS, position, side, setPosition, setLastMove);
			break;
		case "b":
			side = "black";
			BishopMove(square, listTargetS, position, side, setPosition, setLastMove);
			break;
		case "q":
			side = "black";
			QueenMove(square, listTargetS, position, side, setPosition, setLastMove);
			break;
		case "k":
			side = "black";
			KingMove(square, listTargetS, position, side, setPosition, setLastMove);
			break;
		default:
	}
	return listTargetS;
};
