import {apiClient} from "../../../shared/api/apiClient.ts";

export async function logout(): Promise<void> {
    await apiClient.post('/auth/logout');
}