import {useEffect, useState} from 'react';
import {Search} from 'lucide-react';
import {useDebounce} from '../../../shared/lib/useDebounce';
import styles from './ExploreSearch.module.css';
import {useTranslation} from 'react-i18next';

interface ExploreSearchProps {
    value: string;
    onChange: (value: string) => void;
}

export function ExploreSearch({value, onChange}: ExploreSearchProps) {
    const [searchValue, setSearchValue] = useState(value);

    const debouncedSearch = useDebounce(searchValue, 500);
    const {t} = useTranslation();

    useEffect(() => {
        if (debouncedSearch !== value) {
            onChange(debouncedSearch);
        }
    }, [
        debouncedSearch,
        value,
        onChange,
    ]);

    return (
        <div className={styles.search}>
            <Search
                size={18}
                className={styles.searchIcon}
            />

            <input
                type="search"
                value={searchValue}
                onChange={(event) =>
                    setSearchValue(event.target.value)
                }
                placeholder={t('explore.searchPlaceholder')}
            />
        </div>
    );
}