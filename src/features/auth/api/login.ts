import type {LoginRequest} from "../model/types.ts";
import {apiClient} from "../../../shared/api/apiClient.ts";

export async function login(payload: LoginRequest): Promise<void> {
    await apiClient.post('/auth/login', payload);
}