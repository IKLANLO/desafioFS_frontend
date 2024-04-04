import { BrowserRouter, Route, Routes } from 'react-router-dom'
import TheHeader from './components/TheHeader/TheHeader'
import Register from './components/Register/Register'
import './App.scss'
// import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <BrowserRouter>
      <TheHeader />
      <Routes>
        {/* <Route path="/home" element={<Home />} /> */}
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
