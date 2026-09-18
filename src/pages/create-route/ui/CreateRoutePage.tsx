import styles from './CreateRoutePage.module.css';
import {CreateRouteForm} from "../../../features/create-route";
import {useTranslation} from 'react-i18next';

export function CreateRoutePage() {
    const {t} = useTranslation();
    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <h1>{t('createRoute.title')}</h1>
                <p>
                    {t('createRoute.subtitle')}
                </p>
            </div>

            <CreateRouteForm />
        </div>
    );
}