import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosAPI from "../../axiosApi.ts";
import {News, NewsMutation} from "../../types";

export const fetchAllComments = createAsyncThunk<Comment[], void>(
    'comments/fetchAllComments',
    async () => {
        const response = await axiosAPI.get<Comment[]>('/comments');
        return response.data;
    }
);

export const fetchCommentById = createAsyncThunk<News, string>(
    'comments/fetchCommentById',
    async (news_id) => {
        const response = await axiosAPI.get<News>('/comments/' + news_id);
        return response.data || null;
    }
);


export const createComment = createAsyncThunk<void, NewsMutation>(
    'comments/createComment',
    async (newsToAdd) => {
        const formData = new FormData();
        const keys = Object.keys(newsToAdd) as (keyof NewsMutation)[];

        keys.forEach(key => {
            const value = newsToAdd[key] as string;
            if (value !== null) {
                formData.append(key, value);
            }
        });

        await axiosAPI.post('/comments', formData);
    }
);

export const deleteComment = createAsyncThunk<void, string>(
    'comments/deleteComment',
    async (newsId, { rejectWithValue }) => {
        try {
            const checkResponse = await axiosAPI.get(`/news?news_id=${newsId}`);
            if (checkResponse.data.length > 0) {
                return rejectWithValue('Нельзя удалить новость с комментариями');
            }

            await axiosAPI.delete(`/comments/${newsId}`);
        } catch (error) {
            return rejectWithValue('Ошибка при удалении');
        }
    }
);