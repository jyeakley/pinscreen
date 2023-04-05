import { ClockPosition, Settings } from '@/types';
import { PayloadAction, Reducer, createSlice } from '@reduxjs/toolkit';

const FIRST_TIME_SETTINGS: Settings = {
  clockFormat: 'h:mm:ssa',
  clockFontFamily: 'arcade',
  clockFontSize: 12,
  clockPosition: 'center',
  clockColor: '#FFF',
  videoFadeInOutTime: 100,
  timeBetweenVideos: 5,
}

const settingsSlice = createSlice({
  name: 'settings',
  initialState: { value: FIRST_TIME_SETTINGS},
  reducers: {
    setClockFormat: (state, action: PayloadAction<string>) => {
      state.value.clockFormat = action.payload
    },
    setClockFontFamily: (state, action: PayloadAction<string>) => {
      state.value.clockFontFamily = action.payload
    },
    setClockFontSize: (state, action: PayloadAction<number>) => {
      state.value.clockFontSize = action.payload
    },
    setClockPosition: (state, action: PayloadAction<ClockPosition>) => {
      state.value.clockPosition = action.payload
    },
    setClockColor: (state, action: PayloadAction<string>) => {
      state.value.clockColor = action.payload
    },
    setVideoFadeInOutTime: (state, action: PayloadAction<number>) => {
      state.value.videoFadeInOutTime = action.payload
    },
    setTimeBetweenVideos: (state, action: PayloadAction<number>) => {
      state.value.timeBetweenVideos = action.payload
    },
  },
});

export const {
  setClockFormat,
  setClockFontFamily,
  setClockFontSize,
  setClockPosition,
  setClockColor,
  setVideoFadeInOutTime,
  setTimeBetweenVideos
} = settingsSlice.actions;

export const settings: Reducer<{
  value: Settings;
}> = settingsSlice.reducer