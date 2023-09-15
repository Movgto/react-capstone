import { configureStore } from "@reduxjs/toolkit";
import genreSlice from "../slices/genreSlice";
import searchSlice from "../slices/searchSlice";

const store = configureStore({
  reducer: {
    genre: genreSlice,
    search: searchSlice
  }
});

export default store;