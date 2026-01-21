import axios from "axios";
import { PATHS } from "../constants/apiPaths";
import {
	getAccessToken,
	setAccessToken
} from "../lib/tokenStore";

const axiosClient = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	withCredentials: true,
	headers: {
		"Content-type": "application/json",
	},
});

//Request Interceptor
axiosClient.interceptors.request.use(
	(config) => {
		const token = getAccessToken();
		//localStorage.getItem("token") || sessionStorage.getItem("token");

		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => Promise.reject(error),
);

//Response Interceptor
// axiosClient.interceptors.response.use(
// 	(response) => response,
// 	(error) => {
// 		if (error.response && error.response.status === 401) {

// 			localStorage.removeItem("token");
// 			window.location.href = "/login";
// 		}
// 		console.log('req err:', error);

// 		return Promise.reject(error);
// 	},
// );

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
	failedQueue.forEach((prom) => {
		if (error) {
			prom.reject(error);
		} else {
			prom.resolve(token);
		}
	});

	failedQueue = [];
};

axiosClient.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;

		if (
			error.response &&
			error.response.status === 401 &&
			!originalRequest._retry
		) {
			if (isRefreshing) {
				return new Promise((resolve, reject) => {
					failedQueue.push({ resolve, reject });
				}).then((token) => {
					originalRequest.headers.Authorization = Bearer;
					$;
					token;
					return axiosClient(originalRequest);
				});
			}

			originalRequest._retry = true;
			isRefreshing = true;

			try {
				const res = await axiosClient.post(PATHS.auth.refresh);
				const newAccessToken = res.data.accessToken;

				setAccessToken(newAccessToken);
				processQueue(null, newAccessToken);

				originalRequest.headers.Authorization = Bearer;
				$;
				newAccessToken;
				return api(originalRequest);
			} catch (err) {
				processQueue(err, null);
				//clearAccessToken();
				//window.location.href = "/login";
				return Promise.reject(err);
			} finally {
				isRefreshing = false;
			}
		}

		return Promise.reject(error);
	},
);
export default axiosClient;
