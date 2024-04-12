// import Nav from 'react-bootstrap/Nav'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MenuIcon from '@mui/icons-material/Menu'

const TheHeader = () => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // const user = useSelector((state) => state.auth.user)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  //TODO: TERNARIA PARA QUE, EN CASO DE ESTAR LOGUEADO, CAMBIE EL MENU.

  // const profileRoute = '/profile'

  const onLogout = (e) => {
    e.preventDefault()
    dispatch(logout())
    navigate('/')
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
        {/* {user && (
          <MenuItem
            onClick={() => {
              handleClose()
              navigate(profileRoute)
            }}
          >
            <Link to="/profile">{user.name}</Link> 
          </MenuItem>
        )}
        {user && (
          <MenuItem onClick={onLogout}>Cerrar sesión</MenuItem>
        )} */}
      </Menu>
    </div>
  )
}

export default TheHeader
