import {useState} from "react";
import {useLoginMutation} from "../../../features/auth";
import {Link, useNavigate} from "@tanstack/react-router";
import styles from './LoginPage.module.css';
import {Eye, EyeOff} from "lucide-react";
import { useTranslation } from 'react-i18next';

export function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { t } = useTranslation();

    const loginMutation = useLoginMutation()
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        loginMutation.mutate({
            email,
            password
        },
            {
                onSuccess: () => {
                    navigate({ to: '/' });
                },
            },
        )
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.heading}>
                <h1>{t('auth.login.title')}</h1>
                <p>{t('auth.login.subtitle')}</p>
            </div>
        <form className={styles.form} onSubmit={handleSubmit}>
            <label className={styles.field}>
                <span>{t('auth.login.email')}</span>

                <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder={t('auth.login.emailPlaceholder')}
                    autoComplete="email"
                    required
                />
            </label>


            <label className={styles.field}>
                <span>{t('auth.login.password')}</span>

                <div className={styles.passwordField}>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(event) =>
                            setPassword(event.target.value)
                        }
                        placeholder={t('auth.login.passwordPlaceholder')}
                        autoComplete="current-password"
                        required
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
                            <EyeOff size={18} />
                        ) : (
                            <Eye size={18} />
                        )}
                    </button>
                </div>
            </label>

            {loginMutation.isError && (
                <div className={styles.error}>
                    Invalid email or password.
                </div>
            )}

            <button
                type="submit"
                className={styles.submit}
                disabled={loginMutation.isPending}
            >
                {loginMutation.isPending ? t('auth.login.submitting') : t('auth.login.submit')}
            </button>

            {loginMutation.isError && (
                <p>Login failed</p>
            )}
        </form>
            <p className={styles.footer}>
                {t('auth.login.noAccount')}{' '}
                <Link to="/register">
                    {t('auth.login.createAccount')}
                </Link>
            </p>
        </div>
    )
}