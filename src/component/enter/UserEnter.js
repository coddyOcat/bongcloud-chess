import styled from "styled-components";
import InputEnter from "./InputEnter";
import ButtonEnter from "./ButtonEnter";
import {useNavigate, useParams} from "react-router-dom";

const EnterBox = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--enter-form-background);
  border-radius: 2rem;
  box-shadow: 0.5rem 1rem black;
  padding-bottom: 3rem;
`

export default function UserEnter() {
	const {state} = useParams()
	const navigate = useNavigate()
	const numTable = localStorage.getItem("numTable")

	const joinRoom = (event) => {
		let element = event.currentTarget
		let inputDiv = element.parentNode.firstChild
		let player = inputDiv.value
		if (player.length === 0) {
			inputDiv.placeholder = "empty"
			inputDiv.style.setProperty("--c", "red")
			setTimeout(() => {
				inputDiv.placeholder = "user"
				inputDiv.style.setProperty("--c", null)
			}, 500)
		} else {
			let validTable = true // TODO: fetch db and set localStorage whitePlayer
			if (validTable) {
				localStorage.setItem("blackPlayer", player);
				localStorage.setItem("side", "black")
				// TODO: update db numTable, blackPlayer
				console.log("join", numTable, player)
				navigate("/table")
			} else {
				inputDiv.value = ""
				inputDiv.placeholder = "full room"
				inputDiv.style.setProperty("--c", "red")
				setTimeout(() => {
					navigate("/")
				}, 1000)
			}
		}
	}

	const createRoom = (event) => {
		let element = event.currentTarget
		let inputDiv = element.parentNode.firstChild
		let player = inputDiv.value
		if (player.length === 0) {
			inputDiv.placeholder = "empty"
			inputDiv.style.setProperty("--c", "red")
			setTimeout(() => {
				inputDiv.placeholder = "user"
				inputDiv.style.setProperty("--c", null)
			}, 500)
		} else {
			localStorage.setItem("whitePlayer", player);
			localStorage.setItem("side", "white")
			// TODO: numTable = "0" so random numTable (6 digits) and create table
			console.log("create", numTable, player)
			navigate("/table")
		}
	}

	return (<EnterBox>
		<InputEnter type={"text"} placeholder={"user"}/>
		{state === "join" ? <ButtonEnter value={"Join room"} handleButton={joinRoom}/> :
			<ButtonEnter value={"Create room"} handleButton={createRoom}/>}
	</EnterBox>)
}