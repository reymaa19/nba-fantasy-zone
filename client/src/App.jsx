import Dashboard from "@/components/Dashboard";
import Draft from "@/components/Draft";
import HeaderNav from "@/components/HeaderNav";
//import Login from "@/components/auth/Login";
import Signin from "@/components/auth/sign-in";
import Signup from "@/components/auth/sign-up";
import { ThemeProvider } from "@/components/theme-provider";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
	const [user, setUser] = useState(null);
	const [register, setRegister] = useState(false);

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem("user");

		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			setUser(user);
			// someService.setToken(user.token)
		}
	}, []);

	const handleUserChange = (newUser) => {
		setUser(newUser);
	};

	const handleRegisterChange = () => {
		setRegister(!register);
	};

	return (
		<ThemeProvider>
			<div className="bg-background screen w-screen">
				<BrowserRouter>
					<div className="h-screen w-screen">
						<Routes>
							<Route path="/" element={<Dashboard user={user} onUserChange={handleUserChange} />} />
							<Route path="/sign-in" element={<Signin user={user} />} />
							<Route path="/sign-up" element={<Signup user={user} />} />
							<Route path="/draft" element={<Draft />} />
						</Routes>
					</div>
				</BrowserRouter>
			</div>
		</ThemeProvider>
	);
};

export default App;
