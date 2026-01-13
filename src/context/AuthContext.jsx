//import { createContext, useEffect, useState } from "react";

import {
	createContext,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from "react";
import { getUser } from "../services/auth.service";

// Create context
export const AuthContext = createContext(null);

// export function AuthProvider({ children }) {
// 	const [token, setToken] = useState(null);
// 	const [currentUser, setCurrentUser] = useState(null);
// 	const [isAuthenticated, setIsAuthenticated] = useState(false);

// 	// Load authentication state on app start
// 	useEffect(() => {
// 		const savedToken =
// 			localStorage.getItem("token") || sessionStorage.getItem("token");
// 		const savedUser =
// 			localStorage.getItem("user") || sessionStorage.getItem("user");

// 		if (savedToken && savedUser) {
// 			setToken(savedToken);
// 			setCurrentUser(JSON.parse(savedUser));
// 			setIsAuthenticated(true);
// 		}
// 	}, []);

// 	// Save login result
// 	const saveLogin = async (token, rememberMe, userData = null) => {
// 		const storage = rememberMe ? localStorage : sessionStorage;

// 		setToken(token);
// 		storage.setItem("token", token);
// 		setIsAuthenticated(true);

// 		if (userData) {
// 			setCurrentUser(userData);

// 			storage.setItem("user", JSON.stringify(userData));
// 		}
// 	};

// 	const logout = () => {
// 		localStorage.removeItem("token");
// 		localStorage.removeItem("user");
// 		sessionStorage.removeItem("token");
// 		sessionStorage.removeItem("user");

// 		setToken(null);
// 		setCurrentUser(null);
// 		setIsAuthenticated(false);
// 	};

// 	return (
// 		<AuthContext.Provider
// 			value={{ token, currentUser, isAuthenticated, saveLogin, logout }}
// 		>
// 			{children}
// 		</AuthContext.Provider>
// 	);
// }

const STORAGE_KEYS = {
	token: "token",
	user: "user",
};

const readFromStorage = (key) => {
	return localStorage.getItem(key) ?? sessionStorage.getItem(key);
};

const removeFromBothStorages = (key) => {
	localStorage.removeItem(key);
	sessionStorage.removeItem(key);
};

const safeJsonParse = (value) => {
	if (!value) return null;
	try {
		return JSON.parse(value);
	} catch {
		return null;
	}
};

export function AuthProvider({ children }) {
	const [token, setToken] = useState(null);
	const [currentUser, setCurrentUser] = useState(null);

	const isAuthenticated = Boolean(token);

	useEffect(() => {
		const savedToken = readFromStorage(STORAGE_KEYS.token);
		console.log("savetToken", savedToken);

		const savedUser = safeJsonParse(readFromStorage(STORAGE_KEYS.user));

		if (savedToken) setToken(savedToken);
		if (savedUser) setCurrentUser(savedUser);
	}, []);

	const saveLogin = useCallback((newToken, rememberMe) => {
		const storage = rememberMe ? localStorage : sessionStorage;

		setToken(newToken);
		storage.setItem(STORAGE_KEYS.token, newToken);
		const userData = getUser();
		console.log("authcontext: userData -> ", userData);
		setCurrentUser(userData);
		if (userData) {
			setCurrentUser(userData);
			storage.setItem(STORAGE_KEYS.user, JSON.stringify(userData));
		}
	}, []);

	const setUser = (userData) => {
		setCurrentUser(userData);
	};

	const logout = useCallback(() => {
		removeFromBothStorages(STORAGE_KEYS.token);
		removeFromBothStorages(STORAGE_KEYS.user);

		setToken(null);
		setCurrentUser(null);
	}, []);

	const value = useMemo(
		() => ({ token, currentUser, isAuthenticated, setUser, saveLogin, logout }),
		[token, currentUser, isAuthenticated, setUser, saveLogin, logout],
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
