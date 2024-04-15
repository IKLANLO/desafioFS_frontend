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
const logout = async () => {

  const token = JSON.parse(localStorage.getItem("tokenAlumno"));
  const res = await axios.delete(`${API_URL}/logout`, {
  headers: {
    authorization: token,
  },
  });

  if (res.data) {
    console.log(res.data)
    localStorage.clear();
  }
  return res.data;
  };


  const getProyects = async (Sector) => {
    const res = await axios.get(
      `http://localhost:8080/proyectos/getAllBySector/${Sector}`
    );
    return res.data;
  };
  
  

const alumnosService = {
  register,
  login,
  logout,
  getProyects
}

export default alumnosService
