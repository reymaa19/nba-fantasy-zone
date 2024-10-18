import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "@/components/Dashboard";
import Login from "@/components/Login";

const App = () => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem("user");

		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			setUser(user);
			// someService.setToken(user.token)
		}

		// Always apply the dark class to the document's root element
		// Implement theme toggle later
		document.documentElement.classList.add("dark");
	}, []);

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={user ? <Dashboard /> : <Login />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
