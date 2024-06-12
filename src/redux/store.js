import { configureStore } from '@reduxjs/toolkit'
import audioReducer from './audioSlice'

export default configureStore({
  reducer:{
    audio: audioReducer,
  }
})