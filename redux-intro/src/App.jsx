import { BrowserRouter, Route, Routes } from 'react-router-dom'
import TheHeader from './components/TheHeader/TheHeader'
import Register from './components/Register/Register'
import RegisterAlum from './components/Register/RegisterAlum/RegisterAlum'
import RegisterOrg from './components/Register/RegisterOrg/RegisterOrg'
import Profile from './components/Profile/Profile'
import './App.scss'
// import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <BrowserRouter>
      <TheHeader />
      <Routes>
        {/* <Route path="/home" element={<Home />} /> */}
        <Route path="/register" element={<Register />} />
        <Route path="/register/alumnos" element={<RegisterAlum />} />
        <Route path="/register/organismos" element={<RegisterOrg />} />
        <Route path="/profile" element={<Profile/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
