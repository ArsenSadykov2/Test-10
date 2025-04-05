
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store.ts";
import {
    createComment,
    fetchAllComments,
    fetchCommentById,
} from "./commentsThunks.ts";
import {Comment} from "../../types";

interface CommentsSlice {
    items: Comment[];
    item: Comment | null;
    fetchLoading: boolean;
    createLoading: boolean;
}

const initialState: CommentsSlice = {
    items: [],
    item: null,
    fetchLoading: false,
    createLoading: false,
};

export const commentsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllComments.pending, (state) => {
                state.fetchLoading = true;
            })
            .addCase(fetchAllComments.fulfilled, (state, {payload: comments}) => {
                state.items = comments;
                state.fetchLoading = false;
            })

            .addCase(fetchCommentById.pending, (state) => {
                state.fetchLoading = true;
            })
            .addCase(fetchCommentById.fulfilled, (state, {payload: comments}) => {
                state.item = comments;
                state.fetchLoading = false;
            })

            .addCase(createComment.pending, (state) => {
                state.createLoading = true;
            })
            .addCase(createComment.fulfilled, (state) => {
                state.createLoading = false;
            })
            .addCase(createComment.rejected, (state) => {
                state.createLoading = false;
            })
    }
});

export const commentReducer = commentsSlice.reducer;

export const selectComments = (state: RootState) => state.news.items;
export const selectOneComment = (state: RootState) => state.news.item;
export const selectCommentLoading = (state: RootState) => state.news.fetchLoading;