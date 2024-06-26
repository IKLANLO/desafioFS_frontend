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
      setTimeout(() => navigate('/login'), 1000)
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
    Habilidades: '',
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
    HabilidadInput,
    Habilidades,
    Experiencia,
    ExperienciaInput,
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
  // const habilidadesData = [
  //   'Trabajo en equipo',
  //   'desarrollo web',
  //   'marketing',
  //   'construcción de edificios',
  //   'contabilidad',
  //   'ciberseguridad',
  //   'data science',
  // ]

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const handleAddExp = () => {
    const nuevaExperiencia = ExperienciaInput
    setFormData({
      ...formData,
      ExperienciaInput: '',
      Experiencia: [...Experiencia, nuevaExperiencia],
    })
  }

  const handleAddHab = () => {
    const nuevaHabilidad = HabilidadInput

    let habilidadesLength
    if (Habilidades?.length === 0) {
      habilidadesLength = {
        ...formData,
        HabilidadInput: '',
        Habilidades: nuevaHabilidad,
      }
    } else {
      habilidadesLength = {
        ...formData,
        HabilidadInput: '',
        Habilidades: `${Habilidades}, ${nuevaHabilidad} `,
      }
    }
    setFormData(habilidadesLength)
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
        {/* <div> 
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
        </div> */}
        <div className="input-container">
          <input
            className="input-container__input"
            type="text"
            name="HabilidadInput"
            value={HabilidadInput}
            placeholder="Habilidades"
            onChange={onChange}
          />
          <button
            className="input-container__button"
            type="button"
            onClick={handleAddHab}>
            Añadir
          </button>
        </div>
        <div className="input-container">
          <input
            className="input-container__input"
            type="text"
            name="ExperienciaInput"
            value={ExperienciaInput}
            placeholder="Experiencia"
            onChange={onChange}
          />
          <button
            className="input-container__button"
            type="button"
            onClick={handleAddExp}>
            Añadir
          </button>
        </div>
        <div className="button-container">
          <button className="button-container__button" type="submit">
            Guardar
          </button>
        </div>
      </form>
    </>
  )
}

export default RegisterAlum
