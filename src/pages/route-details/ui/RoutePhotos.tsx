import {useState} from 'react';
import Lightbox from 'yet-another-react-lightbox';
import Captions from 'yet-another-react-lightbox/plugins/captions';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/captions.css';
import type {RoutePhoto} from '../../../entities/route';
import styles from './RouteDetailsPage.module.css';
import {Image} from 'lucide-react';
import {useTranslation} from 'react-i18next';

interface RoutePhotosProps {
    photos: RoutePhoto[];
    routeTitle: string;
}

export function RoutePhotos({
    photos,
    routeTitle,
}: RoutePhotosProps) {
    const [photoIndex, setPhotoIndex] = useState(-1);
    const {t} = useTranslation();

    const sortedPhotos = photos.toSorted(
        (a, b) => a.position - b.position,
    );

    if (sortedPhotos.length === 0) {
        return (
            <div className={styles.emptyPhotos}>
                <div className={styles.emptyPhotosIcon}>
                    <Image size={24}/>
                </div>

                <h2>{t('routeDetails.photos.emptyTitle')}</h2>

                <p>
                    {t('routeDetails.photos.emptyDescription')}
                </p>
            </div>
        );
    }

    return (
        <>
            <section className={styles.photosSection}>
                <div className={styles.sectionHeading}>
                    <span>{t('routeDetails.photos.gallery')}</span>
                    <h2>{t('routeDetails.photos.title')}</h2>
                </div>

                <div className={styles.photosGrid}>
                    {sortedPhotos.map((photo, index) => (
                        <figure
                            key={photo.id}
                            className={styles.photoCard}
                            onClick={() => setPhotoIndex(index)}
                        >
                            <img
                                src={photo.url}
                                alt={photo.caption ??
                                    t('routeDetails.photos.imageAlt', {
                                        title: routeTitle,
                                    })}
                            />

                            {photo.caption && (
                                <figcaption>
                                    {photo.caption}
                                </figcaption>
                            )}
                        </figure>
                    ))}
                </div>
            </section>

            <Lightbox
                open={photoIndex >= 0}
                close={() => setPhotoIndex(-1)}
                index={photoIndex}
                plugins={[Captions]}
                captions={{
                    showToggle: true,
                    descriptionTextAlign: 'center',
                }}
                slides={sortedPhotos.map((photo) => ({
                    src: photo.url,
                    alt: photo.caption ??
                        t('routeDetails.photos.imageAlt', {
                            title: routeTitle,
                        }),
                    description: photo.caption ?? undefined,
                }))}
            />
        </>
    );
}