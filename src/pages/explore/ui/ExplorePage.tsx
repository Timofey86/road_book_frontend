import {RouteCard, type RouteSortBy, routesQueryOptions, type SortOrder} from "../../../entities/route";
import {useQuery} from "@tanstack/react-query";
import styles from './ExplorePage.module.css';
import {Pagination} from "../../../shared/ui/pagination";
import {SlidersHorizontal} from "lucide-react";
import {ExploreSearch} from "./ExploreSearch.tsx";
import {ChevronDown} from 'lucide-react';
import {useState} from "react";
import {ExploreFilters} from "./ExploreFilters.tsx";
import {useTranslation} from 'react-i18next';

interface ExplorePageProps {
    page: number;
    search: string;
    sortBy: RouteSortBy;
    sortOrder: SortOrder;

    minDistance?: number;
    maxDistance?: number;
    tags?: string;


    onPageChange: (page: number) => void;
    onSearchChange: (value: string) => void;
    onSortChange: (
        sortBy: RouteSortBy,
        sortOrder: SortOrder,
    ) => void;
    onFiltersChange: (filters: {
        minDistance?: number;
        maxDistance?: number;
        tags?: string;
    }) => void;
}

export function ExplorePage({
                                page,
                                onPageChange,
                                search,
                                sortBy,
                                sortOrder,
                                minDistance,
                                maxDistance,
                                tags,
                                onSortChange,
                                onSearchChange,
                                onFiltersChange,
}: ExplorePageProps) {
    const {
        data,
        isPending,
        isError,
        error,
    } = useQuery(routesQueryOptions({
        page,
        search: search || undefined,
        sortBy,
        sortOrder,
        minDistance,
        maxDistance,
        tags,
    }));
    const [filtersOpen, setFiltersOpen] = useState(false);
    const {t} = useTranslation();

    const handleSortChange = (
        value: string,
    ) => {
        switch (value) {
            case 'oldest':
                onSortChange('createdAt', 'asc');
                break;

            case 'likes':
                onSortChange('likes', 'desc');
                break;

            case 'distance-asc':
                onSortChange('distance', 'asc');
                break;

            case 'distance-desc':
                onSortChange('distance', 'desc');
                break;

            case 'latest':
            default:
                onSortChange('createdAt', 'desc');
        }
    };

    const getSortValue = () => {
        if (
            sortBy === 'createdAt' &&
            sortOrder === 'asc'
        ) {
            return 'oldest';
        }

        if (sortBy === 'likes') {
            return 'likes';
        }

        if (
            sortBy === 'distance' &&
            sortOrder === 'asc'
        ) {
            return 'distance-asc';
        }

        if (
            sortBy === 'distance' &&
            sortOrder === 'desc'
        ) {
            return 'distance-desc';
        }

        return 'latest';
    };

    const activeFiltersCount =
        (minDistance !== undefined ? 1 : 0) +
        (maxDistance !== undefined ? 1 : 0) +
        (tags
            ? tags.split(',').filter(Boolean).length
            : 0);

    if (isPending) {
        return <div>{t('explore.loading')}</div>;
    }

    if (isError) {
        return <div>{error.message}</div>;
    }

    const {meta} = data;

    return (
        <section className={styles.explore}>
            <div className={styles.heading}>
                < div>
                    <h1>{t('explore.title')}</h1>
                    <p>{t('explore.subtitle')}</p>
                </div>
            </div>
            <div className={styles.toolbar}>
                <ExploreSearch
                    value={search}
                    onChange={onSearchChange}
                />

                <div className={styles.sortWrapper}>
                    <select
                        className={styles.sort}
                        value={getSortValue()}
                        onChange={(event) =>
                            handleSortChange(event.target.value)
                        }
                    >
                        <option value="latest">
                            {t('explore.sort.latest')}
                        </option>
                        <option value="oldest">
                            {t('explore.sort.oldest')}
                        </option>
                        <option value="likes">
                            {t('explore.sort.mostLiked')}
                        </option>
                        <option value="distance-asc">
                            {t('explore.sort.distanceShortest')}
                        </option>
                        <option value="distance-desc">
                            {t('explore.sort.distanceLongest')}
                        </option>
                    </select>
                    <ChevronDown
                        size={16}
                        className={styles.sortIcon}
                    />
                </div>

                <button
                    type="button"
                    className={styles.filtersButton}
                    onClick={() => setFiltersOpen(true)}
                >
                    <SlidersHorizontal size={18}/>
                    {t('explore.filters.button')}

                    {activeFiltersCount > 0 && (
                        <span className={styles.filtersCount}>
                            {activeFiltersCount}
                        </span>
                    )}
                </button>
            </div>

            <div className={styles.content}>
                {data.items.length > 0 ? (
                    <div className={styles.grid}>
                        {data.items.map((route) => (
                            <RouteCard
                                key={route.id}
                                route={route}
                            />
                        ))}
                    </div>
                ) : (
                    <div className={styles.empty}>
                        {t('explore.empty')}
                    </div>
                )}

                <Pagination
                    page={meta.page}
                    totalPages={meta.totalPages}
                    onPageChange={onPageChange}
                />
            </div>

            {filtersOpen && (
                <ExploreFilters
                    open
                    onClose={() => setFiltersOpen(false)}
                    minDistance={minDistance}
                    maxDistance={maxDistance}
                    tags={tags}
                    onApply={onFiltersChange}
                />
            )}
        </section>
    );
}