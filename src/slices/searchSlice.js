import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  data: [],
  current: null,
  loading: true,
  error: null,
};

export const byGenre = createAsyncThunk('search/byGenre', async ({ id, page }, { rejectWithValue }) => {
  try {
    const API_URL = `https://api.jikan.moe/v4/anime?genres=${id}&page=${page}`;
    const response = await axios.get(API_URL);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setGenre: (state, { payload }) => {
      state.current = payload;
    },
    cleanData: (state) => {
      state.data = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(byGenre.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data = payload;
      })
      .addCase(byGenre.pending, (state) => {
        state.loading = true;
      })
      .addCase(byGenre.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const { setGenre, cleanData } = searchSlice.actions;

export default searchSlice.reducer;
