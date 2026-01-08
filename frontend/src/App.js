import Footer from "./components/Footer";
import Main from "./components/Main";
import Nav from "./components/Nav";
import Header from "./components/Header";
import { useState } from "react";

export default function App() {
	const [shown, setShown] = useState(false);
	return (
		<>
			<Header shown={shown} setShown={setShown}/>
			<div className="app-main-container">
				<Main shown={shown} setShown={setShown}/>
				<Nav/>
			</div>
			<Footer />
		</>
	);
}
