import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import alumnosService from './alumnosService';

const alumno = JSON.parse(localStorage.getItem('alumno'))
const token = JSON.parse(localStorage.getItem('token'))

const initialState = {
  alumno: alumno || null,
  token: token || null,
  message: ''
}

export const register = createAsyncThunk('alum/register', async (alumno, thunkAPI) => {
  try {
    return await alumnosService.register(alumno)
  } catch (error) {
    console.log(error)
    const message = error.response.data.message
    return thunkAPI.rejectWithValue(message)
  }
})

export const alumnosSlice = createSlice({
  name: 'alum',
  initialState,
  reducers: {
    reset: (state) => {
      state.message = ''
    //   state.isError = false
    //   state.isSuccess = false
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.message = action.payload.message
      })
  }
})

export const { reset } = alumnosSlice.actions

export default alumnosSlice.reducer