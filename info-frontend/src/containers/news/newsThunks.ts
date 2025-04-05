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

export const deleteNews = createAsyncThunk<void, News> {
    'news/deleteNews',
        async (newsToDelete) => {

        }
}