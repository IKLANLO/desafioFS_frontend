import axios from 'axios'

const API_URL = 'http://localhost:8080/alumnos'

const register = async (userData) => {
  const res = await axios.post(`${API_URL}/create`, userData)
  return res.data
}
const login = async (userData) => {
  const res = await axios.put(`${API_URL}/login`, userData)
  if (res.data) {
    localStorage.setItem('alumno', JSON.stringify(res.data.alumno))
    localStorage.setItem('tokenAlumno', JSON.stringify(res.data.alumno.Token))
  }
  return res.data
}

//REPASAR ESTO
const logout = async (token) => {
  // const token = JSON.parse(localStorage.getItem("tokenAlumno"));
  const res = await axios.put(
    `${API_URL}/logout`,
    { Token: '' },
    {
      headers: {
        authorization: token,
      },
    }
  )

  if (res.data) {
    localStorage.clear()
  }
  return res.data
}

const getProyects = async (Sector) => {
  const res = await axios.get(
    `http://localhost:8080/proyectos/getAllBySector/${Sector}`
  )
  return res.data
}
const addSolicitud = async (data) => {
  try {
    const res = await axios.put(
      `http://localhost:8080/proyectos/addSolicitud/${data.IdProyecto}`,
      {
        _id: data._id,
      }
    )
    return res.data
  } catch (error) {
    console.error('Error en la solicitud:', error)
    throw error
  }
}

const getProyectsByEmail = async (data) => {
  try {
    const res = await axios.get(
      `http://localhost:8080/proyectos/getByEmailAlumno`,
      {
        params: {
          Email: data,
        },
      }
    )
    return res.data
  } catch (error) {
    console.error('Error en la solicitud:', error)
    throw error
  }
}

const updateUser = async (userId, userData) => {
  try {
    const res = await axios.put(`${API_URL}/update/${userId}`, userData)
    return res.data
  } catch (error) {
    console.error('Error al actualizar usuario:', error)
    throw error
  }
}

const getEmpresas = async () => {
  const res = await axios.get(`http://localhost:8080/empresas`)
  return res.data
}

const alumnosService = {
  register,
  login,
  logout,
  getProyects,
  addSolicitud,
  updateUser,
  getEmpresas,
  getProyectsByEmail,
}

export default alumnosService
