import axios from 'axios'

const API_URL = 'http://localhost:8080/empresas'

const register = async (userData) => {
  const checkEmail = await axios.get(
    'http://localhost:8080/alumnos/getByEmail',
    userData.Email
  )
  console.log('check', checkEmail.data, userData.Email)
  if (checkEmail === null) return

  const res = await axios.post(`${API_URL}/create`, userData)
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
  register, login
}

export default organismosService
