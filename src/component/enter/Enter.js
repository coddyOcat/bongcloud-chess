import styled from "styled-components";
import InputEnter from "./InputEnter";
import ButtonEnter from "./ButtonEnter";
import {useNavigate} from "react-router-dom";
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

  //@media only screen and (max-width: 1000px) {
  //  padding-bottom: 2rem;
  //}
`

const Or = styled.div`
  width: 100%;
  text-align: center;
  font-size: 2.5rem;
  font-weight: bolder;
  color: white;
  text-shadow: 0.2rem 0.2rem black;
  margin: 2rem 0 1rem 0;
  user-select: none;

  @media only screen and (max-width: 1000px) {
    font-size: 1.5rem;
  }
`

export default function Enter() {
	const navigate = useNavigate()

	const {checkValidRoomApi} = useGlobal()

	useEffect(() => {
		let side = localStorage.getItem("side")
		if (side !== "" && side !== null) {
			navigate("/table")
		} else {
			localStorage.setItem("numTable", "0")
			localStorage.setItem("whitePlayer", "");
			localStorage.setItem("blackPlayer", "");
			localStorage.setItem("side", "")
		}
	});

	const handleJoinRoom = async (event) => {
		let element = event.currentTarget
		let inputDiv = element.parentNode.firstChild
		let numTable = inputDiv.value
		if (numTable.length === 0) {
			inputDiv.placeholder = "empty"
			inputDiv.style.setProperty("--c", "red")
			setTimeout(() => {
				inputDiv.placeholder = "number"
				inputDiv.style.setProperty("--c", null)
			}, 500)
		} else {
			let validTable = await checkValidRoomApi(parseInt((numTable)))
			if (validTable) {
				localStorage.setItem("numTable", numTable);
				navigate("/user/join")
			} else {
				inputDiv.value = ""
				inputDiv.placeholder = "unavailable"
				inputDiv.style.setProperty("--c", "red")
				setTimeout(() => {
					inputDiv.placeholder = "number"
					inputDiv.style.setProperty("--c", null)
				}, 500)
			}
		}
	}

	const handleCreateRoom = () => {
		navigate("/user/create")
	}

	return (<EnterBox>
		<InputEnter type={"text"} placeholder={"number"}/>
		<ButtonEnter value={"Join room"} handleButton={handleJoinRoom}/>
		<Or>Or</Or>
		<ButtonEnter value={"Create room"} handleButton={handleCreateRoom}/>
	</EnterBox>)
}