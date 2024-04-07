import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { register, reset } from '../../../redux/alumnos/alumnosSlice'
import { notification } from 'antd'
import './RegisterAlum.style.scss'

const RegisterAlum = () => {
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
    Educacion: '',
    Sector: '',
    Habilidades: [],
    ExperienciaInput: '',
    Experiencia: [],
    Logros: [],
  })

  const {
    Nombre,
    Email,
    Password,
    Telefono,
    CP,
    Genero,
    Educacion,
    Sector,
    Habilidades,
    Experiencia,
    ExperienciaInput,
    Logros,
  } = formData
  const educacionData = [
    'Educación obligatoria',
    'Bachiller',
    'Ciclo de grado medio',
    'Ciclo de grado superior',
    'Grado Universitario',
    'Formación no reglada',
    'Otros',
  ]
  const sectorData = [
    'Informática',
    'Marketing',
    'Construcción',
    'Hostelería',
    'Finanzas',
  ]
  const habilidadesData = [
    'Trabajo en equipo',
    'desarrollo web',
    'marketing',
    'construcción de edificios',
    'contabilidad',
    'ciberseguridad',
    'data science',
  ]

  const logrosData = ['Logro1', 'Logro2', 'Logro3', 'Logro4']

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const handleAddInfo = () => {
    const nuevaExperiencia = ExperienciaInput
    setFormData({
      ...formData,
      ExperienciaInput: '',
      Experiencia: [...Experiencia, nuevaExperiencia],
    })
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
          style={{ color: '#191919' }}
          className="container__input input"
          type="text"
          name="Nombre"
          value={Nombre}
          placeholder="Nombre"
          onChange={onChange}
        />
        <input
          className="container__input input"
          type="email"
          name="Email"
          value={Email}
          placeholder="Email"
          onChange={onChange}
        />
        <input
          className="container__input input"
          type="password"
          name="Password"
          value={Password}
          placeholder="Contraseña"
          onChange={onChange}
        />
        <input
          className="container__input input"
          type="tel"
          name="Telefono"
          value={Telefono}
          placeholder="Teléfono"
          onChange={onChange}
        />
        <input
          className="container__input input"
          type="number"
          name="CP"
          value={CP}
          placeholder="Código Postal"
          onChange={onChange}
        />
        <div>
          <select
            style={{ width: '13.75rem', height: '1.75rem', color: 'grey' }}
            className="listmenu"
            name="Genero"
            value={Genero}
            onChange={onChange}>
            <option value="" disabled>
              Género
            </option>
            <option value="Mujer">Mujer</option>
            <option value="Hombre">Hombre</option>
            <option value="Otro">Otro</option>
          </select>
        </div>
        <div>
          <select
            style={{ width: '13.75rem', height: '1.75rem', color: 'grey' }}
            className="listmenu"
            name="Educacion"
            value={Educacion}
            onChange={onChange}>
            <option value="" disabled>
              Nivel educativo
            </option>
            {educacionData.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div>
          <select
            style={{ width: '13.75rem', height: '1.75rem', color: 'grey' }}
            className="listmenu"
            name="Sector"
            value={Sector}
            onChange={onChange}>
            <option value="" disabled>
              Sector
            </option>
            {sectorData.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div>
          <select
            style={{ width: '13.75rem', height: '1.75rem', color: 'grey' }}
            className="listmenu"
            name="Habilidades"
            value={Habilidades}
            onChange={(e) => {
              const nuevaHabilidad = e.target.value
              setFormData({
                ...formData,
                Habilidades: [...Habilidades, nuevaHabilidad],
              })
            }}>
            <option value="" disabled>
              Habilidades
            </option>
            {habilidadesData.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="experiencia-container">
          <input
            className="experiencia-container__input"
            type="text"
            name="ExperienciaInput"
            value={ExperienciaInput}
            placeholder="Experiencia"
            onChange={onChange}
          />
          <button
            className="experiencia-container__button"
            type="button"
            onClick={handleAddInfo}>
            Añadir
          </button>
        </div>
        <div>
          <select
            style={{ width: '13.75rem', height: '1.75rem', color: 'grey' }}
            className="listmenu"
            name="Logros"
            value={Logros}
            onChange={(e) => {
              const nuevoLogro = e.target.value
              setFormData({
                ...formData,
                Logros: [...Logros, nuevoLogro],
              })
            }}>
            <option value="" disabled>
              Logros
            </option>
            {logrosData.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="button-container">
          <button className="button-container__button" type="submit">
            Guardar
          </button>
          <button className="button-container__button">Editar</button>
        </div>
      </form>
    </>
  )
}

export default RegisterAlum
