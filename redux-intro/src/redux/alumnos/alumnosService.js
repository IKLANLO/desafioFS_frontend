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
    console.log(res.data)
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
        _id: data._id, // Ajustamos el formato de los datos enviados
      }
    )
    console.log(res.data)
    return res.data
  } catch (error) {
    console.error('Error en la solicitud:', error)
    throw error // Propagamos el error para manejarlo en el lugar donde se llama a esta función
  }
}
const updateUser = async (userData) => {
  console.log(userData)
  const res = await axios.put(`${API_URL}/alumnos/${userData._id}`, userData)
  console.log(res.data)
  return res.data
}
const alumnosService = {
  register,
  login,
  logout,
  getProyects,
  addSolicitud,
  updateUser
}

export default alumnosService
