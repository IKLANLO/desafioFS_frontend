import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { register, reset } from '../../redux/alumnos/alumnosSlice'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

const Register = () => {
  const dispatch = useDispatch()
  const [genre, setGenre] = React.useState('')

  const { message } = useSelector((state) => state.alum)

  useEffect(() => {
    dispatch(reset())
  }, [message])

  const [formData, setFormData] = useState({
    Nombre: '',
    Email: '',
    Password: '',
    Telefono: '',
    CP: '',
    Genero: [],
  })

  const { nombre, email, password, telefono, cp, genero } = formData

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

  const handleGenreChange = (event) => {
    setGenre(event.target.value)
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
          name="nombre"
          value={nombre}
          placeholder="Nombre"
          onChange={onChange}
        />
        <input
          className="container__input"
          type="email"
          name="email"
          value={email}
          placeholder="Email"
          onChange={onChange}
        />
        <input
          className="container__input"
          type="password"
          name="password"
          value={password}
          placeholder="Contraseña"
          onChange={onChange}
        />
        <input
          className="container__input"
          type="tel"
          name="telefono"
          value={telefono}
          placeholder="Teléfono"
          onChange={onChange}
        />
        <input
          className="container__input"
          type="number"
          name="cp"
          value={cp}
          placeholder="Código Postal"
          onChange={onChange}
        />
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Género</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={genre}
              name="genero"
              label="genero"
              onChange={handleGenreChange}>
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
