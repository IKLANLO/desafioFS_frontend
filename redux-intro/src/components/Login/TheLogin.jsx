
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {login as loginAlumno, reset as resetAlumnos} from '../../redux/alumnos/alumnosSlice'
import { useNavigate } from 'react-router-dom'
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch.jsx';
import { login as loginOrganismo, reset as resetOrganismos } from '../../redux/organismos/organismosSlice.js'

const TheLogin = () => {
    
    const { isSuccess, isError, message } = useSelector((state) => state.alum)

    const [userType, setUserType] = useState('alumno');

    const handleUserTypeChange = (checked) => {
      setUserType(checked ? 'organizacion' : 'alumno');
    };


//USEEFFECT PARA AMBOS
useEffect(() => {
    if (isSuccessAlumno) {
      notification.success({ description: messageAlumno })
      setTimeout(() => navigate('/InicioAlu'), 1000)
    } else if (isErrorAlumno) {
      notification.error({ description: messageAlumno })
    }
    dispatch(resetAlumnos())

    if (isSuccessOrganismo) {
      notification.success({ description: messageOrganismo })
      setTimeout(() => navigate('/InicioOrg'), 1000) // Ruta de organismo
    } else if (isErrorOrganismo) {
      notification.error({ description: messageOrganismo })
    }
    dispatch(resetOrganismos())

  }, [isSuccessAlumno, isErrorAlumno, messageAlumno, isSuccessOrganismo, isErrorOrganismo, messageOrganismo])


    // useEffect(() => {
    //     if (isSuccess) {
    //       notification.success({
    //         description: message,
    //       })
    //       setTimeout(() => navigate('/'), 1000)
    //     } else if (isError) {
    //       notification.error({
    //         description: message,
    //       })
    //     }
    
    //     dispatch(reset())
    // }, [isSuccess, isError, message])

    const [formData, setFormData] = useState({
        email:'',
        password:''
    })

    const {email,password} = formData
    const onChange = (e)=>{
        setFormData((prevState)=> ({
            ...prevState,
            [e.target.name]:e.target.value,
        }))
    }
    const dispatch = useDispatch()
   
    const onSubmit = (e) => {
      e.preventDefault()
      if (userType === 'alumno') {
        dispatch(loginAlumno(formData));
      } else if (userType === 'organizacion') {
        dispatch(loginOrganismo(formData));
      }

        
    }
    
  return (
    
    <form onSubmit={onSubmit}>
        <input type="email" name="email" value={email} onChange={onChange}/>
        <input type="password" name="password" value={password} onChange={onChange}/>

        <ToggleSwitch
        label="Tipo de usuario:"
        onChange={handleUserTypeChange}
        checked={userType === 'organizacion'}
      />

        <button type="submit">Login</button>
    </form>
  )
}


export default TheLogin