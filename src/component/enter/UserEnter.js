import styled from "styled-components";
import InputEnter from "./InputEnter";
import ButtonEnter from "./ButtonEnter";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import {useGlobal} from "../../context/index.context";

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

	const {createRoomApi, checkValidRoomApi, joinRoomApi} = useGlobal()

	useEffect(() => {
		let side = localStorage.getItem("side")
		if (side !== "") {
			navigate("/table")
		}
	});

	const numTable = localStorage.getItem("numTable")

	const joinRoom = async (event) => {
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
			let validTable = await checkValidRoomApi(parseInt(numTable))
			if (validTable) {
				if (player.length > 10) {
					player = player.substring(0, 7) + "..."
				}
				localStorage.setItem("blackPlayer", player);
				localStorage.setItem("side", "black")
				await joinRoomApi()
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

	const createRoom = async (event) => {
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
			if (player.length > 10) {
				player = player.substring(0, 7) + "..."
			}
			localStorage.setItem("whitePlayer", player);
			localStorage.setItem("side", "white")
			// TODO: numTable = "0" so random numTable (6 digits) and create table
			await createRoomApi()
			navigate("/table")
		}
	}

	return (<EnterBox>
		<InputEnter type={"text"} placeholder={"user"}/>
		{state === "join" ? <ButtonEnter value={"Join room"} handleButton={joinRoom}/> :
			<ButtonEnter value={"Create room"} handleButton={createRoom}/>}
	</EnterBox>)
}