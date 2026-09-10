import type { SupportedLanguage } from '../../../shared/i18n/types';

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterPayload {
    name: string;
    email: string;
    password: string;
    bio?: string;
    preferredLanguage: SupportedLanguage;
}

export interface RegisterFormValues {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    bio?: string;
}