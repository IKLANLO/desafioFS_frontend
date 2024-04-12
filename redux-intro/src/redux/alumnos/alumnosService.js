import axios from 'axios'

const API_URL = 'http://localhost:8080/alumnos'

const register = async (userData) => {
  const res = await axios.post(`${API_URL}/create`, userData)
  return res.data
}
const login = async (userData) => {
  const res = await axios.put(`${API_URL}/login`, userData)
  if (res.data) {
    res.data
    localStorage.setItem('alumno', JSON.stringify(res.data.alumno))
    localStorage.setItem('tokenAlumno', JSON.stringify(res.data.token))
  }
  return res.data
  }
  
const alumnosService = {
  register, login
}

export default alumnosService