import type {PropsWithChildren} from "react";
import styles from './GuestLayout.module.css';
import logo from '../../../shared/assets/logo.png';
import { useTranslation } from 'react-i18next';

export function GuestLayout({ children }: PropsWithChildren) {
    const { t } = useTranslation();
    return(
        <main className={styles.page}>
            <div className={styles.container}>
                <section className={styles.brand}>
                    <img
                        src={logo}
                        alt="RoadBook"
                        className={styles.logo}
                    />
                    <div className={styles.intro}>
                        <h1>{t('guest.title')}</h1>

                        <p>{t('guest.description')}</p>
                    </div>
                </section>
                <section className={styles.formSection}>
                    {children}
                </section>
            </div>
        </main>
    )
}