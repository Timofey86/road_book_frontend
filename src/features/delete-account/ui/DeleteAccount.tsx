import {useState} from 'react';
import {Trash2} from 'lucide-react';
import {useNavigate} from '@tanstack/react-router';
import {Modal} from '../../../shared/ui/modal';
import {appRoutes} from '../../../shared/lib/routes.ts';
import {useDeleteAccountMutation} from '../model/useDeleteAccountMutation.ts';
import styles from './DeleteAccount.module.css';

export function DeleteAccount() {
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
                    <h2>Danger Zone</h2>
                    <p>
                        Irreversible account actions.
                    </p>
                </div>

                <div className={styles.content}>
                    <div>
                        <h3>Delete account</h3>

                        <p>
                            Permanently delete your account and all
                            associated data. This action cannot be undone.
                        </p>
                    </div>

                    <button
                        type="button"
                        className={styles.deleteButton}
                        onClick={() => setIsModalOpen(true)}
                    >
                        <Trash2 size={16}/>
                        Delete account
                    </button>
                </div>
            </section>

            <Modal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            >
                <div className={styles.modalContent}>
                    <h2>Delete account?</h2>

                    <p>
                        Your profile, routes, photos, likes, comments
                        and other account data will be permanently deleted.
                        This action cannot be undone.
                    </p>

                    {deleteAccountMutation.isError && (
                        <p className={styles.error}>
                            Failed to delete account. Please try again.
                        </p>
                    )}

                    <div className={styles.modalActions}>
                        <button
                            type="button"
                            className={styles.cancelButton}
                            onClick={() => setIsModalOpen(false)}
                            disabled={deleteAccountMutation.isPending}
                        >
                            Cancel
                        </button>

                        <button
                            type="button"
                            className={styles.confirmButton}
                            onClick={handleDelete}
                            disabled={deleteAccountMutation.isPending}
                        >
                            {deleteAccountMutation.isPending
                                ? 'Deleting...'
                                : 'Delete account'}
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
}