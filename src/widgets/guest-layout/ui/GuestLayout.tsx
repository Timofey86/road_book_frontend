import type {PropsWithChildren} from "react";
import styles from './GuestLayout.module.css';
import logo from '../../../shared/assets/logo.png';
import { useTranslation } from 'react-i18next';
import {Link} from "@tanstack/react-router";
import {appRoutes} from "../../../shared/lib/routes.ts";

export function GuestLayout({ children }: PropsWithChildren) {
    const { t } = useTranslation();
    return(
        <main className={styles.page}>
            <div className={styles.container}>
                <section className={styles.brand}>
                    <Link to={appRoutes.home}>
                    <img
                        src={logo}
                        alt="RoadBook"
                        className={styles.logo}
                    />
                    </Link>
                    <div className={styles.intro}>
                        <h1>{t('guest.title')}</h1>

                        <p>{t('guest.description')}</p>
                    </div>
                </section>
                <section className={styles.formSection}>
                    <Link
                        to={appRoutes.home}
                        className={styles.mobileLogoLink}
                    >
                        <img
                            src={logo}
                            alt="RoadBook"
                            className={styles.mobileLogo}
                        />
                    </Link>
                    {children}
                </section>
            </div>
        </main>
    )
}