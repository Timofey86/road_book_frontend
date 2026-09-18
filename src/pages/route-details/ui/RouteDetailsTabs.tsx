import styles from './RouteDetailsPage.module.css';
import type {RouteDetailsTab} from '../model/types';
import {useTranslation} from 'react-i18next';

interface RouteDetailsTabsProps {
    activeTab: RouteDetailsTab;
    photosCount: number;
    commentsCount: number;
    onTabChange: (tab: RouteDetailsTab) => void;
}
export function RouteDetailsTabs({
    activeTab,
    photosCount,
    commentsCount,
    onTabChange,
}: RouteDetailsTabsProps) {
    const {t} = useTranslation();
    return (
        <div className={styles.tabs}>
            <button
                type="button"
                className={
                    activeTab === 'overview'
                        ? styles.activeTab
                        : styles.tab
                }
                onClick={() => onTabChange('overview')}
            >
                {t('routeDetails.tabs.overview')}
            </button>

            <button
                type="button"
                className={
                    activeTab === 'photos'
                        ? styles.activeTab
                        : styles.tab
                }
                onClick={() => onTabChange('photos')}
            >
                {t('routeDetails.tabs.photos', {
                    count: photosCount,
                })}
            </button>

            <button
                type="button"
                className={
                    activeTab === 'comments'
                        ? styles.activeTab
                        : styles.tab
                }
                onClick={() => onTabChange('comments')}
            >
                {t('routeDetails.tabs.comments', {
                    count: commentsCount,
                })}
            </button>
        </div>
    )
}