import styles from './PageLoader.module.css';

export function PageLoader() {
    return (
        <div className={styles.loaderWrap}>
            <span className={styles.loader} />
        </div>
    );
}