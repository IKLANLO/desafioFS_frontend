import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProyects } from '../../redux/alumnos/alumnosSlice';
import alumnosService from '../../redux/alumnos/alumnosService';


import {
  
  reset,
  updateProyect,
  getTutores,
  addTutor,
  cancelProyecto,
  addProyecto,
  confirmAlumno,
} from '../../redux/organismos/organismosSlice'

import { styled } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Collapse from '@mui/material/Collapse'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { red } from '@mui/material/colors'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'


const ExpandMore = styled((props) => {
  const { expand, ...other } = props
  return <IconButton {...other} />
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}))

const Inicio = () => {
  const dispatch = useDispatch();
  const alumno = useSelector((state) => state.alum.alumno);
  const { tutores } = useSelector((state) => state.organ)
  const [proyectos, setProyectos] = useState([]);
  const [expandedIds, setExpandedIds] = useState([])

  const handleExpandClick = (projectId) => {
    setExpandedIds((prevExpandedIds) =>
      prevExpandedIds.includes(projectId)
        ? prevExpandedIds.filter((id) => id !== projectId)
        : [...prevExpandedIds, projectId]
    )
  }
  useEffect(() => {
    const obtenerProyectosPorSector = async () => {
      try {
        console.log('Alumno:', alumno);
        if (alumno) {
          // Obtener el sector del alumno desde el objeto del usuario
          const sectorAlumno = alumno.Sector;
          console.log('Sector del alumno:', sectorAlumno);
          // Hacer la llamada al servicio para obtener los proyectos por sector
          const proyectos = await alumnosService.getProyects(sectorAlumno);
          console.log('Proyectos obtenidos:', proyectos);
          setProyectos(proyectos);
          // También puedes despachar la acción para actualizar el estado global de Redux
          // dispatch(getProyects(proyectos));
        }
      } catch (error) {
        console.error('Error al obtener proyectos:', error);
      }
    };

    obtenerProyectosPorSector();
  }, [dispatch, alumno]); 

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
  console.log('Proyectos en estado local:', proyectos);

  return (
    <div>
      <h1>Proyectos</h1>
      <ul>
        {proyectos.map(proyecto => (
          <li key={proyecto._id}>
          <br></br>
            <Card sx={{ maxWidth: 345 }}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  R
                </Avatar>
              }
              title={proyecto.Titulo}
              subheader={proyecto.Estado}
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {proyecto.Descripcion}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <ExpandMore
                expand={expandedIds.includes(proyecto._id)}
                onClick={() => handleExpandClick(proyecto._id)}
                aria-expanded={expandedIds.includes(proyecto._id)}
                aria-label="show more">
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
            <Collapse
              in={expandedIds.includes(proyecto._id)}
              timeout="auto"
              unmountOnExit>
              <CardContent>
                <Typography paragraph variant="body2" color="text.secondary">
                  {`Inicio: ${handleDate(proyecto.Fecha_presentacion)}`}
                </Typography>
                <Typography paragraph variant="body2" color="text.secondary">
                  {`Duración: ${proyecto.Meses_estimados} meses`}
                </Typography>
                <Typography
                  paragraph
                  variant="body2"
                  color="text.secondary">{`Sector: ${proyecto.Sector}`}</Typography>
                <Typography paragraph variant="body2" color="text.secondary">
                  {`Contrato: ${proyecto.Tipo_contrato}`}
                </Typography>
                <Typography paragraph variant="body2" color="text.secondary">
                  {`Tutor: ${getTutorName(proyecto?.IdTutor)}`}
                </Typography>
                
                
              </CardContent>
            </Collapse>
          </Card>
          </li>
        ))}
      </ul>
    </div>

  );
};

export default Inicio;