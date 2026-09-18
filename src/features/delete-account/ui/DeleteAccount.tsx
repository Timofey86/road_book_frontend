import {useState} from 'react';
import {Trash2} from 'lucide-react';
import {useNavigate} from '@tanstack/react-router';
import {Modal} from '../../../shared/ui/modal';
import {appRoutes} from '../../../shared/lib/routes.ts';
import {useDeleteAccountMutation} from '../model/useDeleteAccountMutation.ts';
import styles from './DeleteAccount.module.css';
import {useTranslation} from 'react-i18next';

export function DeleteAccount() {
    const {t} = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const navigate = useNavigate();
    const deleteAccountMutation = useDeleteAccountMutation();

    const handleDelete = () => {
        deleteAccountMutation.mutate(undefined, {
            onSuccess: () => {
                setIsModalOpen(false);

                navigate({
                    to: appRoutes.home,
                });
            },
        });
    };

    return (
        <>
            <section className={styles.card}>
                <div className={styles.header}>
                    <h2>{t('profile.editPage.delete.dangerZone')}</h2>
                    <p>
                        {t('profile.editPage.delete.dangerDescription')}
                    </p>
                </div>

                <div className={styles.content}>
                    <div>
                        <h3>{t('profile.editPage.delete.title')}</h3>

                        <p>
                            {t('profile.editPage.delete.description')}
                        </p>
                    </div>

                    <button
                        type="button"
                        className={styles.deleteButton}
                        onClick={() => setIsModalOpen(true)}
                    >
                        <Trash2 size={16}/>
                        {t('profile.editPage.delete.button')}
                    </button>
                </div>
            </section>

            <Modal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            >
                <div className={styles.modalContent}>
                    <h2>{t('profile.editPage.delete.modalTitle')}</h2>

                    <p>
                        {t('profile.editPage.delete.modalDescription')}
                    </p>

                    {deleteAccountMutation.isError && (
                        <p className={styles.error}>
                            {t('profile.editPage.delete.error')}
                        </p>
                    )}

                    <div className={styles.modalActions}>
                        <button
                            type="button"
                            className={styles.cancelButton}
                            onClick={() => setIsModalOpen(false)}
                            disabled={deleteAccountMutation.isPending}
                        >
                            {t('common.cancel')}
                        </button>

                        <button
                            type="button"
                            className={styles.confirmButton}
                            onClick={handleDelete}
                            disabled={deleteAccountMutation.isPending}
                        >
                            {deleteAccountMutation.isPending
                                ? t('profile.editPage.delete.deleting')
                                : t('profile.editPage.delete.button')}
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
}