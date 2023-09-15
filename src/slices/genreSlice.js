import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
  data: [],
  input: ""
}

const API_URL = "https://api.jikan.moe/v4/genres/anime";

export const fetchData = createAsyncThunk("genre/fetchData", async () => {
  try {
    const response = await axios.get(API_URL);
    console.log(response.data);
    return response.data;
  } catch(err) {
    return err.message;
  }
})

const genreSlice = createSlice({
  name: "genre",
  initialState,
  reducers: {
    filter: (state, { payload }) => {
      state.input = payload;
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchData.fulfilled, (state, { payload }) => {
      state.data = payload.data;
    });
  }
})

export const { filter } = genreSlice.actions;
export default genreSlice.reducer;