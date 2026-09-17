import type {CurrentUser} from "../model/types.ts";
import {apiClient} from "../../../shared/api/apiClient.ts";
import axios from "axios";

export async function getCurrentUser(): Promise<CurrentUser | null> {
    try {
        const {data} = await apiClient.get<CurrentUser>('/auth/me');
        return data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
            return null;
        }

        throw error;
    }
}