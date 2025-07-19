/*
 * @Author: 桂佳囿
 * @Date: 2025-01-18 16:55:06
 * @LastEditors: 桂佳囿
 * @LastEditTime: 2025-07-20 00:56:14
 * @Description: http实例
 */

import axios from "axios";
import type { InternalAxiosRequestConfig, AxiosResponse } from "axios";
import { useUserStore } from '@/stores/user';

const http = axios.create({
    baseURL: import.meta.env.VITE_API_BASE,
    timeout: 5000,
});

http.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = useUserStore.getState().user.token;
        if (token && !config.headers.Authorization) config.headers!.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

http.interceptors.response.use(
    (response: AxiosResponse) => {
        if (response.status && response.status !== 200) return Promise.reject(new Error())
        const { code } = response.data;
        if (code === 401) {
            return;
        }
        if (code !== 200) {
            return Promise.reject(new Error())
        }
        return response.data
    },
    (error) => {
        return Promise.reject(new Error(error));
    }
);

export { http };
