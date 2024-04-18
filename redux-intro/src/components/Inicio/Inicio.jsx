import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProyects } from '../../redux/alumnos/alumnosSlice'
import alumnosService from '../../redux/alumnos/alumnosService'
import { addSolicitud, getEmpresas } from '../../redux/alumnos/alumnosSlice'
import Collapse from '@mui/material/Collapse' // Agregar esta importación

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Button from '@mui/material/Button'

import './Inicio.css' // Importar el archivo CSS

const Inicio = () => {
  const dispatch = useDispatch()
  const alumno = useSelector((state) => state.alum.alumno)
  const empresas = useSelector((state) => state.alum.empresas)
  const { tutores } = useSelector((state) => state.organ)
  const [proyectos, setProyectos] = useState([])
  const [expandedIds, setExpandedIds] = useState([])

  const handleExpandClick = (projectId) => {
    setExpandedIds((prevExpandedIds) =>
      prevExpandedIds.includes(projectId)
        ? prevExpandedIds.filter((id) => id !== projectId)
        : [...prevExpandedIds, projectId]
    )
  }

  const obtenerProyectosPorSector = async () => {
    try {
      console.log('Alumno:', alumno)
      if (alumno) {
        const sectorAlumno = alumno.Sector
        console.log('Sector del alumno:', sectorAlumno)
        const proyectos = await alumnosService.getProyects(sectorAlumno)
        console.log('Proyectos obtenidos:', proyectos)
        setProyectos(proyectos)
      }
    } catch (error) {
      console.error('Error al obtener proyectos:', error)
    }
  }

  useEffect(() => {
    obtenerProyectosPorSector()
  }, [dispatch])

  useEffect(() => {
    dispatch(getEmpresas())
  }, [])

  const handleDate = (fecha) => {
    const fechaProyecto = new Date(fecha)
    const dia = fechaProyecto.getDate()
    const mes = fechaProyecto.getMonth() + 1
    const año = fechaProyecto.getFullYear()
    const fechaNumerica = `${dia}/${mes}/${año}`
    return fechaNumerica
  }

  const getTutorName = (tutorId) => {
    const tutorData = tutores.find((tutor) => {
      return tutor._id === tutorId
    })
    return tutorData ? tutorData.Nombre : 'No hay tutores asignados'
  }

  const getEmpresaName = (idEmpresa) => {
    const empresa = empresas.find((emp) => {
      return emp._id === idEmpresa
    })
    return empresa ? empresa.Nombre : 'No hay empresa asignada'
  }

  const handleEnviarSolicitud = async (proyectoId) => {
    try {
      const proyecto = proyectos.find((proyecto) => proyecto._id === proyectoId)
      if (
        proyecto &&
        proyecto.Solicitudes.some((solicitud) => solicitud._id === alumno._id)
      ) {
        console.error('Ya has enviado una solicitud para este proyecto.')
        notification.error('Ya has enviado una solicitud para este proyecto')
        return
      }

      // Si el usuario no ha enviado una solicitud para este proyecto, enviar la solicitud
      await dispatch(addSolicitud({ _id: alumno._id, IdProyecto: proyectoId }))

      console.log('Solicitud enviada correctamente')
      obtenerProyectosPorSector()
    } catch (error) {
      console.error('Error al enviar la solicitud:', error)
    }
  }

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Proyectos</h1>
      <ul>
        {proyectos &&
          proyectos.map((proyecto) => (
            <li key={proyecto._id}>
              <Card
                style={{
                  marginBottom: '16px',
                  maxWidth: '90%',
                  margin: 'auto',
                }}>
                <div
                  className="title-row"
                  style={{ backgroundColor: '#E99C5D', padding: '8px' }}>
                  <Typography
                    variant="h6"
                    style={{ color: '#fff', textAlign: 'center' }}>
                    {proyecto.Titulo}
                  </Typography>
                </div>
                <CardContent
                  style={{
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}>
                  <div style={{ marginBottom: '16px', textAlign: 'center' }}>
                    <Typography variant="subtitle1">
                      Estado: {proyecto.Estado}
                    </Typography>
                    <Typography variant="subtitle1">
                      Empresa: {getEmpresaName(proyecto?.IdEmpresa)}
                    </Typography>
                    <Typography variant="body1">
                      Descripción: {proyecto.Descripcion}
                    </Typography>
                  </div>
                </CardContent>
                <CardActions
                  disableSpacing
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      marginBottom: '8px',
                    }}>
                    <Button
                      onClick={() => handleEnviarSolicitud(proyecto._id)}
                      className="solicitud-button"
                      style={{
                        backgroundColor: '#75a5c5',
                        color: '#fff',
                        margin: '8px',
                      }}>
                      {' '}
                      {/* Aplicando el color azul y texto blanco */}
                      {proyecto?.Solicitudes[0]
                        ? 'Solicitud Enviada'
                        : 'Enviar Solicitud'}
                    </Button>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <IconButton
                      onClick={() => handleExpandClick(proyecto._id)}
                      aria-expanded={expandedIds.includes(proyecto._id)}
                      aria-label="show more"
                      style={{ color: '#75a5c5' }}>
                      <ExpandMoreIcon />
                    </IconButton>
                  </div>
                </CardActions>
                <Collapse
                  in={expandedIds.includes(proyecto._id)}
                  timeout="auto"
                  unmountOnExit>
                  <CardContent
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}>
                    <Typography
                      paragraph
                      variant="body2"
                      color="text.secondary">
                      Inicio: {handleDate(proyecto.Fecha_presentacion)}
                    </Typography>
                    <Typography
                      paragraph
                      variant="body2"
                      color="text.secondary">
                      Duración: {proyecto.Meses_estimados} meses
                    </Typography>
                    <Typography
                      paragraph
                      variant="body2"
                      color="text.secondary">
                      Sector: {proyecto.Sector}
                    </Typography>
                    <Typography
                      paragraph
                      variant="body2"
                      color="text.secondary">
                      Contrato: {proyecto.Tipo_contrato}
                    </Typography>
                    <Typography
                      paragraph
                      variant="body2"
                      color="text.secondary">
                      Tutor: {getTutorName(proyecto?.IdTutor)}
                    </Typography>
                  </CardContent>
                </Collapse>
              </Card>
            </li>
          ))}
      </ul>
    </div>
  )
}

export default Inicio
