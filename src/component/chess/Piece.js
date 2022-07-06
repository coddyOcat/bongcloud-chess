import {useChess} from "../../context/chess.context";

export default function Piece({square}) {
	const {position, customChessPieces} = useChess();

	const piece = position[square];

	return (piece !== "1" ? <div
		data-piece={piece}
		style={{
			width: "100%",
			backgroundSize: "contain",
			backgroundImage: `url(${customChessPieces[piece]})`,
			filter: "drop-shadow(4px 4px 1px #700121)",
			cursor: "grab",
		}}
	></div> : <></>)

};