import React, {useContext, useState} from "react";
import {createTable, fetchTable, findNotFullTable, updateTable} from "../firebase/db";

const GlobalContext = React.createContext();

export const useGlobal = () => useContext(GlobalContext)

export const GlobalProvider = ({children}) => {
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

	return (<GlobalContext.Provider
		value={{
			createRoomApi, checkValidRoomApi, joinRoomApi
		}}
	>
		{children}
	</GlobalContext.Provider>)
}