// config/axiosConfig.js
import axios from "axios";
import { PATHS } from "../constants/apiPaths";
import {
	clearAccessToken,
	getAccessToken,
	setAccessToken,
} from "../lib/tokenStore";

const axiosClient = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	withCredentials: true,
	headers: { "Content-Type": "application/json" },
});

// Request interceptor: attach access token
axiosClient.interceptors.request.use(
	(config) => {
		const token = getAccessToken();
		if (token) config.headers.Authorization = `Bearer ${token}`;
		return config;
	},
	(error) => Promise.reject(error),
);

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
	failedQueue.forEach(({ resolve, reject }) => {
		if (error) reject(error);
		else resolve(token);
	});
	failedQueue = [];
};

axiosClient.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;
		const status = error?.response?.status;

		// لو مفيش response (network error / CORS / timeout) سيبيها تتعامل فوق
		if (!status) return Promise.reject(error);

		// امنعي loop: لو refresh نفسه فشل
		const isRefreshCall = originalRequest?.url?.includes(PATHS.auth.refresh);

		if (status === 401 && !originalRequest._retry && !isRefreshCall) {
			if (isRefreshing) {
				return new Promise((resolve, reject) => {
					failedQueue.push({ resolve, reject });
				}).then((token) => {
					originalRequest.headers.Authorization = `Bearer ${token}`;
					return axiosClient(originalRequest);
				});
			}

			originalRequest._retry = true;
			isRefreshing = true;

			try {
				const res = await axiosClient.get(PATHS.auth.refresh);

				// حسب Bruno: res.body.data.token => axios: res.data.data.token
				const newAccessToken = res?.data?.data?.token;

				if (!newAccessToken) {
					throw new Error("Refresh succeeded but token missing in response");
				}

				// حافظي على نفس storage (شوفي تعديل tokenStore تحت)
				setAccessToken(newAccessToken);

				processQueue(null, newAccessToken);

				originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
				return axiosClient(originalRequest);
			} catch (err) {
				processQueue(err, null);

				// هنا قرار المنتج: لو refresh فشل، logout
				clearAccessToken();
				// ممكن كمان تمسحي كاش react-query من AuthProvider
				// وممكن redirect:
				// window.location.href = "/login";

				return Promise.reject(err);
			} finally {
				isRefreshing = false;
			}
		}

		return Promise.reject(error);
	},
);

export default axiosClient;
