import {Star} from 'lucide-react';
import {useToggleRouteFavoriteMutation} from '../model/useToggleRouteFavoriteMutation';
import styles from './RouteFavoriteButton.module.css';
import {useTranslation} from 'react-i18next';

interface RouteFavoriteButtonProps {
    routeId: number;
    isFavorite: boolean;
    onAuthRequired?: () => void;
}

export function RouteFavoriteButton({routeId, isFavorite, onAuthRequired}: RouteFavoriteButtonProps) {
    const {t} = useTranslation();
    const mutation = useToggleRouteFavoriteMutation(
        routeId,
        isFavorite,
    );

    const handleClick = () => {
        if (onAuthRequired) {
            onAuthRequired();
            return;
        }

        mutation.mutate();
    };


    return (
        <button
            type="button"
            className={`${styles.button} ${
                isFavorite ? styles.active : ''
            }`}
            onClick={handleClick}
            disabled={mutation.isPending}
        >
            <Star size={18}/>

            <span>
                {isFavorite
                    ? t('routeActions.favorite.inFavorites')
                    : t('routeActions.favorite.add')}
            </span>
        </button>
    );
}