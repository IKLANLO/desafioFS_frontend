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
  const res = await axios.put(`${API_URL}/empresas/login`, userData)
  if (res.data) {
    localStorage.setItem('organismo', JSON.stringify(res.data.empresa))
    localStorage.setItem('tokenOrg', JSON.stringify(res.data.empresa.Token))
  }
  return res.data
}

const getTutores = async (IdEmpresa) => {
  const res = await axios.get(`${API_URL}/tutores/getByIdEmpresa/${IdEmpresa}`)
  if (res.data) {
    localStorage.setItem('tutoresEmp', JSON.stringify(res.data.tutores))
  }
  return res.data
}

const addTutor = async (data) => {
  const res = await axios.put(
    `${API_URL}/proyectos/addTutor/${data.IdProyecto}`,
    { IdTutor: data.IdTutor }
  )
  return res.data
}

const cancelProyecto = async (id) => {
  const res = await axios.put(`${API_URL}/proyectos/cancelById/${id}`)
  return res.data
}

const addProyecto = async (data) => {
  const res = await axios.post(
    `${API_URL}/proyectos/create/${data.IdEmpresa}`,
    data.proyecto,
    { headers: { Authorization: data.Token } }
  )
  return res.data
}

const organismosService = {
  register,
  getProyects,
  login,
  getTutores,
  addTutor,
  cancelProyecto,
  addProyecto,
}

export default organismosService
