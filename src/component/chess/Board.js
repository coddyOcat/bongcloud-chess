import styled from "styled-components";
import Squares from "./Squares";
import Square from "./Square";
import Piece from "./Piece";

const BoardContainer = styled.div`
  width: fit-content;
  height: fit-content;
  border-radius: calc(var(--board-width) / 50);
  box-shadow: calc(var(--board-width) / 75) calc(var(--board-width) / 75);
  user-select: none;
  margin: calc(var(--board-width) / 75);
`

export default function Board() {
	return (<BoardContainer>
		<Squares>
			{({square, squareColor, col, row}) => {
				return (<Square
					key={`${col}${row}`}
					square={square}
					squareColor={squareColor}
				>
					<Piece square={square}/>
				</Square>)
			}}
		</Squares>
	</BoardContainer>)
}