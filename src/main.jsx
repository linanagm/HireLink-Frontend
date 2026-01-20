// biome-ignore lint/correctness/noUnusedImports: <explanation>
import "@fortawesome/fontawesome-free/css/all.min.css";
import "@vitejs/plugin-react/preamble";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<App />,
	</StrictMode>,
);
