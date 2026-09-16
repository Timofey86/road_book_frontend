import {useState} from 'react';
import {MoreHorizontal} from 'lucide-react';
import type {Comment} from '../../../entities/comment';
import {useDeleteRouteCommentMutation} from '../../../features/delete-route-comment';
import styles from './RouteDetailsPage.module.css';
import {useEditRouteCommentMutation} from "../../../features/edit-route-comment";
import { Modal } from "../../../shared/ui/modal";

interface RouteCommentProps {
    comment: Comment;
    routeId: number;
    isOwner: boolean;
    onDeleted?: () => void;
}

export function RouteComment({
                                 comment,
                                 routeId,
                                 isOwner,
                                 onDeleted,
                             }: RouteCommentProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [body, setBody] = useState(comment.body);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const editMutation = useEditRouteCommentMutation(routeId);
    const deleteMutation = useDeleteRouteCommentMutation(routeId);

    const handleDelete = () => {
        deleteMutation.mutate(comment.id, {
            onSuccess: () => {
                setIsDeleteModalOpen(false);
                onDeleted?.();
            },
        });
    };

    const handleEdit = () => {
        setBody(comment.body);
        setIsEditing(true);
        setIsMenuOpen(false);
    };

    const handleCancelEdit = () => {
        setBody(comment.body);
        setIsEditing(false);
    };

    const handleSaveEdit = () => {
        const trimmedBody = body.trim();

        if (
            !trimmedBody ||
            trimmedBody === comment.body ||
            trimmedBody.length > 2000
        ) {
            return;
        }

        editMutation.mutate(
            {
                commentId: comment.id,
                body: trimmedBody,
            },
            {
                onSuccess: () => {
                    setIsEditing(false);
                },
            },
        );
    };

    return (
        <>
        <article className={styles.comment}>
            <div className={styles.commentHeader}>
                <div className={styles.commentAuthor}>
                    {comment.author.avatarUrl ? (
                        <img
                            src={comment.author.avatarUrl}
                            alt={comment.author.name}
                        />
                    ) : (
                        <div
                            className={
                                styles.commentAvatarFallback
                            }
                        >
                            {comment.author.name
                                .charAt(0)
                                .toUpperCase()}
                        </div>
                    )}

                    <strong>
                        {comment.author.name}
                    </strong>
                </div>

                {isOwner && (
                    <div className={styles.commentMenu}>
                        <button
                            type="button"
                            className={styles.commentMenuButton}
                            aria-label="Comment actions"
                            onClick={() =>
                                setIsMenuOpen(
                                    (current) => !current,
                                )
                            }
                        >
                            <MoreHorizontal size={18}/>
                        </button>

                        {isMenuOpen && (
                            <div
                                className={styles.commentMenuDropdown}
                            >
                                <button
                                    type="button"
                                    className={styles.editCommentButton}
                                    onClick={handleEdit}
                                >
                                    Edit
                                </button>

                                <button
                                    type="button"
                                    className={styles.deleteCommentButton}
                                    disabled={deleteMutation.isPending}
                                    onClick={() => {
                                        setIsMenuOpen(false);
                                        setIsDeleteModalOpen(true);
                                    }}
                                >
                                    {deleteMutation.isPending
                                        ? 'Deleting...'
                                        : 'Delete'}
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {isEditing ? (
                <div className={styles.commentEdit}>
                    <textarea
                        value={body}
                        maxLength={2000}
                        disabled={editMutation.isPending}
                        onChange={(event) =>
                            setBody(event.target.value)
                        }
                    />
                    <div className={styles.commentEditFooter}>
                    <span className={styles.commentEditCounter}>
                        {body.length} / 2000
                    </span>

                        <div className={styles.commentEditActions}>
                            <button
                                type="button"
                                className={styles.cancelEditButton}
                                disabled={editMutation.isPending}
                                onClick={handleCancelEdit}
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                className={styles.saveEditButton}
                                disabled={
                                    editMutation.isPending ||
                                    !body.trim() ||
                                    body.trim() === comment.body ||
                                    body.trim().length > 2000
                                }
                                onClick={handleSaveEdit}
                            >
                                {editMutation.isPending
                                    ? 'Saving...'
                                    : 'Save changes'}
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <p className={styles.commentBody}>
                    {comment.body}
                </p>
            )}
        </article>
    <Modal
        open={isDeleteModalOpen}
        onClose={() => {
            if (!deleteMutation.isPending) {
                setIsDeleteModalOpen(false);
            }
        }}
        title="Delete comment?"
    >
        <div className={styles.deleteModal}>
            <p>
                Are you sure you want to delete this comment?
                This action cannot be undone.
            </p>

            <div className={styles.deleteModalActions}>
                <button
                    type="button"
                    className={styles.cancelDeleteButton}
                    disabled={deleteMutation.isPending}
                    onClick={() =>
                        setIsDeleteModalOpen(false)
                    }
                >
                    Cancel
                </button>

                <button
                    type="button"
                    className={styles.confirmDeleteButton}
                    disabled={deleteMutation.isPending}
                    onClick={handleDelete}
                >
                    {deleteMutation.isPending
                        ? 'Deleting...'
                        : 'Delete'}
                </button>
            </div>
        </div>
    </Modal>
        </>
    );
}