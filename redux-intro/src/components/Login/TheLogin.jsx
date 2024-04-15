
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {login as loginAlumno, reset as resetAlumnos} from '../../redux/alumnos/alumnosSlice'
import { useNavigate } from 'react-router-dom'
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch.jsx';
import { login as loginOrganismo, reset as resetOrganismos } from '../../redux/organismos/organismosSlice.js'
import { notification } from 'antd'

const TheLogin = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { 
    isSuccess: isSuccessAlumno, 
    isError: isErrorAlumno, 
    message: messageAlumno, 
    isLoading: isLoadingAlumno 
  } = useSelector((state) => state.alum)
  const { 
    isSuccess: isSuccessOrganismo, 
    isError: isErrorOrganismo, 
    message: messageOrganismo, 
    isLoading: isLoadingOrganismo 
  } = useSelector((state) => state.organ)
  const [userType, setUserType] = useState('alumno');

    const handleUserTypeChange = (checked) => {
      setUserType(checked ? 'organizacion' : 'alumno');
      console.log(userType)
    };
useEffect(() => {
  dispatch(resetAlumnos(), dispatch(resetOrganismos()) );
 
}, [])
    
useEffect(() => {
  console.log(isSuccessAlumno, isSuccessOrganismo)
    if (isSuccessAlumno) {
      console.log(isSuccessAlumno)

      notification.success({ description: messageAlumno })
      setTimeout(() => navigate('/Inicio'), 1000)
    } else if (isErrorAlumno) {
      notification.error({ description: messageAlumno })
      // dispatch(resetAlumnos())
    }
    

    if (isSuccessOrganismo) {
      console.log(isSuccessOrganismo)
      notification.success({ description: messageOrganismo })
      setTimeout(() => navigate('/InicioOrg'), 1000) // Ruta de organismo
    } else if (isErrorOrganismo) {
      notification.error({ description: messageOrganismo })
      // dispatch(resetOrganismos())
    }
 

  }, [isSuccessAlumno, isErrorAlumno, messageAlumno, isSuccessOrganismo, isErrorOrganismo, messageOrganismo])

    const [formData, setFormData] = useState({
      Email:'',
      Password:''
      
    })

    const {Email,Password} = formData
    
    const onChange = (e)=>{
        setFormData((prevState)=> ({
            ...prevState,
            [e.target.name]:e.target.value,
        }))
    }
  
   
    const onSubmit = (e) => {
      e.preventDefault()
      if (userType === 'alumno') {
        console.log(formData)
        dispatch(loginAlumno(formData));
      } else if (userType === 'organizacion') {
        console.log(formData)
        console.log(isSuccessOrganismo)
        dispatch(loginOrganismo(formData));
      } 
    }
    
  return (
    
    <form onSubmit={onSubmit}>
        <input type="email" name="Email" value={Email} onChange={onChange}/>
        <input type="password" name="Password" value={Password} onChange={onChange}/>

        <ToggleSwitch
        label="Organ"
        onChange={handleUserTypeChange}
        checked={userType === 'organizacion'}
      />
        <button type="submit">Login</button>
    </form>
  )
}
export default TheLogin