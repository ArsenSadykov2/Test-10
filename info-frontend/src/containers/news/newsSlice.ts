import {News} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store.ts";
import {createNews, deleteNews, fetchAllNews, fetchNewsById} from "./newsThunks.ts";

interface NewsState {
    items: News[];
    item: News | null;
    fetchLoading: boolean;
    createLoading: boolean;
    deleteLoading: boolean;
}

const initialState: NewsState = {
    items: [],
    item: null,
    fetchLoading: false,
    createLoading: false,
    deleteLoading: false,
};

export const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllNews.pending, (state) => {
                state.fetchLoading = true;
            })
            .addCase(fetchAllNews.fulfilled, (state, {payload: news}) => {
                state.items = news;
                state.fetchLoading = false;
            })

            .addCase(fetchNewsById.pending, (state) => {
                state.fetchLoading = true;
            })
            .addCase(fetchNewsById.fulfilled, (state, {payload: news}) => {
                state.item = news;
                state.fetchLoading = false;
            })

            .addCase(createNews.pending, (state) => {
                state.createLoading = true;
            })
            .addCase(createNews.fulfilled, (state) => {
                state.createLoading = false;
            })
            .addCase(createNews.rejected, (state) => {
                state.createLoading = false;
            })

            .addCase(deleteNews.pending, (state) => {
                state.deleteLoading = true;
            })
            .addCase(deleteNews.fulfilled, (state, action) => {
                state.deleteLoading = false;
                state.items = state.items.filter(news => news.id !== action.meta.arg);
            })
            .addCase(deleteNews.rejected, (state) => {
                state.deleteLoading = false;
            })
    }
});

export const newsReducer = newsSlice.reducer;

export const selectNews = (state: RootState) => state.news.items;
export const selectOneNews = (state: RootState) => state.news.item;
export const selectNewsLoading = (state: RootState) => state.news.fetchLoading;
export const selectNewsDelete = (state: RootState) => state.news.deleteLoading;
