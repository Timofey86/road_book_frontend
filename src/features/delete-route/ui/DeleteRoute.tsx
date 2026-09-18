import {useState} from 'react';
import {useNavigate} from '@tanstack/react-router';
import {useDeleteRouteMutation} from '../../../entities/route';
import {appRoutes} from '../../../shared/lib/routes';
import {Modal} from '../../../shared/ui/modal';
import styles from './DeleteRoute.module.css';
import {Trans, useTranslation} from 'react-i18next';

interface DeleteRouteProps {
    routeId: number;
    routeTitle: string;
}

export function DeleteRoute({routeId,routeTitle}: DeleteRouteProps) {
    const {t} = useTranslation();
    const [isOpen, setIsOpen] = useState(false);

    const navigate = useNavigate();

    const deleteRouteMutation = useDeleteRouteMutation(routeId);

    const handleClose = () => {
        if (deleteRouteMutation.isPending) {
            return;
        }

        setIsOpen(false);
    };

    const handleDelete = () => {
        deleteRouteMutation.mutate(undefined, {
            onSuccess: () => {
                navigate({
                    to: appRoutes.home,
                });
            },
        });
    };

    return (
        <>
            <section className={styles.dangerSection}>
                <div className={styles.dangerContent}>
                    <div>
                        <h2>{t('editRoute.delete.title')}</h2>

                        <p>
                            {t('editRoute.delete.description')}
                        </p>
                    </div>

                    <button
                        type="button"
                        className={styles.deleteButton}
                        onClick={() => setIsOpen(true)}
                    >
                        {t('editRoute.delete.button')}
                    </button>
                </div>
            </section>

            <Modal
                open={isOpen}
                onClose={handleClose}
                title={t('editRoute.delete.modalTitle')}
            >
                <p className={styles.message}>
                    <Trans
                        i18nKey="editRoute.delete.confirmation"
                        values={{routeTitle}}
                        components={{
                            strong: <strong/>,
                        }}
                    />
                </p>

                {deleteRouteMutation.isError && (
                    <p className={styles.error}>
                        {t('editRoute.delete.error')}
                    </p>
                )}

                <div className={styles.actions}>
                    <button
                        type="button"
                        className={styles.cancelButton}
                        onClick={handleClose}
                        disabled={deleteRouteMutation.isPending}
                    >
                        {t('common.cancel')}
                    </button>

                    <button
                        type="button"
                        className={styles.confirmDeleteButton}
                        onClick={handleDelete}
                        disabled={deleteRouteMutation.isPending}
                    >
                        {deleteRouteMutation.isPending
                            ? t('editRoute.delete.deleting')
                            : t('editRoute.delete.button')}
                    </button>
                </div>
            </Modal>
        </>
    );
}