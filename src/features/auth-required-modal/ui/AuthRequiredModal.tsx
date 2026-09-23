import {Link} from '@tanstack/react-router';
import {useTranslation} from 'react-i18next';
import styles from './AuthRequiredModal.module.css';
import {Modal} from "../../../shared/ui/modal";
import {appRoutes} from "../../../shared/lib/routes.ts";

interface AuthRequiredModalProps {
    open: boolean;
    onClose: () => void;
    description: string;
}

export function AuthRequiredModal({open, onClose, description}: AuthRequiredModalProps) {
    const {t} = useTranslation();

    return (
        <Modal
            open={open}
            onClose={onClose}
            title={t('authRequired.title')}
        >
            <p className={styles.text}>
                {description}
            </p>

            <div className={styles.actions}>
                <Link
                    to={appRoutes.login}
                    className={styles.primary}
                >
                    {t('authRequired.login')}
                </Link>

                <Link
                    to={appRoutes.register}
                    className={styles.secondary}
                >
                    {t('authRequired.register')}
                </Link>
            </div>
        </Modal>
    );
}