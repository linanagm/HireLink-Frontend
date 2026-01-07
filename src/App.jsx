import { ThemeInit } from "../.flowbite-react/init";
import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./routes/AppRoutes";

function App() {
	return (
		<>
			<ThemeInit />
			<AuthProvider>
				<AppRoutes />
			</AuthProvider>
		</>
	);
}

export default App;
