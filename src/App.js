import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { Navbar, Footer, Sidebar, ThemeSettings } from "./components";
import "./App.css";
import PrivateRoute from "./utils/PrivateRoute";
import { AuthProvider } from "./contexts/AuthContext";

import { useStateContext } from "./contexts/ContextProvider";

//Pages
import Login from "./pages/login";
import ResetPassword from "./pages/ResetPassword";
import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage";

const App = () => {
	const {
		setCurrentColor,
		setCurrentMode,
		currentMode,
		activeMenu,
		currentColor,
		themeSettings,
		setThemeSettings,
	} = useStateContext();

	useEffect(() => {
		const currentThemeColor = localStorage.getItem("colorMode");
		const currentThemeMode = localStorage.getItem("themeMode");
		if (currentThemeColor && currentThemeMode) {
			setCurrentColor(currentThemeColor);
			setCurrentMode(currentThemeMode);
		}
	}, []);

	return (
		<div className={currentMode === "Dark" ? "dark" : ""}>
			<AuthProvider>
			<Routes>
					{/* <PrivateRoute component={ProtectedPage} path="/protected" exact /> */}
					{/* Landing page */}
					<Route path="/" element={<LandingPage />} />
					{/* Login  */}
					<Route path="/login" element={<Login />} />

					{/* Signup */}
					<Route path="/resetpassword" element={<ResetPassword />} />

					{/* Dasboard  */}
					<Route path="home/*" element={<Home />} />	
			</Routes>
			</AuthProvider>
		</div>
	);
};

export default App;
