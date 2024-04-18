import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  login as loginAlumno,
  reset as resetAlumnos,
} from '../../redux/alumnos/alumnosSlice'
import { useNavigate } from 'react-router-dom'
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch.jsx'
import {
  login as loginOrganismo,
  reset as resetOrganismos,
} from '../../redux/organismos/organismosSlice.js'
import { notification } from 'antd'
import './TheLogin.css'

const TheLogin = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {
    isSuccess: isSuccessAlumno,
    isError: isErrorAlumno,
    message: messageAlumno,
    isLoading: isLoadingAlumno,
  } = useSelector((state) => state.alum)
  const {
    isSuccess: isSuccessOrganismo,
    isError: isErrorOrganismo,
    message: messageOrganismo,
    isLoading: isLoadingOrganismo,
  } = useSelector((state) => state.organ)
  const [userType, setUserType] = useState('alumno')
  const [errorMessage, setErrorMessage] = useState('')

  const handleUserTypeChange = (checked) => {
    setUserType(checked ? 'organizacion' : 'alumno')
    console.log(userType)
  }

  useEffect(() => {
    dispatch(resetAlumnos(), dispatch(resetOrganismos()))
  }, [])

  useEffect(() => {
    if (isSuccessAlumno) {
      notification.success({ description: messageAlumno })
      setTimeout(() => navigate('/Inicio'), 1000)
    } else if (isErrorAlumno) {
      setErrorMessage(messageAlumno)
    }

    if (isSuccessOrganismo) {
      notification.success({ description: messageOrganismo })
      setTimeout(() => navigate('/InicioOrg'), 1000) // Ruta de organismo
    } else if (isErrorOrganismo) {
      setErrorMessage(messageOrganismo)
    }
  }, [
    isSuccessAlumno,
    isErrorAlumno,
    messageAlumno,
    isSuccessOrganismo,
    isErrorOrganismo,
    messageOrganismo,
  ])

  const [formData, setFormData] = useState({
    Email: '',
    Password: '',
  })

  const { Email, Password } = formData

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (userType === 'alumno') {
      dispatch(loginAlumno(formData))
    } else if (userType === 'organizacion') {
      dispatch(loginOrganismo(formData))
    }
  }

  return (
<<<<<<< HEAD
    <form className='login-form' onSubmit={onSubmit}>
      <h2 className='login-header'>Iniciar Sesión</h2>
=======
    <form onSubmit={onSubmit}>
      <h2 className="h2-login">Iniciar Sesión</h2>
>>>>>>> 3871521735256d67561aac99439339b0ebf6d27d

      <input
        className='login-input'
        type="email"
        name="Email"
        value={Email}
        onChange={onChange}
        placeholder="Correo electrónico"
      />
      <input
        className='login-input'
        type="password"
        name="Password"
        value={Password}
        onChange={onChange}
        placeholder="Contraseña"
      />

      <ToggleSwitch
        label="¿Eres empresa? "
        onChange={handleUserTypeChange}
        checked={userType === 'organizacion'}
      />
      <button className='login-button' type="submit">Login</button>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </form>
  )
}

export default TheLogin
