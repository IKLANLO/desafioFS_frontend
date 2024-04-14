import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getProyects,
  reset,
  updateProyect,
  getTutores,
  addTutor,
  cancelProyecto,
} from '../../redux/organismos/organismosSlice'
import { notification, Modal, List } from 'antd'
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
  const [selectedProyecto, setSelectedProyecto] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedTutor, setSelectedTutor] = useState(null)
  const [isButtonsDisabled, setIsButtonsDisabled] = useState(false)

  const handleExpandClick = (projectId) => {
    setExpandedIds((prevExpandedIds) =>
      prevExpandedIds.includes(projectId)
        ? prevExpandedIds.filter((id) => id !== projectId)
        : [...prevExpandedIds, projectId]
    )
  }

  const dispatch = useDispatch()
  const { isSuccess, isError, message, organismo, proyectos, tutores } =
    useSelector((state) => state.organ)

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
      dispatch(getTutores(organismo._id))
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

  const handleCancel = async (IdProyecto) => {
    dispatch(cancelProyecto(IdProyecto))
    dispatch(getProyects(organismo._id))
  }

  const handleAddTutorClick = async (proyecto) => {
    setSelectedProyecto(proyecto)
    setModalVisible(true)
  }

  const handleTutorSelect = (IdProyecto, tutorId) => {
    setSelectedTutor(tutorId)
    setModalVisible(false)
    if (selectedProyecto) {
      dispatch(
        updateProyect({
          IdProyecto,
          IdTutor: tutorId,
        })
      )
      dispatch(addTutor({ IdProyecto, IdTutor: tutorId }))
    }
  }

  const getTutorName = (tutorId) => {
    const tutorData = tutores.find((tutor) => {
      return tutor._id === tutorId
    })
    return tutorData ? tutorData.Nombre : 'No hay tutores asignados'
  }

  const handleDisabledButtons = (estado) => {
    return estado === 'Cancelado'
  }

  return (
    <>
      {proyectos.map((proyecto) => (
        <div key={proyecto._id}>
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
              <button
                onClick={() => {
                  handleAddTutorClick(proyecto)
                }}
                disabled={handleDisabledButtons(proyecto.Estado)}>
                Añadir tutor
              </button>
              <button
                disabled={handleDisabledButtons(proyecto.Estado)}
                onClick={() => handleCancel(proyecto._id)}>
                Cancelar
              </button>
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
                <Typography paragraph>
                  {`Inicio: ${handleDate(proyecto.Fecha_presentacion)}`}
                </Typography>
                <Typography paragraph>
                  {`Duración: ${proyecto.Meses_estimados} meses`}
                </Typography>
                <Typography
                  paragraph>{`Sector: ${proyecto.Sector}`}</Typography>
                <Typography paragraph>
                  {`Contrato: ${proyecto.Tipo_contrato}`}
                </Typography>
                <Typography paragraph>
                  {`Tutor: ${getTutorName(proyecto?.IdTutor)}`}
                </Typography>
                <Typography paragraph>
                  {`Solicitudes: ${proyecto.Solicitudes}`}
                </Typography>
                <Typography
                  paragraph>{`Aceptados: ${proyecto.IdAlumno}`}</Typography>
              </CardContent>
            </Collapse>
          </Card>
        </div>
      ))}
      <Modal
        title="Selecciona un tutor"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}>
        <List
          dataSource={tutores}
          renderItem={(tutor) => (
            <List.Item
              key={tutor._id}
              onClick={() => handleTutorSelect(selectedProyecto._id, tutor._id)}
              style={{ cursor: 'pointer' }}>
              {tutor.Nombre}
            </List.Item>
          )}
        />
      </Modal>
    </>
  )
}

export default ProyectListOrganismos
