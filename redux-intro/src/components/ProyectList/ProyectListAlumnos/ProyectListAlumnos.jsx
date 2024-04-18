import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProyectsByEmail } from '../../../redux/alumnos/alumnosSlice';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Grid from '@mui/material/Grid';

const ProyectListAlumnos = () => {
  const dispatch = useDispatch();
  const { proyectosAlum, alumno } = useSelector((state) => state.alum);
  const { tutores } = useSelector((state) => state.organ);
  const [expandedIds, setExpandedIds] = useState([]);

  useEffect(() => {
    try {
      dispatch(getProyectsByEmail(alumno.Email));
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  const handleExpandClick = (projectId) => {
    setExpandedIds((prevExpandedIds) =>
      prevExpandedIds.includes(projectId)
        ? prevExpandedIds.filter((id) => id !== projectId)
        : [...prevExpandedIds, projectId]
    );
  };

  const handleDate = (fecha) => {
    const fechaProyecto = new Date(fecha);
    const dia = fechaProyecto.getDate();
    const mes = fechaProyecto.getMonth() + 1;
    const año = fechaProyecto.getFullYear();
    const fechaNumerica = `${dia}/${mes}/${año}`;
    return fechaNumerica;
  };

  const getTutorName = (tutorId) => {
    const tutorData = tutores.find((tutor) => tutor._id === tutorId);
    return tutorData ? tutorData.Nombre : 'No hay tutores asignados';
  };

  return (
    <>
      {proyectosAlum.map((proyecto) => (
        <div key={proyecto._id}>
          <Card sx={{ maxWidth: 345, margin: "auto" }}>
            <CardContent style={{ backgroundColor: '#E99C5D', color: '#fff', textAlign: 'center' }}>
              <Typography variant="h6" style={{ margin: 'auto' }}>{proyecto.Titulo}</Typography>
            </CardContent>
            <CardContent style={{ textAlign: 'center' }}>
              <Typography variant="subtitle1" color="text.secondary" gutterBottom style={{ margin: 'auto' }}>
                Estado: {proyecto.Estado}
              </Typography>
              <Typography variant="body2" color="text.secondary" style={{ margin: 'auto' }}>
                {proyecto.Descripcion}
              </Typography>
            </CardContent>
            <CardActions disableSpacing style={{ justifyContent: 'center' }}>
              <ExpandMore
                style={{ margin: 'auto' }}
                expand={expandedIds.includes(proyecto._id)}
                onClick={() => handleExpandClick(proyecto._id)}
                aria-expanded={expandedIds.includes(proyecto._id)}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
            <Collapse
              in={expandedIds.includes(proyecto._id)}
              timeout="auto"
              unmountOnExit
            >
              <CardContent style={{ textAlign: 'center' }}>
                <Typography paragraph variant="body2" color="text.secondary">
                  {`Inicio: ${handleDate(proyecto.Fecha_presentacion)}`}
                </Typography>
                <Typography paragraph variant="body2" color="text.secondary">
                  {`Duración: ${proyecto.Meses_estimados} meses`}
                </Typography>
                <Typography paragraph variant="body2" color="text.secondary">
                  {`Sector: ${proyecto.Sector}`}
                </Typography>
                <Typography paragraph variant="body2" color="text.secondary">
                  {`Contrato: ${proyecto.Tipo_contrato}`}
                </Typography>
                <Typography paragraph variant="body2" color="text.secondary">
                  {`Tutor: ${getTutorName(proyecto?.IdTutor)}`}
                </Typography>

                <Grid container spacing={2} >
                  <Grid item xs={12} sm={6}>
                    <Typography paragraph variant="body2" color="text.secondary" >
                      Solicitudes:
                    </Typography>
                    {proyecto?.Solicitudes.map((solicitud, index) => (
                      <ul key={index}>
                        <Typography variant="body2" color="text.secondary">
                          <li
                            style={{ cursor: 'pointer' }}
                            // onClick={() =>
                            //   handleSelectedSolicitud(solicitud, proyecto)
                            // }
                          >
                            {solicitud?.Nombre}
                          </li>
                        </Typography>
                      </ul>
                    ))}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography paragraph variant="body2" color="text.secondary">
                      Admitidos:
                    </Typography>
                    {proyecto?.IdAlumno.map((alumno, index) => (
                      <ul key={index}>
                        <Typography variant="body2" color="text.secondary">
                          <li>{alumno?.Nombre}</li>
                        </Typography>
                      </ul>
                    ))}
                  </Grid>
                </Grid>
              </CardContent>
            </Collapse>
          </Card>
        </div>
      ))}
    </>
  );
};

export default ProyectListAlumnos;
