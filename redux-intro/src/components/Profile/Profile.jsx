import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Modal, Form, Input, message, Row, Col } from 'antd';
import { updateUser } from '../../redux/alumnos/alumnosSlice';
import './Profile.css'; // Importamos el archivo de estilos
import AvatarPerfil from '../../assets/images/unnamed.jpg'

const Profile = () => {
    const dispatch = useDispatch();
    const { alumno: user, isSuccess, isError, message: updateMessage } = useSelector((state) => state.alum);
    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState(null);

    useEffect(() => {
        if (user) {
            setEditedUser(user);
        }
    }, [user]);

    useEffect(() => {
        if (isSuccess) {
            message.success('Perfil actualizado correctamente');
            setIsEditing(false);
        }
    }, [isSuccess]);

    useEffect(() => {
        if (isError) {
            message.error(updateMessage);
        }
    }, [isError, updateMessage]);

    const handleCancel = () => {
        setIsEditing(false);
    };

    const onFinish = (values) => {
        if (!user || !user._id || typeof user._id !== 'string') {
          console.error('ID de usuario no válido');
          return;
        }
        const updatedData = {
          Nombre: values.Nombre,
          Genero: values.Genero,
          Email: values.Email,
          CP: values.CP,
          Telefono: values.Telefono,
          Experiencia: values.Experiencia,
          Sector: values.Sector
        };
      console.log(updatedData);
        dispatch(updateUser({ userId: user._id, userData: updatedData }));
        setIsEditing(false);
      };

    const onValuesChange = (changedValues) => {
        setEditedUser({ ...editedUser, ...changedValues });
    };

    return (
        <div className="profile-container">
        <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={24}>
                <h1>Mi Perfil</h1>
            </Col>
        </Row>

        <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={9}>
                <Button className="orange-button first-row-button" onClick={() => setIsEditing(true)}>{user && user.Nombre}</Button>
                <Button className="orange-button first-row-button" onClick={() => setIsEditing(true)}>{user && user.Edad}</Button>
                <Button className="orange-button first-row-button" onClick={() => setIsEditing(true)}>{user && user.Sector}</Button>
            </Col>
            <Col xs={24} sm={24} md={6}>
                <div className="avatar-container">
                    <img src={AvatarPerfil} alt="Mi Imagen" className="round-image" />
                </div>
            </Col>
            <Col xs={24} sm={24} md={9}>
                <Button className="orange-button first-row-button" onClick={() => setIsEditing(true)}>{user && user.Email}</Button>
                <Button className="orange-button first-row-button" onClick={() => setIsEditing(true)}>{user && user.Telefono}</Button>
                <Button className="orange-button first-row-button" onClick={() => setIsEditing(true)}>{user && user.Experiencia}</Button>
            </Col>
        </Row>

        <Row gutter={[16, 16]} className="margin-top">
            <Col xs={24} sm={24} md={24}>
                <div className="avatar-container">
                    <img src={AvatarPerfil} alt="Otra Imagen" className="image" />
                </div>
            </Col>
        </Row>

        <Row gutter={[16, 16]} className="margin-top">
            <Col xs={24} sm={24} md={24}>
                <h2>Título de la Tercera Fila</h2>
                <div className="avatar-container">
                    <img src={AvatarPerfil} alt="Otra Imagen" className="image" />
                </div>
                <Button className="small-button orange-button">Botón</Button>
            </Col>
        </Row>

        <Modal
            title="Editar Perfil"
            visible={isEditing}
            onCancel={handleCancel}
            footer={[
                <Button key="cancel" onClick={handleCancel}>
                    Cancelar
                </Button>,
                <Button form="editForm" key="submit" htmlType="submit">
                    Guardar
                </Button>,
            ]}
            >
            <Form id="editForm" onFinish={onFinish} initialValues={editedUser} onValuesChange={onValuesChange}>
                <Form.Item label="Nombre" name="Nombre">
                    <Input />
                </Form.Item>
                <Form.Item label="Genero" name="Genero">
                    <Input />
                </Form.Item>
                <Form.Item label="Email" name="Email">
                    <Input />
                </Form.Item>
                <Form.Item label="CP" name="CP">
                    <Input />
                </Form.Item>
                <Form.Item label="Teléfono" name="Telefono">
                    <Input />
                </Form.Item>
                <Form.Item label="Experiencia" name="Experiencia">
                    <Input />
                </Form.Item>
                <Form.Item label="Sector" name="Sector">
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    </div> 
    );
};

export default Profile;
