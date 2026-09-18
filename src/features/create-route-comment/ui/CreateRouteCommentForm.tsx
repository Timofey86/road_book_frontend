import {useState, type FormEvent} from 'react';
import {useCreateRouteCommentMutation} from '../model/useCreateRouteCommentMutation';
import styles from './CreateRouteCommentForm.module.css';
import {useTranslation} from 'react-i18next';

interface CreateRouteCommentFormProps {
    routeId: number;
}

export function CreateRouteCommentForm({routeId}: CreateRouteCommentFormProps) {
    const {t} = useTranslation();
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
                <strong>{t('comments.form.title')}</strong>
                <span>{t('comments.form.subtitle')}</span>
            </div>

            <textarea
                value={body}
                onChange={(event) =>
                    setBody(event.target.value)
                }
                placeholder={t('comments.form.placeholder')}
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
                        ? t('comments.form.posting')
                        : t('comments.form.submit')}
                </button>
            </div>

            {mutation.isError && (
                <p className={styles.error}>
                    {t('comments.form.error')}
                </p>
            )}
        </form>
    );
}