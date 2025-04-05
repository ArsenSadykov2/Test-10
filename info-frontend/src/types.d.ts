export interface News {
    id: string;
    title: string;
    description: string;
    image?: File | null;
}

export interface NewsMutation {
    title: string;
    description: string;
    image?: File | null;
}

export interface Comment {
    id: number;
    news_id: number;
    author: string;
    comment: string;
}

export interface NewsForm {
    title: string;
    description: string;
    image?: File | null;
}
