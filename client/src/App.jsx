import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "@/components/Dashboard";
import Login from "@/components/Login";

const App = () => {
	const [user, setUser] = useState(null);
	const [theme, setTheme] = useState("dark");

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem("user");
		const currentTheme = window.localStorage.getItem("theme");

		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			setUser(user);
			// someService.setToken(user.token)
		}

		document.documentElement.classList.add(currentTheme);
		setTheme(currentTheme);
	}, []);

	useEffect(() => {
		if (theme === "light") {
			document.documentElement.classList.remove("dark");
			document.documentElement.classList.add("light");
		} else {
			document.documentElement.classList.remove("light");
			document.documentElement.classList.add("dark");
		}
	}, [theme]);

	const handleUserChange = (newUser) => {
		setUser(newUser);
	};

	const handleThemeChange = (newTheme) => {
		setTheme(newTheme);
	};

	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={
						user ? (
							<Dashboard
								user={user}
								onUserChange={handleUserChange}
								theme={theme}
								onThemeChange={handleThemeChange}
							/>
						) : (
							<Login />
						)
					}
				/>
			</Routes>
		</BrowserRouter>
	);
};

export default App;
