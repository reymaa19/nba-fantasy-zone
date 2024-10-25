import Dashboard from "@/components/Dashboard";
import Draft from "@/components/Draft";
import Signin from "@/components/auth/sign-in";
import Signup from "@/components/auth/sign-up";
import { ThemeProvider } from "@/components/theme-provider";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
	return (
		<ThemeProvider>
			<div className="bg-background screen w-screen">
				<BrowserRouter>
					<div className="h-screen w-screen">
						<Routes>
							<Route path="/" element={<Dashboard />} />
							<Route path="/sign-in" element={<Signin />} />
							<Route path="/sign-up" element={<Signup />} />
							<Route path="/draft" element={<Draft />} />
						</Routes>
					</div>
				</BrowserRouter>
			</div>
		</ThemeProvider>
	);
};

export default App;
