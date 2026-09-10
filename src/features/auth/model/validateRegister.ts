import type {RegisterFormValues} from './types';

export type RegisterErrors = Partial<
    Record<keyof RegisterFormValues, string>
>;

export function validateRegister(
    values: RegisterFormValues,
): RegisterErrors {
    const errors: RegisterErrors = {};

    const name = values.name.trim();
    const email = values.email.trim();

    if (name.length < 2) {
        errors.name = 'auth.validation.nameMinLength';
    }

    if (name.length > 100) {
        errors.name = 'auth.validation.nameMaxLength';
    }

    if (!email) {
        errors.email = 'auth.validation.emailRequired';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.email = 'auth.validation.emailInvalid';
    }

    if (values.password.length < 8) {
        errors.password = 'auth.validation.passwordMinLength';
    } else if (values.password.length > 72) {
        errors.password = 'auth.validation.passwordMaxLength';
    } else if (
        !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(values.password)
    ) {
        errors.password = 'auth.validation.passwordFormat';
    }

    if (!values.confirmPassword) {
        errors.confirmPassword = 'auth.validation.confirmPasswordRequired';
    } else if (values.password !== values.confirmPassword) {
        errors.confirmPassword =  'auth.validation.passwordsDoNotMatch';
    }

    if (values.bio && values.bio.length > 500) {
        errors.bio = 'auth.validation.bioMaxLength';
    }

    return errors;
}