import React, {useContext, useState} from "react";
import {createTable, fetchTable, findNotFullTable, updateTable} from "../firebase/db";

const GlobalContext = React.createContext();

export const useGlobal = () => useContext(GlobalContext)

export const GlobalProvider = ({children}) => {
	const [updateState, setUpdateState] = useState(0)
	const createRoomApi = async () => {
		const whitePlayer = localStorage.getItem("whitePlayer")
		let numTable = Math.floor(Math.random() * 1000000);
		if (numTable < 100000) {
			numTable += 900000;
		}
		let status = await createTable(numTable, whitePlayer)
		while (!status) {
			numTable = Math.floor(Math.random() * 1000000);
			if (numTable < 100000) {
				numTable += 900000;
			}
			status = await createTable(numTable, whitePlayer)
		}

		localStorage.setItem("numTable", `${numTable}`)
	}

	const checkValidRoomApi = async (numTable) => {
		return await findNotFullTable(numTable)
	}

	const joinRoomApi = async () => {
		const blackPlayer = localStorage.getItem("blackPlayer")
		const numTable = parseInt(localStorage.getItem("numTable"))

		await updateTable(numTable, {blackPlayer: blackPlayer, sideMove: "white"})
	}

	const fetchRoomApi = async () => {
		const numTable = parseInt(localStorage.getItem("numTable"))

		const data = await fetchTable(numTable)

		localStorage.setItem("whitePlayer", data.whitePlayer)
		localStorage.setItem("blackPlayer", data.blackPlayer)
		localStorage.setItem("sideMove", data.sideMove)
		localStorage.setItem("sideWin", data.sideWin)

		setUpdateState(updateState + 1)
	}

	return (<GlobalContext.Provider
		value={{
			createRoomApi, checkValidRoomApi, joinRoomApi, fetchRoomApi
		}}
	>
		{children}
	</GlobalContext.Provider>)
}