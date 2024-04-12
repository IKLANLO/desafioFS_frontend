import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import alumnosService from './alumnosService'

const alumno = JSON.parse(localStorage.getItem('alumno'))
const token = JSON.parse(localStorage.getItem('tokenAlumno'))

const initialState = {
  alumno: alumno || null,
  token: token || null,
  message: '',
  isError: false,
  isSuccess: false,
}

export const register = createAsyncThunk(
  'alum/register',
  async (alumno, thunkAPI) => {
    try {
      return await alumnosService.register(alumno)
    } catch (error) {
      console.log(error)
      const message = error.response.data.message
      return thunkAPI.rejectWithValue(message)
    }
  }
)


export const login = createAsyncThunk("alum/login", async (alu, thunkAPI) => {
try {
  console.log(alu)
    return await alumnosService.login(alu);
  
  } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(message)
  }
});

export const alumnosSlice = createSlice({
  name: 'alum',
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
      .addCase(login.fulfilled, (state, action) => {
        console.log(action.payload)
        state.alumno = action.payload.alumno
        state.token = action.payload.alumno.Token
        console.log(action.payload.alumno.Token)
      })
  },
})

export const { reset } = alumnosSlice.actions

export default alumnosSlice.reducer
