import {ChessProvider} from "../../context/chess.context";
import Header from "./Header";
import PlayerBar from "./PlayerBar";
import Board from "./Board";
import styled from "styled-components";

const ChessContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  overflow: hidden;
  align-items: center;
  width: 100vw;
  height: 100vh;
  @media only screen and (max-width: 1000px) {
    flex-direction: column;
    justify-content: center;
  }
`

export default function Chess() {
	return (<ChessProvider>
		<ChessContainer>
			<Header/>
			<PlayerBar/>
			<Board/>
		</ChessContainer>
	</ChessProvider>)
}