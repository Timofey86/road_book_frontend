import {type FormEvent, useState} from "react";
import {useRegisterMutation} from "../../../features/auth/model/mutations.ts";
import {Link, useNavigate} from "@tanstack/react-router";
import axios from "axios";
import styles from './RegisterPage.module.css'
import {Eye, EyeOff} from "lucide-react";
import {type RegisterErrors, validateRegister} from "../../../features/auth/model/validateRegister.ts";
import { useTranslation } from 'react-i18next';

export function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [bio, setBio] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { t, i18n } = useTranslation();

    const [errors, setErrors] = useState<RegisterErrors>({});

    const registerMutation = useRegisterMutation();
    const navigate = useNavigate();

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const values = {
            name: name.trim(),
            email: email.trim(),
            password,
            confirmPassword,
            bio: bio.trim() || undefined,
        };

        const errors = validateRegister(values);

        setErrors(errors);

        if (Object.keys(errors).length > 0) {
            return;
        }

        registerMutation.mutate(
            {
                name: values.name,
                email: values.email,
                password: values.password,
                bio: values.bio,
                preferredLanguage: i18n.resolvedLanguage === 'ru'
                    ? 'ru'
                    : 'en',
            },
            {
                onSuccess: () => {
                    navigate({to: '/'});
                },
            });
    };

    let serverError: string | null = null;

    if (registerMutation.isError) {
        const error = registerMutation.error;

        if (axios.isAxiosError(error)) {
            const data = error.response?.data as
                | {
                message?: string | string[];
            }
                | undefined;

            if (Array.isArray(data?.message)) {
                serverError = data.message.join(', ');
            } else if (typeof data?.message === 'string') {
                serverError = data.message;
            }
        }

        serverError ??= 'Registration failed.';
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.heading}>
                <h1>{t('auth.register.title')}</h1>
                <p>{t('auth.register.subtitle')}</p>
            </div>

            <form
                className={styles.form}
                onSubmit={handleSubmit}
                noValidate
            >
                <label className={styles.field}>
                    <span>{t('auth.register.name')}</span>

                    <input
                        type="text"
                        value={name}
                        onChange={(event) => {
                            setName(event.target.value);

                            if (errors.name) {
                                setErrors((current) => ({
                                    ...current,
                                    name: undefined,
                                }));
                            }
                        }}
                        placeholder={t('auth.register.namePlaceholder')}
                        autoComplete="name"
                        maxLength={100}
                        className={errors.name ? styles.invalid : undefined}
                    />
                    {errors.name && (
                        <small className={styles.fieldError}>
                            {t(errors.name)}
                        </small>
                    )}
                </label>

                <label className={styles.field}>
                    <span>{t('auth.register.email')}</span>

                    <input
                        type="email"
                        value={email}
                        onChange={(event) => {
                            setEmail(event.target.value);

                            if (errors.email) {
                                setErrors((current) => ({
                                    ...current,
                                    email: undefined,
                                }));
                            }
                        }}
                        placeholder={t('auth.register.emailPlaceholder')}
                        autoComplete="email"
                        maxLength={255}
                        className={errors.email ? styles.invalid : undefined}
                    />
                    {errors.email && (
                        <small className={styles.fieldError}>
                            {t(errors.email)}
                        </small>
                    )}
                </label>

                <label className={styles.field}>
                    <span>{t('auth.register.password')}</span>

                    <div className={styles.passwordField}>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(event) => {
                                setPassword(event.target.value);

                                if (errors.password) {
                                    setErrors((current) => ({
                                        ...current,
                                        password: undefined,
                                    }));
                                }
                            }}
                            placeholder={t('auth.register.passwordPlaceholder')}
                            autoComplete="new-password"
                            minLength={8}
                            maxLength={72}
                            className={errors.password ? styles.invalid : undefined}
                        />

                        <button
                            type="button"
                            className={styles.passwordToggle}
                            onClick={() =>
                                setShowPassword((current) => !current)
                            }
                            aria-label={
                                showPassword
                                    ? t('common.hidePassword')
                                    : t('common.showPassword')
                            }
                        >
                            {showPassword ? (
                                <EyeOff size={18}/>
                            ) : (
                                <Eye size={18}/>
                            )}
                        </button>
                    </div>

                    {errors.password ? (
                        <small className={styles.fieldError}>
                            {t(errors.password)}
                        </small>
                    ) : (
                        <small className={styles.hint}>
                            {t('auth.register.passwordHint')}
                        </small>
                    )}
                </label>

                <label className={styles.field}>
                    <span>{t('auth.register.confirmPassword')}</span>

                    <div className={styles.passwordField}>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={confirmPassword}
                            onChange={(event) => {
                                setConfirmPassword(event.target.value);

                                if (errors.confirmPassword) {
                                    setErrors((current) => ({
                                        ...current,
                                        confirmPassword: undefined,
                                    }));
                                }
                            }}
                            placeholder={t('auth.register.confirmPasswordPlaceholder')}
                            autoComplete="new-password"
                            className={
                                errors.confirmPassword
                                    ? styles.invalid
                                    : undefined
                            }
                        />

                        <button
                            type="button"
                            className={styles.passwordToggle}
                            onClick={() =>
                                setShowPassword((current) => !current)
                            }
                            aria-label={
                                showPassword
                                    ? t('common.hidePassword')
                                    : t('common.showPassword')
                            }
                        >
                            {showPassword
                                ? <EyeOff size={18}/>
                                : <Eye size={18}/>
                            }
                        </button>
                    </div>

                    {errors.confirmPassword && (
                        <small className={styles.fieldError}>
                            {t(errors.confirmPassword)}
                        </small>
                    )}
                </label>

                <label className={styles.field}>
                    <span>{t('auth.register.bio')}</span>

                    <textarea
                        value={bio}
                        onChange={(event) => {
                            setBio(event.target.value);

                            if (errors.bio) {
                                setErrors((current) => ({
                                    ...current,
                                    bio: undefined,
                                }));
                            }
                        }}
                        placeholder={t('auth.register.bioPlaceholder')}
                        maxLength={500}
                        rows={4}
                        className={errors.bio ? styles.invalid : undefined}
                    />

                    <div className={styles.fieldFooter}>
                        {errors.bio ? (
                            <small className={styles.fieldError}>
                                {t(errors.bio)}
                            </small>
                        ) : (
                            <span/>
                        )}

                        <small className={styles.counter}>
                            {bio.length} / 500
                        </small>
                    </div>
                </label>

                {serverError && (
                    <div className={styles.error}>
                        {serverError}
                    </div>
                )}

                <button
                    type="submit"
                    className={styles.submit}
                    disabled={registerMutation.isPending}
                >
                    {registerMutation.isPending
                        ? t('auth.register.submitting')
                        : t('auth.register.submit')}
                </button>
            </form>

            <p className={styles.footer}>
                {t('auth.register.alreadyHaveAccount')}{' '}
                <Link to="/login">
                    {t('auth.register.signIn')}
                </Link>
            </p>
        </div>
    )
}