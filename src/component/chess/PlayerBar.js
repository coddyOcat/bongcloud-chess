import styled from "styled-components";
import {useChess} from "../../context/chess.context";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--transparent-background);
  border-radius: calc(var(--board-width) / 50);
  min-width: fit-content;
  min-height: fit-content;
  @media only screen and (min-width: 1000px) {
    width: calc(80vw - var(--board-width));
  }
  @media only screen and (max-width: 1000px) {
    width: 80vw;
    height: fit-content;
    padding-bottom: 1rem;
    margin-bottom: 10px;
  }
`

const TableText = styled.div`
  text-align: center;
  font-weight: bolder;
  font-size: 1.5rem;
  color: white;
  text-shadow: 1px 1px;
  padding: 20px;
  @media only screen and (max-width: 1000px) {
    font-size: 1rem;
  }
`

const TableNum = styled.div`
  font-size: 2.5rem;
  @media only screen and (max-width: 1000px) {
    font-size: 1.5rem;
  }
`

const InformationContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: fit-content;
  justify-content: center;
  @media only screen and (max-width: 1000px) {
    flex-direction: row;
    justify-content: space-evenly;
  }
`

const Side = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media only screen and (max-width: 1000px) {
    justify-content: space-evenly;
  }
`

const WaitingPlayer = styled.p`
  width: 10rem;
`

const Player = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  padding: 2rem;
  width: 70%;

  @media only screen and (max-width: 1000px) {
    padding: 0;
  }
`

const PlayerName = styled.p`
  width: fit-content;
  font-size: 2rem;
  color: white;

  @media only screen and (max-width: 1000px) {
    font-size: 1rem;
  }
`

const Avatar = styled.div`
  box-sizing: border-box;
  margin-right: 10px;
  width: 30%;
  aspect-ratio: 1/1;
  border: 10px solid;
  border-color: ${props => props.color === `white` ? `var(--light-player-background)` : `var(--dark-player-background)`};
  border-radius: 10px;
  padding: 10px;
  background-size: contain;
  background-image: url(${props => props.image});
`

const Timer = styled.div`
  padding: 1rem 2rem;
  width: fit-content;
  background-color: ${props => props.color === `white` ? `var(--light-timer-background)` : `var(--dark-timer-background)`};
  color: ${props => props.color === `white` ? `black` : `white`};
  font-weight: bolder;
  font-size: 3rem;
  border-radius: 0.5rem;

  //opacity: 50%;

  @media only screen and (max-width: 1000px) {
    order: 1;
    font-size: 1rem;
  }

  @media only screen and (min-width: 1000px) {
    position: relative;
    margin-${props => props.isMain ? `top` : `bottom`}: 2rem;
    &:after {
      display: block;
      content: "";
      position: absolute;
      ${props => props.isMain ? `bottom` : `top`}: 90%;
      left: 50%;
      transform: translateX(-50%);
      border-${props => props.isMain ? `bottom` : `top`}: 2rem solid ${props => props.color === "white" ? `var(--light-timer-background)` : `var(--dark-timer-background)`};
      border-left: 2rem solid transparent;
      border-right: 2rem solid transparent;
    }
  }


`

export default function PlayerBar() {
	const numTable = localStorage.getItem("numTable");
	const side = localStorage.getItem("side")
	const whitePlayer = localStorage.getItem("whitePlayer")
	const blackPlayer = localStorage.getItem("blackPlayer")

	const {position, customChessPieces} = useChess();

	return (<Container>
		<TableText>TABLE <br/>
			<TableNum>
				{numTable}
			</TableNum>
		</TableText>
		<InformationContainer>
			{side === "white" ? <>
				<Side>
					<Player>
						<Avatar color={"black"} image={customChessPieces.k}/>
						<PlayerName>Bên Đen</PlayerName>
					</Player>
					<Timer color={"black"} isMain={false}> 10:00 </Timer>
				</Side>
				<Side>
					<Timer color={"white"} isMain={true}> 10:00 </Timer>
					<Player>
						<Avatar color={"white"} image={customChessPieces.K}/>
						<PlayerName>Bên Trắng</PlayerName>
					</Player>
				</Side>
			</> : <>
				<Side>
					<Player>
						<Avatar color={"black"} image={customChessPieces.k}/>
						<PlayerName>Bên Đen</PlayerName>
					</Player>
					<Timer color={"black"} isMain={false}> 10:00 </Timer>
				</Side>
				<Side>
					<Timer color={"white"} isMain={true}> 10:00 </Timer>
					<Player>
						<Avatar color={"white"} image={customChessPieces.K}/>
						<PlayerName>Bên Trắng</PlayerName>
					</Player>
				</Side>
			</>}

		</InformationContainer>
	</Container>)
}