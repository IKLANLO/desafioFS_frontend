import { configureStore } from '@reduxjs/toolkit';
import alum from '../redux/alumnos/alumnosSlice'

export const store = configureStore({
  reducer: {alum}
})