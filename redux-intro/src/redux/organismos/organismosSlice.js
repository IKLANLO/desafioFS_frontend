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

export const logout = createAsyncThunk('organ/logout', async (token) => {
  try {
    return await organismosService.logout(token)
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

export const confirmAlumno = createAsyncThunk(
  'organ/confirmAlumno',
  async (data) => {
    try {
      return await organismosService.confirmAlumno(
        data.IdProyecto,
        data.IdAlumno
      )
    } catch (error) {
      console.log(error)
    }
  }
)

export const createTutor = createAsyncThunk(
  'organ/createTutor',
  async (data, thunkAPI) => {
    try {
      return await organismosService.createTutor(data)
    } catch (error) {
      console.log(error, thunkAPI)
      // return thunkAPI.rejectWithValue(message)
      return thunkAPI.rejectWithValue(message)
    }
  }
)
export const updateOrgan = createAsyncThunk(
  'organ/updateOrgan',
  async ({ orgId, orgData }, thunkAPI) => {
    console.log(orgId, orgData);
    try {
      const response = await organismosService.updateOrgan(orgId, orgData);
      console.log(response);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const organismosSlice = createSlice({
  name: 'organ',
  initialState,
  reducers: {
    reset: (state) => {
      // state.organismo = null
      // state.token = null
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
        state.message = 'login correcto'
      })
      .addCase(login.rejected, (state, action) => {
        state.isError = true
        state.message = 'error al logearte'
      })
      .addCase(getTutores.fulfilled, (state, action) => {
        // state.isSuccess = true
        // state.message = action.payload.message
        state.tutores = action.payload
      })
      .addCase(addProyecto.fulfilled, (state, action) => {
        state.proyectos.push(action.payload)
      })
      .addCase(confirmAlumno.fulfilled, (state, action) => {
        state.proyectos.map((proy, index) => {
          if (proy._id === action.payload.proyecto.IdProyecto) {
            state.proyectos[index].IdAlumno.push(action.payload.proyecto)
          }
        })
      })
      .addCase(logout.fulfilled, (state) => {
        state.organismo = null
        state.token = null
      })
      .addCase(createTutor.fulfilled, (state, action) => {
        state.tutores.push(action.payload.tutor)
        state.isSuccess = true
        state.message = 'Tutor creado correctamente'
      })
      .addCase(createTutor.rejected, (state, action) => {
        state.isError = true
        state.message = 'Error en los datos'
      })
      .addCase(updateOrgan.fulfilled, (state, action) => {
        state.organismo = action.payload.organismo; 
        state.isSuccess = true; 
        state.message = action.payload.message; 
      
        localStorage.setItem('organismo', JSON.stringify(action.payload.organismo));
      })
      .addCase(updateOrgan.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = 'Error al actualizar el perfil del alumno';
      });

  },
})

export const { reset, updateProyect } = organismosSlice.actions

export default organismosSlice.reducer
