import {useState} from 'react';
import {useNavigate} from '@tanstack/react-router';
import {useDeleteRouteMutation} from '../../../entities/route';
import {appRoutes} from '../../../shared/lib/routes';
import {Modal} from '../../../shared/ui/modal';
import styles from './DeleteRoute.module.css';

interface DeleteRouteProps {
    routeId: number;
    routeTitle: string;
}

export function DeleteRoute({routeId,routeTitle}: DeleteRouteProps) {
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
                        <h2>Danger zone</h2>

                        <p>
                            Permanently delete this route
                            and all related data.
                        </p>
                    </div>

                    <button
                        type="button"
                        className={styles.deleteButton}
                        onClick={() => setIsOpen(true)}
                    >
                        Delete route
                    </button>
                </div>
            </section>

            <Modal
                open={isOpen}
                onClose={handleClose}
                title="Delete route?"
            >
                <p className={styles.message}>
                    This will permanently delete{' '}
                    <strong>“{routeTitle}”</strong>.
                    This action cannot be undone.
                </p>

                {deleteRouteMutation.isError && (
                    <p className={styles.error}>
                        Failed to delete the route.
                    </p>
                )}

                <div className={styles.actions}>
                    <button
                        type="button"
                        className={styles.cancelButton}
                        onClick={handleClose}
                        disabled={
                            deleteRouteMutation.isPending
                        }
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        className={
                            styles.confirmDeleteButton
                        }
                        onClick={handleDelete}
                        disabled={
                            deleteRouteMutation.isPending
                        }
                    >
                        {deleteRouteMutation.isPending
                            ? 'Deleting...'
                            : 'Delete route'}
                    </button>
                </div>
            </Modal>
        </>
    );
}