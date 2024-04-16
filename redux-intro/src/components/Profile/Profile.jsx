import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Modal, Form, Input, message } from 'antd';
import { updateUser } from '../../redux/alumnos/alumnosSlice';

const Profile = () => {
    const dispatch = useDispatch();
    const { alumno: user, isSuccess, isError, message: updateMessage } = useSelector((state) => state.alum);
    // console.log(user)
    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState(null);

    useEffect(() => {
        setEditedUser(user);
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
        // console.log(updateUser(values))
        console.log(values);
        updateUser(values);
        setIsEditing(false);
    };

    const onValuesChange = (changedValues) => {
        setEditedUser({ ...editedUser, ...changedValues });
    };

    return (
        <>
            <h1>Perfil de {user.Nombre}</h1>
            <p>Genero: {user.Genero}</p>
            <p>Email: {user.Email}</p>
            <p>Teléfono: {user.Telefono}</p>
            <p>Cp: {user.CP}</p>
            <p>Área de Estudios: {user.AreaEstudios}</p>
            <p>Educacion: {user.Educacion}</p>
            <p>Experiencia: {user.Experiencia}</p>
            <p>Habilidades: {user.Habilidades}</p>
            <p>Logros: {user.Logros}</p>
            <p>Sector: {user.Sector}</p>

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
