import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosAPI from "../../axiosApi.ts";
import {News, NewsMutation} from "../../types";

export const fetchAllNews = createAsyncThunk<News[], void>(
    'news/fetchAllNews',
    async () => {
        const response = await axiosAPI.get<News[]>('/news');
        return response.data;
    }
);

export const fetchNewsById = createAsyncThunk<News, string>(
    'news/fetchNewsById',
    async (news_id) => {
        const response = await axiosAPI.get<News>('/news/' + news_id);
        return response.data || null;
    }
);


export const createNews = createAsyncThunk<void, NewsMutation>(
    'news/createNews',
    async (newsToAdd) => {
        const formData = new FormData();
        const keys = Object.keys(newsToAdd) as (keyof NewsMutation)[];

        keys.forEach(key => {
            const value = newsToAdd[key] as string;
            if (value !== null) {
                formData.append(key, value);
            }
        });

        await axiosAPI.post('/news', formData);
    }
);

export const deleteNews = createAsyncThunk<void, string>(
    'news/deleteNews',
    async (newsId, { rejectWithValue }) => {
        try {
            const checkResponse = await axiosAPI.get(`/comments?news_id=${newsId}`);
            if (checkResponse.data.length > 0) {
                return rejectWithValue('Нельзя удалить новость с комментариями');
            }

            await axiosAPI.delete(`/news/${newsId}`);
        } catch (error) {
            return rejectWithValue('Ошибка при удалении');
        }
    }
);