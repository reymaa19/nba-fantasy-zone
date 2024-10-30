import Dashboard from "@/components/Dashboard";
import Draft from "@/components/Draft";
import Signin from "@/components/auth/sign-in";
import Signup from "@/components/auth/sign-up";
import { ThemeProvider } from "@/components/theme-provider";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
	return (
		<ThemeProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Dashboard />} />
					<Route path="/sign-in" element={<Signin />} />
					<Route path="/sign-up" element={<Signup />} />
					<Route path="/draft" element={<Draft />} />
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
	);
};

export default App;
