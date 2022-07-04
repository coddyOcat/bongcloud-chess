import {BrowserRouter, Route, Routes} from "react-router-dom";
import Enter from "./component/enter/Enter";
import UserEnter from "./component/enter/UserEnter";
import Chess from "./component/chess/Chess";

export default function App() {
	return (<BrowserRouter>
		<Routes>
			<Route path={"/"} exact={true} element={<Enter/>}/>
			<Route path={"/user/:state"} element={<UserEnter/>}/>
			<Route path={"/table"} element={<Chess/>}/>
		</Routes>
	</BrowserRouter>);
}

