import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import organismosService from './organismosService'

const organismo = JSON.parse(localStorage.getItem('organismo'))
const token = JSON.parse(localStorage.getItem('tokenOrg'))

const initialState = {
  organismo: organismo || null,
  token: token || null,
  message: '',
  isError: false,
  isSuccess: false,
  proyectos: [],
  proyecto: {},
  tutores: [],
  tutor: {},
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
export const login = createAsyncThunk('organ/login', async (org) => {
  try {
    return await organismosService.login(org)
  } catch (error) {
    console.error(error)
  }
})

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

export const getTutores = createAsyncThunk(
  'organ/getTutores',
  async (IdEmpresa) => {
    try {
      return await organismosService.getTutores(IdEmpresa)
    } catch (error) {
      console.log(error)
      // const message = error.response.data.message
      // return thunkAPI.rejectWithValue(message)
    }
  }
)

export const addTutor = createAsyncThunk('organ/addTutor', async (data) => {
  try {
    return await organismosService.addTutor(data)
  } catch (error) {
    console.log(error)
  }
})

export const cancelProyecto = createAsyncThunk(
  'organ/cancelProyecto',
  async (id) => {
    try {
      return await organismosService.cancelProyecto(id)
    } catch (error) {
      console.log(error)
    }
  }
)

export const addProyecto = createAsyncThunk(
  'organ/addProyecto',
  async (data) => {
    try {
      return await organismosService.addProyecto(data)
    } catch (error) {
      console.log(error)
    }
  }
)

export const organismosSlice = createSlice({
  name: 'organ',
  initialState,
  reducers: {
    reset: (state) => {
      state.organismo = null
      state.token = null
      state.message = ''
      state.isError = false
      state.isSuccess = false
    },
    updateProyect: (state, action) => {
      const { IdProyecto, IdTutor } = action.payload
      const index = state.proyectos.findIndex(
        (proyecto) => proyecto._id === IdProyecto
      )
      if (index !== -1) {
        state.proyectos[index] = { ...state.proyectos[index], IdTutor }
      }
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
        state.message = action.payload.message
      })
      .addCase(getProyects.fulfilled, (state, action) => {
        // state.isSuccess = true
        // state.message = action.payload.message
        state.proyectos = action.payload
        state.organismo.IdProyecto = action.payload._id
      })
      .addCase(getProyects.rejected, (state, action) => {
        state.isError = true
        state.message = action.payload.message
      })
      .addCase(login.fulfilled, (state, action) => {
        state.organismo = action.payload.organismo
        state.token = action.payload.token
        state.isSuccess = true
        state.message = action.payload.message
      })
      .addCase(login.rejected, (state, action) => {
        state.isError = true
        state.message = action.payload.message
      })
      .addCase(getTutores.fulfilled, (state, action) => {
        // state.isSuccess = true
        // state.message = action.payload.message
        state.tutores = action.payload
      })
      .addCase(addProyecto.fulfilled, (state, action) => {
        console.log('action.payload', action.payload)
        state.proyectos.push(action.payload)
      })
  },
})

export const { reset, updateProyect } = organismosSlice.actions

export default organismosSlice.reducer
