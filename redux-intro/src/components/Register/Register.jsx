import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { register, reset } from '../../redux/alumnos/alumnosSlice'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { notification } from 'antd'

const Register = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { isSuccess, isError, message } = useSelector((state) => state.alum)

  useEffect(() => {
    if (isSuccess) {
      notification.success({
        description: message,
      })
      setTimeout(() => navigate('/login'), 2000)
    } else if (isError) {
      notification.error({
        description: message,
      })
    }

    dispatch(reset())
  }, [isSuccess, isError, message])

  const [formData, setFormData] = useState({
    Nombre: '',
    Email: '',
    Password: '',
    Telefono: '',
    CP: '',
    Genero: '',
  })

  const { Nombre, Email, Password, Telefono, CP, Genero } = formData

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(register(formData))
  }

  return (
    <>
      <h1>
        Completa tu <b>Perfil</b>
      </h1>
      <form className="container" onSubmit={onSubmit}>
        <input
          className="container__input"
          type="text"
          name="Nombre"
          value={Nombre}
          placeholder="Nombre"
          onChange={onChange}
        />
        <input
          className="container__input"
          type="email"
          name="Email"
          value={Email}
          placeholder="Email"
          onChange={onChange}
        />
        <input
          className="container__input"
          type="password"
          name="Password"
          value={Password}
          placeholder="Contraseña"
          onChange={onChange}
        />
        <input
          className="container__input"
          type="tel"
          name="Telefono"
          value={Telefono}
          placeholder="Teléfono"
          onChange={onChange}
        />
        <input
          className="container__input"
          type="number"
          name="CP"
          value={CP}
          placeholder="Código Postal"
          onChange={onChange}
        />
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Género</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={Genero}
              name="Genero"
              label="genero"
              onChange={onChange}>
              <MenuItem value={'Hombre'}>Hombre</MenuItem>
              <MenuItem value={'Mujer'}>Mujer</MenuItem>
              <MenuItem value={'Otro'}>Otro</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <button type="submit">Guardar</button>
      </form>
    </>
  )
}

export default Register
