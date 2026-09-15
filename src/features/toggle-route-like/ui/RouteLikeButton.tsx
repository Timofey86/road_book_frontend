import {useToggleRouteLikeMutation} from "../model/useToggleRouteLikeMutation.ts";
import {Heart} from "lucide-react";
import styles from './RouteLikeButton.module.css';

interface RouteLikeButtonProps {
    routeId: number;
    isLiked: boolean;
    likesCount: number;
}

export function RouteLikeButton({routeId, isLiked, likesCount}: RouteLikeButtonProps) {
    const mutation = useToggleRouteLikeMutation();

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
            <Heart
                size={18}
                fill={isLiked ? 'currentColor' : 'none'}
            />

            <span>
                {likesCount} {likesCount === 1 ? 'like' : 'likes'}
            </span>
        </button>
    );
}