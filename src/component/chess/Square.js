import styled from "styled-components";
import {useChess} from "../../context/chess.context";

const SignNumber = styled.div`
  position: absolute;
  top: calc(var(--board-width) / 300);
  left: calc(var(--board-width) / 300);
  font-weight: bold;
  color: ${props => props.squareColor === `black` ? `var(--light-text)` : `var(--dark-text)`}
`

const SignLetter = styled.div`
  position: absolute;
  bottom: calc(var(--board-width) / 300);
  right: calc(var(--board-width) / 300);
  font-weight: bold;
  color: ${props => props.squareColor === `black` ? `var(--light-text)` : `var(--dark-text)`}
`

const SquareBody = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: calc(var(--board-width) / 8);
  height: calc(var(--board-width) / 8);
`

export default function Square({children, square, squareColor}) {
	const side = localStorage.getItem("side")
	const {customDarkSquareStyle, customLightSquareStyle} = useChess()

	const borderRadius = () => {
		if (side === "white") {
			if (square === "a1") {
				return {borderBottomLeftRadius: "calc(var(--board-width) / 50)"};
			}
			if (square === "a8") {
				return {borderTopLeftRadius: "calc(var(--board-width) / 50)"};
			}
			if (square === "h1") {
				return {borderBottomRightRadius: "calc(var(--board-width) / 50)"};
			}
			if (square === "h8") {
				return {borderTopRightRadius: "calc(var(--board-width) / 50)"};
			}
		} else {
			if (square === "a1") {
				return {borderTopRightRadius: "calc(var(--board-width) / 50)"};
			}
			if (square === "a8") {
				return {borderBottomRightRadius: "calc(var(--board-width) / 50)"};
			}
			if (square === "h1") {
				return {borderTopLeftRadius: "calc(var(--board-width) / 50)"};
			}
			if (square === "h8") {
				return {borderBottomLeftRadius: "calc(var(--board-width) / 50)"};
			}
		}
	}

	const squareStyle = {
		display: "inline-block", ...(squareColor === "white" ? customLightSquareStyle : customDarkSquareStyle), ...borderRadius()
	}

	return (<div
		data-square={square}
		style={squareStyle}
		onContextMenu={(event) => {
			event.preventDefault()
		}}
	>
		<SquareBody>
			{((side === "white" && square.includes("a")) || (side === "black" && square.includes("h"))) &&
				<SignNumber squareColor={squareColor}>{square[1]}</SignNumber>}
			{((side === "white" && square.includes("1")) || (side === "black" && square.includes("8"))) &&
				<SignLetter squareColor={squareColor}>{square[0]}</SignLetter>}
			{children}
		</SquareBody>
	</div>)
}