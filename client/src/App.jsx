import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { AppRouter } from "./routes/Router";
import { listen } from "./redux/listener";

const App = () => {
	useEffect(() => {
		listen();
	}, [])

	return (
		<BrowserRouter>
			<AppRouter />
		</BrowserRouter>
	)
}

export { App };