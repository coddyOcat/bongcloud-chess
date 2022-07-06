import styled from "styled-components";
import {columnKey} from "../const";

const Table = styled.div`
  display: flex;
  flex-direction: column;
`

const Row = styled.div`
  display: inline-flex;
`

export default function Squares({children}) {
	const side = localStorage.getItem("side")
	const arrInd = side === "white" ? [...Array(8).keys()] : [...Array(8).keys()].reverse()
	return (<Table>
		{[...arrInd].map((row) => {
			return (
				<Row key={row}>
					{[...arrInd].map((col) => {
						const square = columnKey[col + 1] + (8 - row);
						const squareColor = col % 2 === row % 2 ? "white" : "black"
						return children({square, squareColor, col, row})
					})}
				</Row>
			)
		})}
	</Table>)
}