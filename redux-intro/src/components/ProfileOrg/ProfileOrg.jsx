import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Modal, Form, Input, message } from 'antd';
import { updateOrgan } from '../../redux/organismos/organismosSlice';

const ProfileOrg = () => {
    const dispatch = useDispatch();
    const { organismo, isSuccess, isError, message: updateMessage } = useSelector((state) => state.organ);
    console.log(organismo)
    const [isEditing, setIsEditing] = useState(false);
    const [editedOrgan, setEditedOrgan] = useState(null);

    useEffect(() => {
        if (organismo) {
            setEditedOrgan(organismo);
        }
    }, [organismo]);

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
        if (!organismo || !organismo._id || typeof organismo._id !== 'string') {
          console.error('ID de empresa no válido');
          return;
        }
        const updatedData = {
          Nombre: values.Nombre,
          Sector: values.Sector,
          Direccion: values.Direccion,
          Tamano: values.Tamano,
        };
      console.log(updatedData);
        dispatch(updateOrgan({ orgId: organismo._id, orgData: updatedData }));
        setIsEditing(false);
      };
      
      

    const onValuesChange = (changedValues) => {
        setEditedOrgan({ ...editedOrgan, ...changedValues });
    };
console.log(organismo)
    return (
        <>
            <h1>Perfil de {organismo && organismo.Nombre}</h1>
            <p>Sector: {organismo && organismo.Sector}</p>
            <p>Direccion: {organismo && organismo.Direccion}</p>
            <p>Tamaño: {organismo && organismo.Tamano}</p>
    

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
                <Form id="editForm" onFinish={onFinish} initialValues={editedOrgan} onValuesChange={onValuesChange}>
                    <Form.Item label="Nombre" name="Nombre">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Sector" name="Sector">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Direccion" name="Direccion">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Tamano" name="Tamano">
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default ProfileOrg;
