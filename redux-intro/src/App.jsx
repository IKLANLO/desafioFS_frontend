import { BrowserRouter, Route, Routes } from 'react-router-dom'
import TheHeader from './components/TheHeader/TheHeader'
import Register from './components/Register/Register'
import RegisterAlum from './components/Register/RegisterAlum/RegisterAlum'
import RegisterOrg from './components/Register/RegisterOrg/RegisterOrg'
import ProyectListOrganismos from './components/ProyectList/ProyectListOrganismos'
import Profile from './components/Profile/Profile'
import './App.scss'
import TheLogin from './components/Login/TheLogin'
import Inicio from './components/Inicio/Inicio'
import LandingPage from './components/LandingPage/LandingPage'
import ProfileOrg from './components/ProfileOrg/ProfileOrg'
import Retos from './components/Retos/Retos'
import ProyectListAlumnos from './components/ProyectList/ProyectListAlumnos/ProyectListAlumnos'
import FAQ from './components/FAQ/FAQ'

function App() {
  return (
    <BrowserRouter>
      <TheHeader />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/Inicio" element={<Inicio />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<TheLogin />} />
        <Route path="/register/alumnos" element={<RegisterAlum />} />
        <Route path="/register/organismos" element={<RegisterOrg />} />
        <Route
          path="/projects/organismos"
          element={<ProyectListOrganismos />}
        />
        <Route path="/projects/solicitantes" element={<ProyectListAlumnos />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profileOrg" element={<ProfileOrg />} />
        <Route path="/retos" element={<Retos />} />
        <Route path="/FAQ" element={<FAQ />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
