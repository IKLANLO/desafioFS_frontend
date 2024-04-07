import { configureStore } from '@reduxjs/toolkit'
import alum from '../redux/alumnos/alumnosSlice'
import organ from '../redux/organismos/organismosSlice'

export const store = configureStore({
  reducer: { alum, organ },
})
