import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getProyects,
  reset,
  updateProyect,
  getTutores,
  addTutor,
  cancelProyecto,
  addProyecto,
} from '../../redux/organismos/organismosSlice'
import { sectorData } from '../Register/RegisterOrg/RegisterOrg'
import {
  notification,
  Modal,
  Form,
  Input,
  List,
  DatePicker,
  Select,
} from 'antd'
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

const { Option } = Select

const solicitudes = [
  {
    _id: '661968652cc6c30bfe77800f',
    Nombre: 'alumno 1',
    Email: 'alumno1@alumno1.com',
    Genero: 'Hombre',
    Password: 'pass1',
    Telefono: 666666666,
    CP: 48901,
    Educacion: ['básica'],
    Sector: ['informática'],
    Habilidades: 'habilidad 1, habilidad 2',
    Experiencia: ['experiencia 1', 'experiencia 2'],
    Logros: ['logro 1'],
    Token: 'token 1',
    Confirmado: 'true',
    IdProyecto: ['66199f470865c215fd36665c'],
  },
  {
    _id: '6619asd42cc6c30bfe77r4d7',
    Nombre: 'alumno 2',
    Email: 'alumno2@alumno2.com',
    Genero: 'Otros',
    Password: 'pass2',
    Telefono: 777777777,
    CP: 55555,
    Educacion: ['universitaria'],
    Sector: ['marketing'],
    Habilidades: 'habilidad 1',
    Experiencia: ['experiencia 1'],
    Logros: ['logro 1', 'logro 2'],
    Token: 'token 1',
    Confirmado: 'false',
    IdProyecto: ['66199f470865c215fd36665c'],
  },
]

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
  const [modalAddProyectoVisible, setModalAddProyectoVisible] = useState(false)
  const [nuevoProyecto, setNuevoProyecto] = useState({
    Titulo: '',
    Descripcion: '',
    Fecha_presentacion: '',
    Meses_estimados: '',
    Sector: '',
    Tipo_contrato: '',
  })
  const disabledButtonsStyle = {
    backgroundColor: 'lightgray',
    color: 'gray',
    borderStyle: 'none',
    cursor: 'not-allowed',
  }

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

  const handleAddProyecto = (data) => {
    dispatch(addProyecto(data))
    setModalAddProyectoVisible(false)
    setNuevoProyecto({
      Titulo: '',
      Descripcion: '',
      Fecha_presentacion: '',
      Meses_estimados: '',
      Sector: '',
      Tipo_contrato: '',
    })
    dispatch(getProyects(organismo._id))
  }

  return (
    <>
      <div style={{ marginBottom: '0.3125rem' }}>
        <button onClick={() => setModalAddProyectoVisible(true)}>
          Nuevo proyecto
        </button>
      </div>
      <Modal
        style={{ maxWidth: '80%' }}
        title="Nuevo proyecto"
        visible={modalAddProyectoVisible}
        onCancel={() => setModalAddProyectoVisible(false)}
        onOk={() => {
          handleAddProyecto({
            IdEmpresa: organismo._id,
            Token: organismo.Token,
            proyecto: nuevoProyecto,
          })
        }}>
        <Form>
          <Form.Item label="Título">
            <Input
              value={nuevoProyecto.Titulo}
              onChange={(e) =>
                setNuevoProyecto({ ...nuevoProyecto, Titulo: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item label="Descripcion">
            <Input
              value={nuevoProyecto.Descripcion}
              onChange={(e) =>
                setNuevoProyecto({
                  ...nuevoProyecto,
                  Descripcion: e.target.value,
                })
              }
            />
          </Form.Item>
          <Form.Item label="Tipo de contrato">
            <Input
              value={nuevoProyecto.Tipo_contrato}
              onChange={(e) =>
                setNuevoProyecto({
                  ...nuevoProyecto,
                  Tipo_contrato: e.target.value,
                })
              }
            />
          </Form.Item>
          <Form.Item label="Duración (meses)">
            <Input
              value={nuevoProyecto.Meses_estimados}
              onChange={(e) =>
                setNuevoProyecto({
                  ...nuevoProyecto,
                  Meses_estimados: e.target.value,
                })
              }
            />
          </Form.Item>
          <Form.Item label="Fecha de inicio">
            <DatePicker
              style={{ width: '100%' }}
              value={nuevoProyecto.Fecha}
              onChange={(fecha) =>
                setNuevoProyecto({
                  ...nuevoProyecto,
                  Fecha_presentacion: fecha.toISOString(),
                })
              }
            />
          </Form.Item>
          <Form.Item label="Sector">
            <Select
              style={{ width: '100%' }}
              placeholder="Sector"
              value={nuevoProyecto.Sector}
              onChange={(sector) =>
                setNuevoProyecto({ ...nuevoProyecto, Sector: sector })
              }>
              {sectorData.map((sector) => (
                <Option key={sector} value={sector}>
                  {sector}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
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
                disabled={handleDisabledButtons(proyecto.Estado)}
                style={
                  proyecto.Estado === 'Cancelado' ? disabledButtonsStyle : null
                }>
                Añadir tutor
              </button>
              <button
                disabled={handleDisabledButtons(proyecto.Estado)}
                onClick={() => handleCancel(proyecto._id)}
                style={
                  proyecto.Estado === 'Cancelado' ? disabledButtonsStyle : null
                }>
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
                <Typography paragraph>Solicitudes:</Typography>
                {proyecto?.Solicitudes.map((solicitud, index) => (
                  <ul>
                    <li key={index}>{solicitud?.Nombre}</li>
                  </ul>
                ))}
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
