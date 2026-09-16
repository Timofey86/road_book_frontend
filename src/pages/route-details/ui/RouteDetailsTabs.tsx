import styles from './RouteDetailsPage.module.css';
import type {RouteDetailsTab} from '../model/types';

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
                Overview
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
                Photos ({photosCount})
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
                Comments ({commentsCount})
            </button>
        </div>
    )
}