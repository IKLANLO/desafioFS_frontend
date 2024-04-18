import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Modal, Form, Input, message, Row, Col } from 'antd';
import { updateUser } from '../../redux/alumnos/alumnosSlice';

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
        };
      console.log(updatedData);
        dispatch(updateUser({ userId: user._id, userData: updatedData }));
        setIsEditing(false);
      };

    const onValuesChange = (changedValues) => {
        setEditedUser({ ...editedUser, ...changedValues });
    };

    return (
        <>
            <Row gutter={[16, 16]}>
                <Col span={8}>
                    <h1>Mi Perfil</h1>
                    <p>Nombre: {user && user.Nombre}</p>
                    <p>Edad: {user && user.Edad}</p>
                    <p>Sector: {user && user.Sector}</p>
                </Col>
                <Col span={8} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img src="tu-imagen.jpg" alt="Mi Imagen" style={{ maxWidth: '100%', maxHeight: '100%' }} />
                </Col>
                <Col span={8}>
                    <p>Email: {user && user.Email}</p>
                    <p>Teléfono: {user && user.Telefono}</p>
                    <p>Experiencia: {user && user.Experiencia}</p>
                </Col>
            </Row>

            <Row gutter={[16, 16]}>
                <Col span={8}>
                    <h2>Otros Detalles</h2>
                    <p>Campo1: {user && user.Campo1}</p>
                    <p>Campo2: {user && user.Campo2}</p>
                </Col>
                <Col span={8}>
                    <p>Campo3: {user && user.Campo3}</p>
                    <p>Campo4: {user && user.Campo4}</p>
                </Col>
                <Col span={8}>
                    <p>Campo5: {user && user.Campo5}</p>
                    <p>Campo6: {user && user.Campo6}</p>
                </Col>
            </Row>

            <Button onClick={() => setIsEditing(true)}>Editar Perfil</Button>

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
                </Form>
            </Modal>
        </>
    );
};

export default Profile;
