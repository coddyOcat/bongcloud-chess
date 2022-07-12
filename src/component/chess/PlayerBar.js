import styled from "styled-components";
import {useChess} from "../../context/chess.context";
import getOut from "../../media/getout.png"
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

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

const TableOut = styled.img`
  margin-left: 10px;
  width: 1rem;
  filter: brightness(0) invert(1);
  cursor: pointer;
  @media only screen and (max-width: 1000px) {
    margin-left: 5px;
    width: 0.7rem;
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

const WaitingPlayer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: left;
`

const Dot = styled.div`
  background-color: white;
  border-radius: 50%;
  width: 0.75rem;
  height: 0.75rem;
  margin: 0 0.25rem;

  animation: bounceAnimation 0.5s linear infinite;
  animation-delay: ${(props) => props.delay};

  @keyframes bounceAnimation {
    0% {
      margin-bottom: 0;
    }

    50% {
      margin-bottom: 1rem;
    }

    100% {
      margin-bottom: 0;
    }
  }
`

const Player = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  padding: 2rem;
  width: 30rem;
  overflow: hidden;
  margin-bottom: 5px;

  @media only screen and (max-width: 1000px) {
    padding: 0;
    width: 7rem;
  }
`

const PlayerName = styled.div`
  width: 100px;
  font-size: 3rem;
  color: white;
  text-overflow: ellipsis;
  @media only screen and (max-width: 1000px) {
    font-size: 1rem;
  }
`

const Avatar = styled.div`
  box-sizing: border-box;
  margin-right: 10px;
  width: 8rem;
  aspect-ratio: 1/1;
  border: 10px solid;
  border-color: ${props => props.color === `white` ? `var(--light-player-background)` : `var(--dark-player-background)`};
  border-radius: 10px;
  padding: 10px;
  background-size: contain;
  background-image: url(${props => props.image});
  background-color: ${props => props.color === `white` ? `#d7d7d7` : `gray`};

  @media only screen and (max-width: 1000px) {
    width: 2rem;
    border: 3px solid;
    border-color: ${props => props.color === `white` ? `var(--light-player-background)` : `var(--dark-player-background)`};
  }
`

const Timer = styled.div`
  padding: 1rem 2rem;
  width: fit-content;
  background-color: ${props => props.color === `white` ? `var(--light-timer-background)` : `var(--dark-timer-background)`};
  color: ${props => props.color === `white` ? `black` : `white`};
  font-weight: bolder;
  font-size: 3rem;
  border-radius: 0.5rem;

  opacity: ${props => props.isTiming ? `100%` : `50%`};

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
	const navigate = useNavigate()

	const numTable = localStorage.getItem("numTable");

	const {customChessPieces, whitePlayer, blackPlayer, side, sideWin, sideMove} = useChess();

	const handleGetOut = () => {
		localStorage.setItem("numTable", "0")
		localStorage.setItem("whitePlayer", "");
		localStorage.setItem("blackPlayer", "");
		localStorage.setItem("side", "")
		navigate("/")
	}

	useEffect(() => {
		if (side === "") {
			handleGetOut()
		}
	})

	return (<Container>
		<TableText>TABLE <TableOut src={getOut} onClick={handleGetOut}/> <br/>
			<TableNum>
				{sideWin === "" ? numTable : sideWin}
			</TableNum>
		</TableText>
		<InformationContainer>
			{side === "white" ? <>
				<Side>
					<Player>
						<Avatar color={"black"} image={customChessPieces.k}/>
						{blackPlayer === "" ? <>
							<WaitingPlayer>
								<Dot delay="0s"/>
								<Dot delay="0.2s"/>
								<Dot delay="0.4s"/>
							</WaitingPlayer> </> : <>
							<PlayerName>{blackPlayer}</PlayerName>
						</>}
					</Player>
					<Timer color={"black"} isMain={false} isTiming={sideMove === "black"}> 10:00 </Timer>
				</Side>
				<Side>
					<Timer color={"white"} isMain={true} isTiming={sideMove === "white"}> 10:00 </Timer>
					<Player>
						<Avatar color={"white"} image={customChessPieces.K}/>
						<PlayerName>{whitePlayer}</PlayerName>
					</Player>
				</Side>
			</> : <>
				<Side>
					<Player>
						<Avatar color={"white"} image={customChessPieces.K}/>
						<PlayerName>{whitePlayer}</PlayerName>
					</Player>
					<Timer color={"white"} isMain={false} isTiming={sideMove === "white"}> 10:00 </Timer>
				</Side>
				<Side>
					<Timer color={"black"} isMain={true} isTiming={sideMove === "black"}> 10:00 </Timer>
					<Player>
						<Avatar color={"black"} image={customChessPieces.k}/>
						<PlayerName>{blackPlayer}</PlayerName>
					</Player>
				</Side>
			</>}

		</InformationContainer>
	</Container>);
}