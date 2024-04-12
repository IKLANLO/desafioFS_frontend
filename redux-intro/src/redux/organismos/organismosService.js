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

const getProyects = async (idEmpresa) => {
  const res = await axios.get(
    `${API_URL}/proyectos/getByIdEmpresa/${idEmpresa}`
  )
  return res.data
}
const login = async (userData) => {
  const res = await axios.put(`${API_URL}/login`, userData)
  if (res.data) {
    localStorage.setItem('organ', JSON.stringify(res.data.org))
    localStorage.setItem('tokenOrg', JSON.stringify(res.data.token)) //REVISAR NOMBRE TOKEN
  }
  return res.data
}

const organismosService = {
  register,
  getProyects,
  login,
}

export default organismosService
