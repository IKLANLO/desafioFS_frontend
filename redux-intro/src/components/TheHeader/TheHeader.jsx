import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import {
  logout as LogoutAlumno,
  reset as resetAlumno,
} from '../../redux/alumnos/alumnosSlice';
import { logout as LogoutOrg } from '../../redux/organismos/organismosSlice';

import Logo from '../../assets/Logo/LOGO_LANLAB_ng (1).svg';
import './TheHeader.css';

const TheHeader = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alumno = useSelector((state) => state.alum.alumno);
  const org = useSelector((state) => state.organ.organismo);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onLogoutAlumno = (e) => {
    e.preventDefault();
    dispatch(LogoutAlumno(alumno.Token));
    dispatch(resetAlumno());
    navigate('/');
  };

  const onLogoutOrg = (e) => {
    e.preventDefault();
    dispatch(LogoutOrg(org.Token));
    navigate('/');
  };

  const alumToken = JSON.parse(localStorage.getItem('tokenAlumno'));
  const orgToken = JSON.parse(localStorage.getItem('tokenOrg'));

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
          onClick={handleClick}
        >
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
          }}
        >
          <MenuItem
            className="menu-item"
            onClick={() => {
              handleClose();
              navigate('/');
            }}
          >
            Inicio
          </MenuItem>
          {alumToken === null && orgToken === null && (
            <div>
              <MenuItem
                className="menu-item"
                onClick={() => {
                  handleClose();
                  navigate('/login');
                }}
              >
                Login
              </MenuItem>
              <MenuItem
                className="menu-item"
                onClick={() => {
                  handleClose();
                  navigate('/register');
                }}
              >
                Registro
              </MenuItem>
            </div>
          )}
          {alumToken !== null && (
            <div>
              <MenuItem
                className="menu-item"
                onClick={() => {
                  handleClose();
                  navigate('/profile');
                }}
              >
                Perfil
              </MenuItem>
              <MenuItem
                className="menu-item"
                onClick={() => {
                  handleClose();
                  navigate('/Inicio');
                }}
              >
                Proyectos
              </MenuItem>
              <MenuItem
                className="menu-item"
                onClick={() => {
                  handleClose();
                  navigate('/projects/solicitantes');
                }}
              >
                Tus proyectos
              </MenuItem>
              <MenuItem
                className="menu-item"
                onClick={() => {
                  handleClose();
                  navigate('/retos');
                }}
              >
                Retos
              </MenuItem>
            </div>
          )}
          {orgToken !== null && (
            <div>
              <MenuItem
                className="menu-item"
                onClick={() => {
                  handleClose();
                  navigate('/profileOrg');
                }}
              >
                Perfil
              </MenuItem>
              <MenuItem
                className="menu-item"
                onClick={() => {
                  handleClose();
                  navigate('/projects/organismos');
                }}
              >
                Tus proyectos
              </MenuItem>
            </div>
          )}
          {alumno && (
            <MenuItem
              className="menu-item"
              onClick={onLogoutAlumno}
            >
              Cerrar sesión
            </MenuItem>
          )}
          {org && (
            <MenuItem
              className="menu-item"
              onClick={onLogoutOrg}
            >
              Cerrar sesión
            </MenuItem>
          )}
          <MenuItem
            className="menu-item"
            onClick={() => {
              handleClose();
              navigate('/FAQ');
            }}
          >
            FAQ
          </MenuItem>
        </Menu>
      </div>
    </header>
  );
}

export default TheHeader;
