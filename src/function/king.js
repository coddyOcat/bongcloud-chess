import { addJumpMove, columnKey, getColumn, getRow } from "./func";

export const addLineBlock = (listBlock, position) => {
	const listBlockz = [];
	for (let i = 0; i < listBlock.length; i++) {
		let block = listBlock[i];
		if (block.length !== 2) {
			break;
		}
		if (position[block] === "1") {
			if (!listBlockz.includes(block)) {
				listBlockz.push(block);
			}
		} else {
			if (!listBlockz.includes(block)) {
				listBlockz.push(block);
			}
			break;
		}
	}
	return listBlockz;
};

export const addBlock = (listBlock, position) => {
	const listBlockz = [];
	for (let i = 0; i < listBlock.length; i++) {
		let block = listBlock[i];
		if (block.length !== 2) {
			continue;
		}
		if (!listBlockz.includes(block)) {
			listBlockz.push(block);
		}
	}
	return listBlockz;
};

export const PawnBlock = (square, side, position) => {
	var step;
	if (side === "white") {
		step = 1;
	} else {
		step = -1;
	}
	var listBlock = [
		getColumn(square, -1) + getRow(square, step),
		getColumn(square, 1) + getRow(square, step),
	];

	return addBlock(listBlock, position);
};

export const RookBlock = (square, side, position) => {
	var listBlock = [];
	var listBlockz;
	listBlockz = [...Array(8).keys()].map((x) => {
		return getColumn(square, 0) + getRow(square, x + 1);
	});
	addLineBlock(listBlockz, position).forEach((block) => {
		if (!listBlock.includes(block)) {
			listBlock.push(block);
		}
	});

	listBlockz = [...Array(8).keys()].map((x) => {
		return getColumn(square, 0) + getRow(square, -x - 1);
	});
	addLineBlock(listBlockz, position).forEach((block) => {
		if (!listBlock.includes(block)) {
			listBlock.push(block);
		}
	});

	listBlockz = [...Array(8).keys()].map((x) => {
		return getColumn(square, x + 1) + getRow(square, 0);
	});
	addLineBlock(listBlockz, position).forEach((block) => {
		if (!listBlock.includes(block)) {
			listBlock.push(block);
		}
	});

	listBlockz = [...Array(8).keys()].map((x) => {
		return getColumn(square, -x - 1) + getRow(square, 0);
	});
	addLineBlock(listBlockz, position).forEach((block) => {
		if (!listBlock.includes(block)) {
			listBlock.push(block);
		}
	});

	return listBlock;
};

export const BishopBlock = (square, side, position) => {
	var listBlock = [];
	var listBlockz;
	listBlockz = [...Array(8).keys()].map((x) => {
		return getColumn(square, x + 1) + getRow(square, x + 1);
	});
	addLineBlock(listBlockz, position).forEach((block) => {
		if (!listBlock.includes(block)) {
			listBlock.push(block);
		}
	});

	listBlockz = [...Array(8).keys()].map((x) => {
		return getColumn(square, -x - 1) + getRow(square, -x - 1);
	});
	addLineBlock(listBlockz, position).forEach((block) => {
		if (!listBlock.includes(block)) {
			listBlock.push(block);
		}
	});

	listBlockz = [...Array(8).keys()].map((x) => {
		return getColumn(square, x + 1) + getRow(square, -x - 1);
	});
	addLineBlock(listBlockz, position).forEach((block) => {
		if (!listBlock.includes(block)) {
			listBlock.push(block);
		}
	});

	listBlockz = [...Array(8).keys()].map((x) => {
		return getColumn(square, -x - 1) + getRow(square, x + 1);
	});
	addLineBlock(listBlockz, position).forEach((block) => {
		if (!listBlock.includes(block)) {
			listBlock.push(block);
		}
	});

	return listBlock;
};

export const KnightBlock = (square, side, position) => {
	var listBlock = [
		getColumn(square, -2) + getRow(square, -1),
		getColumn(square, -2) + getRow(square, 1),
		getColumn(square, -1) + getRow(square, -2),
		getColumn(square, -1) + getRow(square, 2),
		getColumn(square, 1) + getRow(square, -2),
		getColumn(square, 1) + getRow(square, 2),
		getColumn(square, 2) + getRow(square, -1),
		getColumn(square, 2) + getRow(square, 1),
	];

	return addBlock(listBlock, position);
};

export const QueenBlock = (square, side, position) => {
	var listBlock = [];
	var listBlockz;
	listBlockz = [...Array(8).keys()].map((x) => {
		return getColumn(square, 0) + getRow(square, x + 1);
	});
	addLineBlock(listBlockz, position).forEach((block) => {
		if (!listBlock.includes(block)) {
			listBlock.push(block);
		}
	});

	listBlockz = [...Array(8).keys()].map((x) => {
		return getColumn(square, 0) + getRow(square, -x - 1);
	});
	addLineBlock(listBlockz, position).forEach((block) => {
		if (!listBlock.includes(block)) {
			listBlock.push(block);
		}
	});

	listBlockz = [...Array(8).keys()].map((x) => {
		return getColumn(square, x + 1) + getRow(square, 0);
	});
	addLineBlock(listBlockz, position).forEach((block) => {
		if (!listBlock.includes(block)) {
			listBlock.push(block);
		}
	});

	listBlockz = [...Array(8).keys()].map((x) => {
		return getColumn(square, -x - 1) + getRow(square, 0);
	});
	addLineBlock(listBlockz, position).forEach((block) => {
		if (!listBlock.includes(block)) {
			listBlock.push(block);
		}
	});

	listBlockz = [...Array(8).keys()].map((x) => {
		return getColumn(square, x + 1) + getRow(square, x + 1);
	});
	addLineBlock(listBlockz, position).forEach((block) => {
		if (!listBlock.includes(block)) {
			listBlock.push(block);
		}
	});

	listBlockz = [...Array(8).keys()].map((x) => {
		return getColumn(square, -x - 1) + getRow(square, -x - 1);
	});
	addLineBlock(listBlockz, position).forEach((block) => {
		if (!listBlock.includes(block)) {
			listBlock.push(block);
		}
	});

	listBlockz = [...Array(8).keys()].map((x) => {
		return getColumn(square, x + 1) + getRow(square, -x - 1);
	});
	addLineBlock(listBlockz, position).forEach((block) => {
		if (!listBlock.includes(block)) {
			listBlock.push(block);
		}
	});

	listBlockz = [...Array(8).keys()].map((x) => {
		return getColumn(square, -x - 1) + getRow(square, x + 1);
	});
	addLineBlock(listBlockz, position).forEach((block) => {
		if (!listBlock.includes(block)) {
			listBlock.push(block);
		}
	});

	return listBlock;
};

export const KingBlock = (square, side, position) => {
	var listBlock = [
		getColumn(square, -1) + getRow(square, -1),
		getColumn(square, -1) + getRow(square, 0),
		getColumn(square, -1) + getRow(square, 1),
		getColumn(square, 0) + getRow(square, 1),
		getColumn(square, 1) + getRow(square, 1),
		getColumn(square, 1) + getRow(square, 0),
		getColumn(square, 1) + getRow(square, -1),
		getColumn(square, 0) + getRow(square, -1),
	];

	return addBlock(listBlock, position);
};

// const Castle = () => {};

export const KingMove = (
	square,
	listTargetS,
	position,
	side,
	setPosition,
	setLastMove
) => {
	const listMainMove = [
		getColumn(square, -1) + getRow(square, -1),
		getColumn(square, -1) + getRow(square, 0),
		getColumn(square, -1) + getRow(square, 1),
		getColumn(square, 0) + getRow(square, 1),
		getColumn(square, 1) + getRow(square, 1),
		getColumn(square, 1) + getRow(square, 0),
		getColumn(square, 1) + getRow(square, -1),
		getColumn(square, 0) + getRow(square, -1),
	];

	const listBlock = EnemyBlock(side, position);

	listBlock.forEach((block) => {
		const index = listMainMove.indexOf(block.substring(1));
		if (index !== -1) {
			listMainMove.splice(index, 1);
		}
	});
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

export const EnemyBlock = (side, position) => {
	const listBlock = [];

	const arrInd = [...Array(8).keys()];
	const opSide = side === "white" ? "black" : "white";
	var pieceSquare;
	var pieceType;
	arrInd.forEach((r) => {
		arrInd.forEach((c) => {
			pieceSquare = columnKey[c + 1] + (r + 1);
			pieceType = position[pieceSquare];
			if (opSide === "white") {
				switch (pieceType) {
					case "P":
						PawnBlock(pieceSquare, opSide, position).forEach((block) => {
							listBlock.push(pieceType + block);
						});
						break;
					case "R":
						RookBlock(pieceSquare, opSide, position).forEach((block) => {
							listBlock.push(pieceType + block);
						});
						break;
					case "B":
						BishopBlock(pieceSquare, opSide, position).forEach((block) => {
							listBlock.push(pieceType + block);
						});
						break;
					case "N":
						KnightBlock(pieceSquare, opSide, position).forEach((block) => {
							listBlock.push(pieceType + block);
						});
						break;
					case "Q":
						QueenBlock(pieceSquare, opSide, position).forEach((block) => {
							listBlock.push(pieceType + block);
						});
						break;
					case "K":
						KingBlock(pieceSquare, opSide, position).forEach((block) => {
							listBlock.push(pieceType + block);
						});
						break;
					default:
				}
			} else {
				switch (pieceType) {
					case "p":
						PawnBlock(pieceSquare, opSide, position).forEach((block) => {
							listBlock.push(pieceType + block);
						});
						break;
					case "r":
						RookBlock(pieceSquare, opSide, position).forEach((block) => {
							listBlock.push(pieceType + block);
						});
						break;
					case "b":
						BishopBlock(pieceSquare, opSide, position).forEach((block) => {
							listBlock.push(pieceType + block);
						});
						break;
					case "n":
						KnightBlock(pieceSquare, opSide, position).forEach((block) => {
							listBlock.push(pieceType + block);
						});
						break;
					case "q":
						QueenBlock(pieceSquare, opSide, position).forEach((block) => {
							listBlock.push(pieceType + block);
						});
						break;
					case "k":
						KingBlock(pieceSquare, opSide, position).forEach((block) => {
							listBlock.push(pieceType + block);
						});
						break;
					default:
				}
			}
		});
	});
	return listBlock;
};

export const checkInBlock = (square, side, position) => {
	return EnemyBlock(side, position)
		.map((block) => {
			if (block.includes(square)) {
				return block.substring(0, 1);
			} else {
				return "1";
			}
		})
		.filter((x) => x !== "1");
};

export const checkKingCheckmate = (
	side,
	position,
	setPosition,
	lastMove,
	setLastMove
) => {
	const KingSquare = Object.keys(position).find(
		(key) => position[key] === (side === "white" ? "K" : "k")
	);
	const listKingMove = listKingTarget(
		KingSquare,
		side === "white" ? "K" : "k",
		position,
		setPosition,
		setLastMove
	);
	const kingChecked = checkInBlock(KingSquare, side, position).length !== 0;
	if (kingChecked && listKingMove.length === 0) {
		let opSide = side === "white" ? "black" : "white";
		const whoCanDefend = checkInBlock(lastMove.substring(1), opSide, position);
		if (whoCanDefend.length === 0) {
			return true;
		} else if (
			whoCanDefend.length === 1 &&
			whoCanDefend[0].toUpperCase() === "K"
		) {
			return true;
		}
	}
	return false;
};

export const checkKingMoved = (side, position, setMovedKing) => {
	const WhiteKingSquare = Object.keys(position).find(
		(key) => position[key] === "K"
	);
	const BlackKingSquare = Object.keys(position).find(
		(key) => position[key] === "k"
	);

	if (side === "white") {
		if (WhiteKingSquare !== "e1") {
			setMovedKing(true);
		}
	} else {
		if (BlackKingSquare !== "e8") {
			setMovedKing(true);
		}
	}
};

export const listKingTarget = (
	square,
	piece,
	position,
	setPosition,
	setLastMove
) => {
	const listTargetS = [];
	let side = "white";
	if (piece === "k") {
		side = "black";
	}
	KingMove(square, listTargetS, position, side, setPosition, setLastMove);

	return listTargetS;
};
