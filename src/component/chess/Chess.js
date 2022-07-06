import {ChessProvider} from "../../context/chess.context";
import Header from "./Header";
import PlayerBar from "./PlayerBar";
import Board from "./Board";
import styled from "styled-components";

const ChessContainer = styled.div`

`

export default function Chess() {
	console.log(localStorage.getItem("numTable"), localStorage.getItem("whitePlayer"), localStorage.getItem("blackPlayer"))

	return (<ChessProvider>
		<ChessContainer>
			<Header/>
			<PlayerBar/>
			<Board/>
		</ChessContainer>
	</ChessProvider>)
}