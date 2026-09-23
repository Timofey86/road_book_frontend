import {useQuery} from '@tanstack/react-query';
import {MessageCircle} from 'lucide-react';
import styles from './RouteDetailsPage.module.css';
import {commentsQueryOptions} from "../../../entities/comment";
import {CreateRouteCommentForm} from "../../../features/create-route-comment";
import {RouteComment} from "./RouteComment.tsx";
import {useState} from "react";
import {Pagination} from "../../../shared/ui/pagination";
import {useTranslation} from 'react-i18next';
import {AuthRequiredModal} from "../../../features/auth-required-modal";

interface RouteCommentsProps {
    routeId: number;
    currentUserId: number | null;
}

export function RouteComments({routeId, currentUserId}: RouteCommentsProps) {
    const [page, setPage] = useState(1);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const {t} = useTranslation();
    const {
        data,
        isPending,
        isError,
    } = useQuery(
        commentsQueryOptions(routeId, page),
    );


    if (isPending) {
        return <div>{t('routeDetails.comments.loading')}</div>;
    }

    if (isError) {
        return <div>{t('routeDetails.comments.loadError')}</div>;
    }


    return (
        <>
        <div className={styles.comments}>
            {currentUserId !== null ? (
                <CreateRouteCommentForm
                    routeId={routeId}
                />
            ) : (
                <button
                    type="button"
                    className={styles.guestCommentButton}
                    onClick={() => setIsAuthModalOpen(true)}
                >
                    <MessageCircle size={18}/>
                    {t('leaveComment')}
                </button>
            )}


            {data.meta.totalItems === 0 ? (
                <div className={styles.emptyComments}>
                    <div className={styles.emptyCommentsIcon}>
                        <MessageCircle size={24}/>
                    </div>

                    <h2>{t('routeDetails.comments.emptyTitle')}</h2>

                    <p>
                        {t('routeDetails.comments.emptyDescription')}
                    </p>
                </div>
            ) : (
                <section className={styles.commentsSection}>
                    <div className={styles.sectionHeading}>
                        <span>{t('routeDetails.comments.community')}</span>
                        <h2>{t('routeDetails.comments.title')}</h2>
                    </div>

                    <div className={styles.commentsList}>
                        {data.items.map((comment) => (
                            <RouteComment
                                key={comment.id}
                                comment={comment}
                                routeId={routeId}
                                isOwner={comment.author.id === currentUserId}
                                onDeleted={() => {
                                    if (
                                        data.items.length === 1 &&
                                        page > 1
                                    ) {
                                        setPage((current) => current - 1);
                                    }
                                }}
                            />
                        ))}
                    </div>
                    <Pagination
                        page={data.meta.page}
                        totalPages={data.meta.totalPages}
                        onPageChange={setPage}
                    />
                </section>
            )}
        </div>
            <AuthRequiredModal
                open={isAuthModalOpen}
                onClose={() => setIsAuthModalOpen(false)}
                description={t('authRequired.comment')}
            />
        </>
    );
}