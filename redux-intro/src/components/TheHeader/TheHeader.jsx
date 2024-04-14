// import Nav from 'react-bootstrap/Nav'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MenuIcon from '@mui/icons-material/Menu'
import {logout as LogoutAlumno} from '../../redux/alumnos/alumnosSlice'
const TheHeader = () => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const alumno = useSelector((state) => state.alum.alumno)
  const org = useSelector((state) => state.organ.organismo)
console.log(alumno)
console.log(org)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  // const profileRoute = '/profile'

  const onLogoutAlumno = (e) => {
    e.preventDefault()
    dispatch(LogoutAlumno())
    navigate('/login')
  }

  const onLogoutOrg = (e) => {
    e.preventDefault()
    dispatch(LogoutOrg())
    navigate('/login')
  }


  return (
    <div>
      <IconButton
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}>
        <MenuIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}>
        <MenuItem
          onClick={() => {
            handleClose()
            navigate('/')
          }}>
          Inicio
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose()
            navigate('/login')
          }}>
          Login
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose()
            navigate('/register')
          }}>
          Registro
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose()
            navigate('/proyects/organismos')
          }}>
          Proyectos empresas
        </MenuItem>
        
        {alumno ? (
          <MenuItem onClick={onLogoutAlumno}>Cerrar sesión</MenuItem>
        ): null}
        {org ? (
          <MenuItem onClick={onLogoutOrg}>Cerrar sesión</MenuItem>
        ): null}
      </Menu>
    </div>
  )
}

export default TheHeader
