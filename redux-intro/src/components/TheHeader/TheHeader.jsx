// import Nav from 'react-bootstrap/Nav'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MenuIcon from '@mui/icons-material/Menu'
import {
  logout as LogoutAlumno,
  reset as resetAlumno,
} from '../../redux/alumnos/alumnosSlice'
import { logout as LogoutOrg } from '../../redux/organismos/organismosSlice'

import Logo from '../../assets/Logo/LOGO_LANLAB.svg'
import './TheHeader.css'

const TheHeader = () => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const alumno = useSelector((state) => state.alum.alumno)
  const org = useSelector((state) => state.organ.organismo)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  // const profileRoute = '/profile'

  const onLogoutAlumno = (e) => {
    e.preventDefault()
    dispatch(LogoutAlumno(alumno.Token))
    dispatch(resetAlumno())
    navigate('/')
  }

  const onLogoutOrg = (e) => {
    e.preventDefault()
    dispatch(LogoutOrg(org.Token))
    navigate('/')
  }

  return (
    <header className="header">
      <div className="logo-container">
        <img src={Logo} alt="Logo" className="logo" />
      </div>
      <div className="menu-container">
        <IconButton
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          className="menu-container"
          onClick={handleClick}>
          <MenuIcon />
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          style={{ marginLeft: '-60px' }}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}>
          <MenuItem
            style={{
              marginBottom: '8px',
              padding: '8px 16px',
              fontSize: '16px',
              color: '#333',
              backgroundColor: '#f4f4f4',
              borderRadius: '4px',
            }}
            onClick={() => {
              handleClose()
              navigate('/')
            }}>
            Inicio
          </MenuItem>
          <MenuItem
            style={{
              marginBottom: '8px',
              padding: '8px 16px',
              fontSize: '16px',
              color: '#333',
              backgroundColor: '#f4f4f4',
              borderRadius: '4px',
            }}
            onClick={() => {
              handleClose()
              navigate('/login')
            }}>
            Login
          </MenuItem>
          <MenuItem
            style={{
              marginBottom: '8px',
              padding: '8px 16px',
              fontSize: '16px',
              color: '#333',
              backgroundColor: '#f4f4f4',
              borderRadius: '4px',
            }}
            onClick={() => {
              handleClose()
              navigate('/register')
            }}>
            Registro
          </MenuItem>
          <MenuItem
            style={{
              marginBottom: '8px',
              padding: '8px 16px',
              fontSize: '16px',
              color: '#333',
              backgroundColor: '#f4f4f4',
              borderRadius: '4px',
            }}
            onClick={() => {
              handleClose()
              navigate('/profile')
            }}>
            Perfil
          </MenuItem>
          <MenuItem
            style={{
              marginBottom: '8px',
              padding: '8px 16px',
              fontSize: '16px',
              color: '#333',
              backgroundColor: '#f4f4f4',
              borderRadius: '4px',
            }}
            onClick={() => {
              handleClose()
              navigate('/profileOrg')
            }}>
            Perfil
          </MenuItem>
          <MenuItem
            style={{
              marginBottom: '8px',
              padding: '8px 16px',
              fontSize: '16px',
              color: '#333',
              backgroundColor: '#f4f4f4',
              borderRadius: '4px',
            }}
            onClick={() => {
              handleClose()
              navigate('/projects/organismos')
            }}>
            Tus proyectos
          </MenuItem>
          <MenuItem
            style={{
              marginBottom: '8px',
              padding: '8px 16px',
              fontSize: '16px',
              color: '#333',
              backgroundColor: '#f4f4f4',
              borderRadius: '4px',
            }}
            onClick={() => {
              handleClose()
              navigate('/projects/solicitantes')
            }}>
            Tus proyectos
          </MenuItem>
          <MenuItem
            style={{
              marginBottom: '8px',
              padding: '8px 16px',
              fontSize: '16px',
              color: '#333',
              backgroundColor: '#f4f4f4',
              borderRadius: '4px',
            }}
            onClick={() => {
              handleClose()
              navigate('/retos')
            }}>
            Retos
          </MenuItem>
          <MenuItem
            style={{
              marginBottom: '8px',
              padding: '8px 16px',
              fontSize: '16px',
              color: '#333',
              backgroundColor: '#f4f4f4',
              borderRadius: '4px',
            }}
            onClick={() => {
              handleClose()
              navigate('/acercade')
            }}>
            Conócenos
          </MenuItem>
          {alumno ? (
            <MenuItem
              style={{
                marginBottom: '8px',
                padding: '8px 16px',
                fontSize: '16px',
                color: '#333',
                backgroundColor: '#f4f4f4',
                borderRadius: '4px',
              }}
              onClick={onLogoutAlumno}>
              Cerrar sesión
            </MenuItem>
          ) : null}
          {org ? (
            <MenuItem
              style={{
                marginBottom: '8px',
                padding: '8px 16px',
                fontSize: '16px',
                color: '#333',
                backgroundColor: '#f4f4f4',
                borderRadius: '4px',
              }}
              onClick={onLogoutOrg}>
              Cerrar sesión
            </MenuItem>
          ) : null}
        </Menu>
      </div>
    </header>
  )
}

export default TheHeader
