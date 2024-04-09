
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {login, reset} from '../../redux/alumnos/alumnosSlice'
import { useNavigate } from 'react-router-dom'

const TheLogin = () => {
    
    const { isSuccess, isError, message } = useSelector((state) => state.alum)

    useEffect(() => {
        if (isSuccess) {
          notification.success({
            description: message,
          })
          setTimeout(() => navigate('/'), 1000)
        } else if (isError) {
          notification.error({
            description: message,
          })
        }
    
        dispatch(reset())
    }, [isSuccess, isError, message])

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
        console.log('formData',formData)
        dispatch(login(formData))
    }
    
  return (
    //AÑADIR TOOGLE SWITCH PARA LA SELECCIO (ALUMNO O "ORGANISMOS")
    <form onSubmit={onSubmit}>
        <input type="email" name="email" value={email} onChange={onChange}/>
        <input type="password" name="password" value={password} onChange={onChange}/>
        <button type="submit">Login</button>
    </form>
  )
}


export default TheLogin