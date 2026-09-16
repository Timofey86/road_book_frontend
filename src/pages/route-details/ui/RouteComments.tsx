import {useQuery} from '@tanstack/react-query';
import {MessageCircle} from 'lucide-react';
import styles from './RouteDetailsPage.module.css';
import {commentsQueryOptions} from "../../../entities/comment";
import {CreateRouteCommentForm} from "../../../features/create-route-comment";
import {RouteComment} from "./RouteComment.tsx";
import {useState} from "react";
import {Pagination} from "../../../shared/ui/pagination";

interface RouteCommentsProps {
    routeId: number;
    currentUserId: number | null;
}

export function RouteComments({routeId, currentUserId}: RouteCommentsProps) {
    const [page, setPage] = useState(1);
    const {
        data,
        isPending,
        isError,
    } = useQuery(
        commentsQueryOptions(routeId, page),
    );


    if (isPending) {
        return <div>Loading comments...</div>;
    }

    if (isError) {
        return <div>Failed to load comments.</div>;
    }


    return (
        <div className={styles.comments}>
            {currentUserId !== null && (
                <CreateRouteCommentForm
                    routeId={routeId}
                />
            )}

            {data.meta.totalItems === 0 ? (
                <div className={styles.emptyComments}>
                    <div className={styles.emptyCommentsIcon}>
                        <MessageCircle size={24}/>
                    </div>

                    <h2>No comments yet</h2>

                    <p>
                        Be the first to share your thoughts
                        about this route.
                    </p>
                </div>
            ) : (
                <section className={styles.commentsSection}>
                    <div className={styles.sectionHeading}>
                        <span>COMMUNITY</span>
                        <h2>Comments</h2>
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
    );
}