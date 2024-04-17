import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Modal, Form, Input, message } from 'antd';
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
        // Verificar si el ID del usuario es válido
        if (!user || !user._id || typeof user._id !== 'string') {
          console.error('ID de usuario no válido');
          return;
        }
      
        // Crear el objeto de datos actualizados
        const updatedData = {
          Nombre: values.Nombre,
          Genero: values.Genero,
          Email: values.Email,
          CP: values.CP,
          Telefono: values.Telefono,
          Experiencia: values.Experiencia,
          // Agregar otros campos que deseas actualizar
        };
      console.log(updatedData);
        // Enviar la solicitud para actualizar el usuario
        dispatch(updateUser({ userId: user._id, userData: updatedData }));
        setIsEditing(false);
      };
      
      

    const onValuesChange = (changedValues) => {
        setEditedUser({ ...editedUser, ...changedValues });
    };
console.log(user)
    return (
        <>
            <h1>Perfil de {user && user.Nombre}</h1>
            <p>Genero: {user && user.Genero}</p>
            <p>Email: {user && user.Email}</p>
            <p>Teléfono: {user && user.Telefono}</p>
            <p>Cp: {user && user.CP}</p>
            <p>Área de Estudios: {user && user.AreaEstudios}</p>
            <p>Educacion: {user && user.Educacion}</p>
            <p>Experiencia: {user && user.Experiencia}</p>
            <p>Habilidades: {user && user.Habilidades}</p>
            <p>Logros: {user && user.Logros}</p>
            <p>Sector: {user && user.Sector}</p>

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
