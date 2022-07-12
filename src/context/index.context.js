import React, {useContext} from "react";
import {createTable} from "../firebase/db";

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
			console.log(numTable, whitePlayer)
			numTable = Math.floor(Math.random() * 1000000);
			if (numTable < 100000) {
				numTable += 900000;
			}
			status = await createTable(numTable, whitePlayer)
		}

		localStorage.setItem("numTable", `${numTable}`)
	}
	return (<GlobalContext.Provider
		value={{
			createRoomApi,
		}}
	>
		{children}
	</GlobalContext.Provider>)
}