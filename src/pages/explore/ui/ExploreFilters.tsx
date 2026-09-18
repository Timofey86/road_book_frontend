import {useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import {Search} from 'lucide-react';
import {Modal} from '../../../shared/ui/modal';
import {useDebounce} from '../../../shared/lib/useDebounce';
import {tagsQueryOptions} from '../../../entities/tag';
import styles from './ExploreFilters.module.css';
import {useTranslation} from 'react-i18next';

interface ExploreFiltersValue {
    minDistance?: number;
    maxDistance?: number;
    tags?: string;
}

interface ExploreFiltersProps {
    open: boolean;
    onClose: () => void;

    minDistance?: number;
    maxDistance?: number;
    tags?: string;

    onApply: (filters: ExploreFiltersValue) => void;
}

export function ExploreFilters({
                                   open,
                                   onClose,
                                   minDistance,
                                   maxDistance,
                                   tags,
                                   onApply,
                               }: ExploreFiltersProps) {
    const [minKm, setMinKm] = useState(
        minDistance !== undefined
            ? String(minDistance / 1000)
            : '',
    );

    const [maxKm, setMaxKm] = useState(
        maxDistance !== undefined
            ? String(maxDistance / 1000)
            : '',
    );

    const [tagSearch, setTagSearch] = useState('');

    const [selectedTags, setSelectedTags] =
        useState<string[]>(() =>
            tags
                ? tags
                    .split(',')
                    .map((tag) => tag.trim())
                    .filter(Boolean)
                : [],
        );
    const {t} = useTranslation();

    const debouncedTagSearch = useDebounce(tagSearch, 500);

    const {data: availableTags = []} = useQuery(
        tagsQueryOptions(
            debouncedTagSearch || undefined,
        ),
    );

    const handleTagChange = (
        slug: string,
    ) => {
        setSelectedTags((current) =>
            current.includes(slug)
                ? current.filter(
                    (tag) => tag !== slug,
                )
                : [...current, slug],
        );
    };

    const handleReset = () => {
        setMinKm('');
        setMaxKm('');
        setSelectedTags([]);
        setTagSearch('');
    };

    const handleApply = () => {
        const parsedMinKm =
            minKm === ''
                ? undefined
                : Number(minKm);

        const parsedMaxKm =
            maxKm === ''
                ? undefined
                : Number(maxKm);

        onApply({
            minDistance:
                parsedMinKm !== undefined
                    ? parsedMinKm * 1000
                    : undefined,

            maxDistance:
                parsedMaxKm !== undefined
                    ? parsedMaxKm * 1000
                    : undefined,

            tags:
                selectedTags.length > 0
                    ? selectedTags.join(',')
                    : undefined,
        });

        onClose();
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            title={t('explore.filters.title')}
        >
            <div className={styles.content}>
                <div className={styles.section}>
                    <h3>{t('explore.filters.distance')}</h3>

                    <div className={styles.distance}>
                        <label>
                            <span>{t('explore.filters.minKm')}</span>
                            <input
                                type="number"
                                min="0"
                                value={minKm}
                                onChange={(event) =>
                                    setMinKm(event.target.value)
                                }
                                placeholder="0"
                            />
                        </label>

                        <label>
                            <span>{t('explore.filters.maxKm')}</span>
                            <input
                                type="number"
                                min="0"
                                value={maxKm}
                                onChange={(event) =>
                                    setMaxKm(event.target.value)
                                }
                                placeholder={t('explore.filters.any')}
                            />
                        </label>
                    </div>
                </div>

                <div className={styles.section}>
                    <h3>{t('explore.filters.tags')}</h3>

                    <div className={styles.tagSearch}>
                        <Search size={17}/>

                        <input
                            type="search"
                            value={tagSearch}
                            onChange={(event) =>
                                setTagSearch(event.target.value)
                            }
                            placeholder={t('explore.filters.searchTags')}
                        />
                    </div>

                    {selectedTags.length > 0 && (
                        <div className={styles.selectedTags}>
                            {selectedTags.map((slug) => (
                                <button
                                    key={slug}
                                    type="button"
                                    className={styles.selectedTag}
                                    onClick={() =>
                                        handleTagChange(slug)
                                    }
                                >
                                    {slug}
                                    <span>×</span>
                                </button>
                            ))}
                        </div>
                    )}

                    <div className={styles.tags}>
                        {availableTags.map((tag) => (
                            <label
                                key={tag.id}
                                className={styles.tag}
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedTags.includes(tag.slug)}
                                    onChange={() => handleTagChange(tag.slug)}
                                />

                                <span>{tag.name}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className={styles.actions}>
                    <button
                        type="button"
                        className={styles.resetButton}
                        onClick={handleReset}
                    >
                        {t('explore.filters.reset')}
                    </button>

                    <button
                        type="button"
                        className={styles.applyButton}
                        onClick={handleApply}
                    >
                        {t('explore.filters.apply')}
                    </button>
                </div>
            </div>
        </Modal>
    );
}