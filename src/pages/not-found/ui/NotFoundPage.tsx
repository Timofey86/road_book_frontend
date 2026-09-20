import {Link} from '@tanstack/react-router';
import {MapPinOff} from 'lucide-react';
import {useTranslation} from 'react-i18next';
import {appRoutes} from '../../../shared/lib/routes.ts';
import logo from '../../../shared/assets/logo.png';
import styles from './NotFoundPage.module.css';

export function NotFoundPage() {
    const {t} = useTranslation();

    return (
        <main className={styles.page}>
            <div className={styles.content}>
                <Link
                    to={appRoutes.home}
                    className={styles.logoLink}
                    aria-label="RoadBook"
                >
                    <img
                        src={logo}
                        alt="RoadBook"
                        className={styles.logo}
                    />
                </Link>

                <div className={styles.icon}>
                    <MapPinOff size={32}/>
                </div>

                <span className={styles.code}>404</span>

                <h1>{t('notFound.title')}</h1>

                <p>{t('notFound.description')}</p>

                <Link
                    to={appRoutes.home}
                    className={styles.homeButton}
                >
                    {t('notFound.backHome')}
                </Link>
            </div>
        </main>
    );
}