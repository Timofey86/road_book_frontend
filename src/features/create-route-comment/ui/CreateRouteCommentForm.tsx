import {useState, type FormEvent} from 'react';
import {useCreateRouteCommentMutation} from '../model/useCreateRouteCommentMutation';
import styles from './CreateRouteCommentForm.module.css';

interface CreateRouteCommentFormProps {
    routeId: number;
}

export function CreateRouteCommentForm({routeId}: CreateRouteCommentFormProps) {
    const [body, setBody] = useState('');

    const mutation =  useCreateRouteCommentMutation(routeId);

    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>,
    ) => {
        event.preventDefault();

        const trimmedBody = body.trim();
        if (!trimmedBody) {
            return;
        }

        await mutation.mutateAsync(trimmedBody);
        setBody('');
    };

    return (
        <form
            className={styles.form}
            onSubmit={handleSubmit}
        >
            <div className={styles.heading}>
                <strong>Join the conversation</strong>
                <span>Share your thoughts about this route.</span>
            </div>

            <textarea
                value={body}
                onChange={(event) =>
                    setBody(event.target.value)
                }
                placeholder="Write a comment..."
                maxLength={2000}
                rows={3}
                disabled={mutation.isPending}
            />

            <div className={styles.footer}>
        <span>
            {body.length} / 2000
        </span>

                <button
                    type="submit"
                    disabled={mutation.isPending || !body.trim()}
                >
                    {mutation.isPending
                        ? 'Posting...'
                        : 'Post comment'}
                </button>
            </div>

            {mutation.isError && (
                <p className={styles.error}>
                    Failed to post comment.
                </p>
            )}
        </form>
    );
}