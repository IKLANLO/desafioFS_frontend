import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import organismosService from './organismosService'

const organismo = JSON.parse(localStorage.getItem('organismo'))
const token = JSON.parse(localStorage.getItem('tokenOrganismo'))

const initialState = {
  organismo: organismo || null,
  token: token || null,
  message: '',
  isError: false,
  isSuccess: false,
  proyectos: [],
}

export const register = createAsyncThunk(
  'organ/register',
  async (organismo, thunkAPI) => {
    try {
      return await organismosService.register(organismo)
    } catch (error) {
      console.log(error)
      const message = error.response.data.message
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const getProyects = createAsyncThunk(
  'organ/getProyects',
  async (id, thunkAPI) => {
    try {
      return await organismosService.getProyects(id)
    } catch (error) {
      console.log(error)
      const message = error.response.data.message
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const organismosSlice = createSlice({
  name: 'organ',
  initialState,
  reducers: {
    reset: (state) => {
      state.message = ''
      state.isError = false
      state.isSuccess = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.isSuccess = true
        state.message = action.payload.message
      })
      .addCase(register.rejected, (state, action) => {
        state.isError = true
        state.message = action.payload
      })
      .addCase(getProyects.fulfilled, (state, action) => {
        // state.isSuccess = true
        // state.message = action.payload.message
        state.proyectos = action.payload
      })
      .addCase(getProyects.rejected, (state, action) => {
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = organismosSlice.actions

export default organismosSlice.reducer
