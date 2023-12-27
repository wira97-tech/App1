/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import Api from "../../lib/axios";

interface Thread {
  id: number;
  content: string;
  image: string | null;
}

interface ThreadsState {
  threads: Thread[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ThreadsState = {
  threads: [],
  status: "idle",
  error: null,
};

export const createThreadAsync = createAsyncThunk(
  "threads/createThread",
  async (newThread: Thread) => {
    const response = await Api.post("/thread", newThread);
    return response.data.data;
  }
);

const threadsSlice = createSlice({
  name: "threads",
  initialState,
  reducers: {
    threadsLoading: (state) => {
      state.status = "loading";
    },
    threadsReceived: (state, action: PayloadAction<Thread[]>) => {
      state.status = "succeeded";
      state.threads = action.payload;
    },
    threadsError: (state, action: PayloadAction<string>) => {
      state.status = "failed";
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createThreadAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createThreadAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.threads.push(action.payload);
      })
      .addCase(createThreadAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to create thread.";
      });
  },
});

export const { threadsLoading, threadsReceived, threadsError } =
  threadsSlice.actions;

export default threadsSlice.reducer;
