import * as React from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
import { getProyects, reset } from '../../redux/organismos/organismosSlice'
import { notification } from 'antd'
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

const ProyectListOrganismos = () => {
  const [expandedIds, setExpandedIds] = useState([])

  const handleExpandClick = (projectId) => {
    setExpandedIds((prevExpandedIds) =>
      prevExpandedIds.includes(projectId)
        ? prevExpandedIds.filter((id) => id !== projectId)
        : [...prevExpandedIds, projectId]
    )
  }

  const dispatch = useDispatch()
  const { isSuccess, isError, message, organismo, proyectos } = useSelector(
    (state) => state.organ
  )

  useEffect(() => {
    if (isError) {
      notification.error({
        description: message,
      })
    }
    dispatch(reset())
  }, [isSuccess, isError, message])

  useEffect(() => {
    try {
      dispatch(getProyects(organismo._id))
    } catch (error) {
      console.log(error)
    }
  }, [dispatch])

  const handleDate = (fecha) => {
    const fechaProyecto = new Date(fecha)
    const dia = fechaProyecto.getDate()
    const mes = fechaProyecto.getMonth() + 1
    const año = fechaProyecto.getFullYear()
    const fechaNumerica = `${dia}/${mes}/${año}`
    return fechaNumerica
  }

  return (
    <>
      {proyectos.map((proyecto) => (
        <div key={proyecto._id}>
          <Card sx={{ maxWidth: 345, marginBottom: '0.3125rem' }}>
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
                {/* {proyecto.Descripcion} */}
                {proyecto.Tipo_contrato}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <button>Editar</button>
              <button>Eliminar</button>
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
                <Typography paragraph>{proyecto.Descripcion}</Typography>
                <Typography paragraph>
                  {`Inicio: ${handleDate(proyecto.Fecha_presentacion)}`}
                </Typography>
                <Typography paragraph>
                  {`Duración: ${proyecto.Meses_estimados} meses`}
                </Typography>
                <Typography paragraph>
                  {`Sector: ${proyecto.Sector}`}
                </Typography>
                <Typography paragraph>
                  {`Tutor: ${proyecto.IdTutor}`}
                </Typography>
                <Typography paragraph>
                  {`Solicitudes: ${proyecto.Solicitudes}`}
                </Typography>
                <Typography paragraph>
                  {`Aceptados: ${proyecto.IdAlumno}`}
                </Typography>
              </CardContent>
            </Collapse>
          </Card>
        </div>
      ))}
    </>
  )
}

export default ProyectListOrganismos
