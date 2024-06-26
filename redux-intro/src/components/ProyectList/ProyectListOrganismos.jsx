import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getProyects,
  reset,
  updateProyect,
  getTutores,
  addTutor,
  cancelProyecto,
  addProyecto,
  confirmAlumno,
  createTutor,
} from '../../redux/organismos/organismosSlice';
import { sectorData } from '../Register/RegisterOrg/RegisterOrg';
import {
  notification,
  Modal,
  Form,
  Input,
  List,
  DatePicker,
  Select,
} from 'antd';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const { Option } = Select;

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

const tutorData = ['Público', 'Concertado', 'Privado'];

const ProyectListOrganismos = () => {
  const [expandedIds, setExpandedIds] = useState([]);
  const [selectedProyecto, setSelectedProyecto] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [modalAddProyectoVisible, setModalAddProyectoVisible] = useState(false);
  const [modalSolicitud, setModalSolicitud] = useState(false);
  const [selectedSolicitud, setSelectedSolicitud] = useState(null);
  const [modalNuevoTutor, setModalNuevoTutor] = useState(false);
  const [nuevoTutor, setNuevoTutor] = useState({
    Nombre: '',
    Telefono: '',
    Email: '',
    Area_Estudios: '',
    Centro_estudios: '',
    Tipo_centro: '',
    IdEmpresa: '',
  });
  const [nuevoProyecto, setNuevoProyecto] = useState({
    Titulo: '',
    Descripcion: '',
    Fecha_presentacion: '',
    Meses_estimados: '',
    Sector: '',
    Tipo_contrato: '',
  });
  const disabledButtonsStyle = {
    backgroundColor: 'lightgray',
    color: 'gray',
    borderStyle: 'none',
    cursor: 'not-allowed',
  };

  const handleExpandClick = (projectId) => {
    setExpandedIds((prevExpandedIds) =>
      prevExpandedIds.includes(projectId)
        ? prevExpandedIds.filter((id) => id !== projectId)
        : [...prevExpandedIds, projectId]
    );
  };

  const dispatch = useDispatch();
  const { isSuccess, isError, message, organismo, proyectos, tutores } =
    useSelector((state) => state.organ);

  useEffect(() => {
    if (isError) {
      notification.error({
        description: message,
      });
    }
    dispatch(reset());
  }, [isSuccess, isError, message]);

  useEffect(() => {
    try {
      dispatch(getProyects(organismo._id));
      dispatch(getTutores(organismo._id));
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  const handleDate = (fecha) => {
    const fechaProyecto = new Date(fecha);
    const dia = fechaProyecto.getDate();
    const mes = fechaProyecto.getMonth() + 1;
    const año = fechaProyecto.getFullYear();
    const fechaNumerica = `${dia}/${mes}/${año}`;
    return fechaNumerica;
  };

  const handleCancel = async (IdProyecto) => {
    dispatch(cancelProyecto(IdProyecto));
    dispatch(getProyects(organismo._id));
  };

  const handleAddTutorClick = async (proyecto) => {
    setSelectedProyecto(proyecto);
    setModalVisible(true);
  };

  const handleTutorSelect = (IdProyecto, tutorId) => {
    setSelectedTutor(tutorId);
    setModalVisible(false);
    if (selectedProyecto) {
      dispatch(
        updateProyect({
          IdProyecto,
          IdTutor: tutorId,
        })
      );
      dispatch(addTutor({ IdProyecto, IdTutor: tutorId }));
    }
  };

  const getTutorName = (tutorId) => {
    const tutorData = tutores.find((tutor) => {
      return tutor._id === tutorId;
    });
    return tutorData ? tutorData.Nombre : 'No hay tutores asignados';
  };

  const handleDisabledButtons = (estado) => {
    return estado === 'Cancelado';
  };

  const handleAddProyecto = (data) => {
    dispatch(addProyecto(data));
    setModalAddProyectoVisible(false);
    setNuevoProyecto({
      Titulo: '',
      Descripcion: '',
      Fecha_presentacion: '',
      Meses_estimados: '',
      Sector: '',
      Tipo_contrato: '',
    });
    dispatch(getProyects(organismo._id));
  };

  const handleSelectedSolicitud = (solicitud, proyecto) => {
    setSelectedSolicitud(solicitud);
    setSelectedProyecto(proyecto);
    setModalSolicitud(true);
  };

  const handleConfirm = async () => {
    await new Promise((resolve) => {
      dispatch(
        confirmAlumno({
          IdAlumno: selectedSolicitud._id,
          IdProyecto: selectedProyecto._id,
        })
      ).then(() => {
        resolve();
      });
    });
    dispatch(getProyects(organismo._id));
    setModalSolicitud(false);
  };

  const handleAtras = () => {
    setModalSolicitud(false);
  };

  const handleNuevoTutor = (data) => {
    dispatch(createTutor(data));
    setModalNuevoTutor(false);
  };

  return (
    <>
    <div className='titulo'><h1>Todos tus proyectos</h1></div>
      <div style={{ marginBottom: '3rem',marginTop:'3rem',textAlign: "center" }}>
        <button onClick={() => setModalAddProyectoVisible(true)}>
          Nuevo proyecto
        </button>
        <button onClick={() => setModalNuevoTutor(true)}>Nuevo tutor</button>
      </div>
      <Modal
        style={{ maxWidth: '80%' }}
        title="Nuevo tutor"
        visible={modalNuevoTutor}
        onCancel={() => setModalNuevoTutor(false)}
        onOk={() => {
          handleNuevoTutor({ ...nuevoTutor, IdEmpresa: organismo._id });
        }}>
        <Form>
          <Form.Item label="Nombre">
            <Input
              value={nuevoTutor.Nombre}
              onChange={(e) =>
                setNuevoTutor({ ...nuevoTutor, Nombre: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item label="Teléfono">
            <Input
              value={nuevoTutor.Telefono}
              onChange={(e) =>
                setNuevoTutor({ ...nuevoTutor, Telefono: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item label="Email">
            <Input
              value={nuevoTutor.Email}
              onChange={(e) =>
                setNuevoTutor({ ...nuevoTutor, Email: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item label="Área de estudios">
            <Input
              value={nuevoTutor.Area_Estudios}
              onChange={(e) =>
                setNuevoTutor({ ...nuevoTutor, Area_Estudios: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item label="Centro de estudios">
            <Input
              value={nuevoTutor.Centro_estudios}
              onChange={(e) =>
                setNuevoTutor({
                  ...nuevoTutor,
                  Centro_estudios: e.target.value,
                })
              }
            />
          </Form.Item>
          <Form.Item label="Tipo de centro">
            <Select
              style={{ width: '100%' }}
              placeholder="Tipo de centro"
              value={nuevoTutor.Tipo_centro}
              onChange={(tutor) =>
                setNuevoTutor({ ...nuevoTutor, Tipo_centro: tutor })
              }>
              {tutorData.map((tutor, index) => (
                <Option key={index} value={tutor}>
                  {tutor}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        style={{ maxWidth: '80%' }}
        visible={modalSolicitud}
        onCancel={handleAtras}
        footer={[
          <button key="back" onClick={handleAtras}>
            Atrás
          </button>,
          <button key="confirm" type="primary" onClick={handleConfirm}>
            Aceptar
          </button>,
        ]}>
        <Card sx={{ maxWidth: 345 }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                R
              </Avatar>
            }
            title={selectedSolicitud?.Nombre}
            subheader={selectedSolicitud?.Educacion}
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Email: {selectedSolicitud?.Email}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Género: {selectedSolicitud?.Genero}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Teléfono: {selectedSolicitud?.Telefono}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Código postal: {selectedSolicitud?.CP}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Sector: {selectedSolicitud?.Sector}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Habilidades: {selectedSolicitud?.Habilidades}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Experiencia: {selectedSolicitud?.Experiencia}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Logros {selectedSolicitud?.Logros}
            </Typography>
          </CardContent>
        </Card>
      </Modal>
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
          });
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
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {proyectos.map((proyecto) => (
          <Card
            key={proyecto._id}
            sx={{ width: 345, margin: '0.5rem', }}
          >
            <CardHeader
              title={proyecto.Titulo}
              sx={{ backgroundColor: '#75A5C5', color: 'white', textAlign: 'center' }}
            />
            <CardContent>
            <Typography variant="body2" color="text.secondary">
                {proyecto.Estado}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {proyecto.Descripcion}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
    <div style={{ width: '100%', textAlign: 'center' }}>
      <button
        onClick={() => {
          handleAddTutorClick(proyecto);
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
    </div>
    
    <ExpandMore
      expand={expandedIds.includes(proyecto._id)}
      onClick={() => handleExpandClick(proyecto._id)}
      aria-expanded={expandedIds.includes(proyecto._id)}
      aria-label="show more"
      style={{ margin: '0 auto' }}>
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
                <Typography paragraph variant="body2" color="text.secondary">
                  Solicitudes:
                </Typography>
                {proyecto?.Solicitudes.map((solicitud, index) => (
                  <ul key={index}>
                    <Typography variant="body2" color="text.secondary">
                      <li
                        style={{ cursor: 'pointer' }}
                        onClick={() =>
                          handleSelectedSolicitud(solicitud, proyecto)
                        }>
                        {solicitud?.Nombre}
                      </li>
                    </Typography>
                  </ul>
                ))}
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
              </CardContent>
            </Collapse>
          </Card>
        ))}
      </div>
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
  );
};

export default ProyectListOrganismos;
