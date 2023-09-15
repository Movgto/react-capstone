import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
  data: [],
  current: null,
  error: null
};

export const byGenre = createAsyncThunk("search/byGenre", async ({ id, page }) => {
  try {
    const API_URL = `https://api.jikan.moe/v4/anime?genres=${id}&page=${page}`;
    console.log(API_URL);
    console.log(id);
    const response = await axios.get(API_URL);
    console.log(response.data);
    return response.data
  } catch (err) {
    console.error(err.message);
    return err.message;
  }
});

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setGenre: (state, { payload }) => {
      state.current = payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(byGenre.fulfilled, (state, { payload }) => {
        state.data = payload;
      })
  }
});

export const { setGenre } = searchSlice.actions;

export default searchSlice.reducer;