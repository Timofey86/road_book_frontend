export interface CommentAuthor {
    id: number;
    name: string;
    avatarUrl: string | null;
}

export interface Comment {
    id: number;
    routeId: number;
    body: string;
    author: CommentAuthor;
    createdAt: string;
    updatedAt: string;
}