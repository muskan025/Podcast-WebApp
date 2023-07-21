import {createSlice } from "@reduxjs/toolkit";

const initialState = {
  podcasts: [],
};

const podcastSlice = createSlice({
  name: "podcasts",
  initialState,
  reducers: {
    setPodcasts: (state, action) => {
      state.podcasts = action.payload;
    },
    cleanPodcast: (state) => {
      state.podcasts = null;
    },
  },
});

export const { setPodcasts, cleanPodcast } = podcastSlice.actions;
export default podcastSlice.reducer;
