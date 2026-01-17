import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeInit } from "../.flowbite-react/init";
import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./routes/AppRoutes";

function App() {
	const query = new QueryClient();

	return (
		<QueryClientProvider client={query}>
			<ThemeInit />
			<AuthProvider>
				<AppRoutes />
			</AuthProvider>
		</QueryClientProvider>
	);
}

export default App;
