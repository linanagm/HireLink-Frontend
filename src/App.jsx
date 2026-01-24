import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { ThemeInit } from "../.flowbite-react/init";
import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./routes/AppRoutes";

/**
 * The main App component.
 *
 * It wraps the application with the QueryClientProvider
 * and the ThemeInit component.
 *
 * It also provides the AuthProvider and the Toaster
 * component for displaying toast notifications.
 *
 * Finally, it renders the AppRoutes component which
 * handles client-side routing.
 *
 * @returns {JSX.Element} The main App component.
 */
function App() {
	const query = new QueryClient();

	return (
		<QueryClientProvider client={query}>
			<ThemeInit />
			<AuthProvider>
				<Toaster
					position="top-right"
					toastOptions={{
						duration: 3000,
					}}
				/>
				<AppRoutes />
			</AuthProvider>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}

export default App;
