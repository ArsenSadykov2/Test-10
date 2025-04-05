export interface News {
    id: number;
    title: string;
    description: string;
    image: string | null;
    created_at?: string;
}

export type NewsMutation = Omit<News, 'description'>;

export interface NewsWithoutId {
    title: string;
    description: string;
    image: string | null;
    created_at?: string;
}

export interface Comment {
    id: number;
    news_id: number;
    author: string;
    comment: string;
}

export interface CommentWithoutId {
    news_id: number;
    author: string;
    comment: string;
}

export interface DeleteId {
    id: number;
}