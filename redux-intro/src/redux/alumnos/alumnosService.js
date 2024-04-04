import axios from 'axios'

const API_URL = 'http://localhost:8080/alumnos'

const register = async (userData) => {
  const res = await axios.post(`${API_URL}/create`, userData)
  return res.data
}

const alumnosService = {
  register,
}

export default alumnosService