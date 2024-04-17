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
  proyectos: [], // Agrega el estado para almacenar los proyectos
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


export const login = createAsyncThunk(
  "alum/login", 
  async (alu, thunkAPI) => {
    try {
      return await alumnosService.login(alu);
  } catch (error) {
      return thunkAPI.rejectWithValue(message)
  }
}
)
export const getProyects = createAsyncThunk(
  'alum/getProyects',
  async (Sector, thunkAPI) => {
    try {
      return await alumnosService.getProyects(Sector)
    } catch (error) {
      console.log(error)
      const message = error.response.data.message
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const addSolicitud = createAsyncThunk('alum/addSolicitud', async (data) => {
  try {
    return await alumnosService.addSolicitud(data)
  } catch (error) {
    console.log(error)
    throw error; // Re-throw the error so that it can be handled in the extraReducers
  }
})

export const logout = createAsyncThunk("alum/logout", async () => {
  try {
    return await alumnosService.logout();
  } catch (error) {
    console.error(error);
  }
});
export const updateUser = createAsyncThunk(
  'alum/updateUser',
  async (alumno, thunkAPI) => {
    try {

      const response = await alumnosService.updateUser(alumno);
      console.log(response.data)
      return response.data; 
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const alumnosSlice = createSlice({
  name: 'alum',
  initialState,
  reducers: {
    reset: (state) => {
      state.message = ''
      state.isError = false
      state.isSuccess = false
    },
    updateProyectos: (state, action) => {
      state.proyectos = action.payload; // Actualiza la lista de proyectos en el estado global
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
        state.message = "Error en el registro"
      })
      .addCase(login.fulfilled, (state, action) => {
        state.alumno = action.payload.alumno
        state.token = action.payload.alumno.Token
        state.isSuccess = true
        state.message = action.payload.message
      })
      .addCase(login.rejected, (state, action) => {
        state.isError = true
        state.message = "error al logearte"
      })
      .addCase(logout.fulfilled, (state) => {
        state.alumno = null
        state.token = null
      })
      .addCase(getProyects.fulfilled, (state, action) => {
        state.proyectos = action.payload;
        const firstProject = action.payload[0]; // Obtén el primer proyecto del array
        if (firstProject) {
          state.alumno.Sector = firstProject.Sector; // Accede al campo Sector del primer proyecto
        }
      })
      .addCase(getProyects.rejected, (state, action) => {
        state.isError = true
        state.message = action.payload.message
      })
      .addCase(addSolicitud.fulfilled, (state, action) => {
        state.isSuccess = true
        state.message = 'Solicitud enviada correctamente'
        // Actualiza la lista de proyectos después de enviar la solicitud
        state.proyectos = action.payload.proyectos;
      })
      .addCase(addSolicitud.rejected, (state, action) => {
        state.isError = true
        state.message = 'Error al enviar la solicitud'
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        
        state.alumno = action.payload;
        console.log(state.alumno)
        console.log(actio.payload)
        state.isSuccess = true;
        localStorage.setItem('alumno', JSON.stringify(action.payload));
      })
      .addCase(updateUser.rejected, (state, action) => {
        
        state.isError = true;
        state.message = action.payload;
      });

  },
})

export const { reset, updateProyectos } = alumnosSlice.actions

export default alumnosSlice.reducer
