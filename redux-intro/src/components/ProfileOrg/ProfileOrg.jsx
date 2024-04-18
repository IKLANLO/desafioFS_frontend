import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Modal, Form, Input, message, Row, Col } from 'antd';
import { updateOrgan } from '../../redux/organismos/organismosSlice';
import './ProfileOrg.css'; // Importamos el archivo de estilos
import AvatarPerfil from '../../assets/images/unnamed.jpg';

const ProfileOrg = () => {
    const dispatch = useDispatch();
    const { organismo: user, isSuccess, isError, message: updateMessage } = useSelector((state) => state.organ);
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
          Sector: values.Sector,
          Direccion: values.Direccion,
          Tamano: values.Tamano
        };
      console.log(updatedData);
        dispatch(updateOrgan({ orgId: user._id, orgData: updatedData }));
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
                <Col xs={24} sm={24} md={8}>
                    <Button className="orange-button first-row-button" onClick={() => setIsEditing(true)}>{user && user.Nombre}</Button>
                    <Button className="orange-button first-row-button" onClick={() => setIsEditing(true)}>{user && user.Sector}</Button>
                </Col>
                <Col xs={24} sm={24} md={8}>
                    <div className="avatar-container">
                        <img src={AvatarPerfil} alt="Mi Imagen" className="round-image" />
                    </div>
                </Col>
                <Col xs={24} sm={24} md={8}>
                    <Button className="orange-button first-row-button" onClick={() => setIsEditing(true)}>{user && user.Direccion}</Button>
                    <Button className="orange-button first-row-button" onClick={() => setIsEditing(true)}>{user && user.Tamano}</Button>
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
                    <Form.Item label="Sector" name="Sector">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Dirección" name="Direccion">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Tamaño" name="Tamano">
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div> 
    );
};

export default ProfileOrg;
