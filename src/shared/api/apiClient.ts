import axios, {type AxiosError, type InternalAxiosRequestConfig} from "axios";
import i18n from '../i18n/config';

export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
    config.headers['Accept-Language'] =
        i18n.resolvedLanguage ?? 'en';

    return config;
});

interface RetryRequestConfig extends InternalAxiosRequestConfig {
    _retry?: boolean;
}

apiClient.interceptors.response.use(
    (response) => response,

    async (error: AxiosError) => {
        const originalRequest = error.config as RetryRequestConfig | undefined;

        if (
            error.response?.status !== 401 ||
            !originalRequest ||
            originalRequest._retry
        ) {
            return Promise.reject(error);
        }

        originalRequest._retry = true;

        try {
            await axios.post(
                `${import.meta.env.VITE_API_URL}/auth/refresh`,
                undefined,
                {
                    withCredentials: true,
                },
            );

            return apiClient(originalRequest);
        } catch (refreshError) {
            return Promise.reject(refreshError);
        }
    },
);