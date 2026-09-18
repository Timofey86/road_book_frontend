import {useToggleRouteLikeMutation} from "../model/useToggleRouteLikeMutation.ts";
import {Heart} from "lucide-react";
import styles from './RouteLikeButton.module.css';
import {useTranslation} from 'react-i18next';

interface RouteLikeButtonProps {
    routeId: number;
    isLiked: boolean;
    likesCount: number;
}

export function RouteLikeButton({routeId, isLiked, likesCount}: RouteLikeButtonProps) {
    const mutation = useToggleRouteLikeMutation();
    const {t} = useTranslation();

    const handleClick = () => {
        mutation.mutate({
            routeId,
            isLiked,
        });
    };

    return (
        <button
            type="button"
            className={`${styles.button} ${isLiked ? styles.active : ''}`}
            onClick={handleClick}
            disabled={mutation.isPending}
        >
            <span className={styles.action}>
                <Heart size={18}/>
                {isLiked
                    ? t('routeActions.like.liked')
                    : t('routeActions.like.like')}
            </span>
            <span className={styles.count}>
                {t('routeActions.like.likes', {
                    count: likesCount,
                })}
            </span>
        </button>
    );
}