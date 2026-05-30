import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchCommentsForThread,
  postComment,
  upvoteComment,
  downvoteComment,
} from "../services/commentService";
import { handleApiError } from "../utils/handleApiError";

const initialState = {
  comments: [],
  loading: false,
  error: null,
};

export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async (threadId, { rejectWithValue }) => {
    try {
      return await fetchCommentsForThread(threadId);
    } catch (err) {
      return rejectWithValue(handleApiError(err));
    }
  },
);

export const addComment = createAsyncThunk(
  "comments/addComment",
  async ({ threadId, content }, { rejectWithValue }) => {
    try {
      return await postComment({ threadId, content });
    } catch (err) {
      return rejectWithValue(handleApiError(err));
    }
  },
);

export const upvoteCommentThunk = createAsyncThunk(
  "comments/upvote",
  async (commentId, { rejectWithValue }) => {
    try {
      return await upvoteComment(commentId);
    } catch (err) {
      return rejectWithValue(handleApiError(err));
    }
  },
);

export const downvoteCommentThunk = createAsyncThunk(
  "comments/downvote",
  async (commentId, { rejectWithValue }) => {
    try {
      return await downvoteComment(commentId);
    } catch (err) {
      return rejectWithValue(handleApiError(err));
    }
  },
);

const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    clearComments: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // fetchComments
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // addComment
      .addCase(addComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comments.push(action.payload);
      })
      .addCase(addComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // upvoteCommentThunk
      .addCase(upvoteCommentThunk.pending, (state) => {
        state.error = null;
      })
      .addCase(upvoteCommentThunk.fulfilled, (state, action) => {
        const idx = state.comments.findIndex((c) => c._id === action.payload._id);
        if (idx !== -1) state.comments[idx] = action.payload;
      })
      .addCase(upvoteCommentThunk.rejected, (state, action) => {
        state.error = action.payload;
      })
      // downvoteCommentThunk
      .addCase(downvoteCommentThunk.pending, (state) => {
        state.error = null;
      })
      .addCase(downvoteCommentThunk.fulfilled, (state, action) => {
        const idx = state.comments.findIndex((c) => c._id === action.payload._id);
        if (idx !== -1) state.comments[idx] = action.payload;
      })
      .addCase(downvoteCommentThunk.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default commentSlice.reducer;
export const { clearComments } = commentSlice.actions;
