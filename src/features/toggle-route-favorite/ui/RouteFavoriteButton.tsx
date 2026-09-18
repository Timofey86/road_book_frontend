import {Star} from 'lucide-react';
import {useToggleRouteFavoriteMutation} from '../model/useToggleRouteFavoriteMutation';
import styles from './RouteFavoriteButton.module.css';
import {useTranslation} from 'react-i18next';

interface RouteFavoriteButtonProps {
    routeId: number;
    isFavorite: boolean;
}

export function RouteFavoriteButton({routeId, isFavorite}: RouteFavoriteButtonProps) {
    const {t} = useTranslation();
    const mutation = useToggleRouteFavoriteMutation(
        routeId,
        isFavorite,
    );


    return (
        <button
            type="button"
            className={`${styles.button} ${
                isFavorite ? styles.active : ''
            }`}
            onClick={() => mutation.mutate()}
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