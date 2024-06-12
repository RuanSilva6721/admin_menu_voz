import { createSlice } from '@reduxjs/toolkit'

export const slice = createSlice({
  name: 'audio',
  initialState: {
    isPlaying: true
  },
  reducers: {
    play(state) {
      return { ...state, isPlaying: true };
    },
    pause(state) {
      return { ...state, isPlaying: false };
    },
    setVolume(state, action) {
      return { ...state, volume: action.payload };
    }
  }
});

export const { play, pause, setVolume } = slice.actions;

export const selectAudio = state => state.audio;

export default slice.reducer;
