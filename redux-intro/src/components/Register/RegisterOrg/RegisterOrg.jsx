import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { register, reset } from '../../../redux/organismos/organismosSlice'
import { notification } from 'antd'
// import './RegisterAlum.style.scss'

export const sectorData = [
  'Informática',
  'Marketing',
  'Construcción',
  'Hostelería',
  'Finanzas',
]

const RegisterOrg = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { isSuccess, isError, message } = useSelector((state) => state.organ)

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
    Direccion: '',
    Tamano: '',
    Sector: '',
  })

  const { Nombre, Email, Password, Direccion, Tamano, Sector } = formData

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
          type="number"
          name="Tamano"
          value={Tamano}
          placeholder="Tamaño"
          onChange={onChange}
        />
        <input
          style={{ color: '#191919' }}
          className="container__input input"
          type="text"
          name="Direccion"
          value={Direccion}
          placeholder="Dirección"
          onChange={onChange}
        />
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

export default RegisterOrg
