import axios from 'axios'

const API_URL = 'http://localhost:8080'

const register = async (userData) => {
  const checkEmail = await axios.get(
    `${API_URL}/alumnos/getByEmail`,
    userData.Email
  )
  if (checkEmail === null) return
  const res = await axios.post(`${API_URL}/empresas/create`, userData)
  return res.data
}

const getProyects = async (proyectId) => {
  const res = await axios.get(
    `${API_URL}/proyectos/getByIdEmpresa/${proyectId}`
  )
  return res.data
}

const organismosService = {
  register,
  getProyects,
}

export default organismosService
