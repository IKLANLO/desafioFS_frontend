import React, { useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { Button, Modal, Form, Input, Select } from 'antd';
import { updateUser } from '../../redux/alumnos/alumnosSlice';

const Profile = () => {
    const dispatch = useDispatch();
    const { alumno:user } = useSelector((state) => state.alum);
    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState(user);
    // const { Option } = Select;

    const handleCancel = () => {
        setIsEditing(false);
        setEditedUser(user);
    };

    const onFinish = (values) => {
        console.log(values);
        dispatch(updateUser(values));
        setIsEditing(false);
    };
    const onValuesChange = (allValues) => {
        setEditedUser({ ...editedUser, ...allValues }); // Actualiza el estado local con los cambios en el formulario
    };

    return (
        <>
            <h1>Perfil de {user.Nombre}</h1>
            <p>Genero: {user.Genero}</p>
            <p>Email: {user.Email}</p>
            <p>Teléfono: {user.Telefono}</p>
            <p>Cp: {user.Cp}</p>
            <p>Área de Estudios: {user.AreaEstudios}</p>
            <p>Educacion: {user.Educacion}</p>
            <p>Experiencia: {user.Experiencia}</p>
            <p>Habilidades: {user.Habilidades}</p>
            <p>Logros: {user.Logros}</p>
            <p>Sector: {user.Sector}</p>

            <Button onClick={() => setIsEditing(true)}>Editar Perfil</Button>

            <Modal
                title="Editar Perfil"
                open={isEditing}
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
                <Form id="editForm" onFinish={onFinish} initialValues={user} onValuesChange={onValuesChange}>
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



// import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { Button, Modal, Form, Input } from 'antd';
// import { updateUser } from '../../redux/alumnos/alumnosSlice'; 

// const Profile = () => {
//     const user = useSelector((state) => state.alum); 
//     const dispatch = useDispatch(); 

//     const [isEditing, setIsEditing] = useState(false);

//     const handleCancel = () => {
//         setIsEditing(false);
//     };

//     const onFinish = (values) => {
        
//         dispatch(updateUser(values));

//         setIsEditing(false);
//     };

//     return (
//         <>
//             <h1>Perfil de {user.Nombre}</h1>
//             <p>Genero: {user.Genero}</p>
//             <p>Email: {user.Email}</p>
//             <p>Teléfono: {user.Telefono}</p>
//             <p>Cp: {user.Cp}</p>
//             <p>Área de Estudios: {user.AreaEstudios}</p>
//             <p>Educacion: {user.Educacion}</p>
//             <p>Experiencia: {user.Experiencia}</p>
//             <p>Habilidades: {user.Habilidades}</p>
//             <p>Logros: {user.Logros}</p>
//             <p>Sector: {user.Sector}</p>

//             <Button onClick={() => setIsEditing(true)}>Editar Perfil</Button>

//             <Modal
//                 title="Editar Perfil"
//                 open={isEditing}
//                 onCancel={handleCancel}
//                 footer={[
//                     <Button key="cancel" onClick={handleCancel}>
//                         Cancelar
//                     </Button>,
//                     <Button form="editForm" key="submit" htmlType="submit">
//                         Guardar
//                     </Button>,
//                 ]}
//             >
//                 <Form id="editForm" onFinish={onFinish} initialValues={user}>
//                     <Form.Item label="Nombre" name="Nombre">
//                         <Input />
//                     </Form.Item>
//                     <Form.Item label="Genero" name="Genero">
//                         <Input />
//                     </Form.Item>
//                     <Form.Item label="Email" name="Email">
//                         <Input />
//                     </Form.Item>
//                     <Form.Item label="CP" name="CP">
//                         <Input />
//                     </Form.Item>
//                     <Form.Item label="Teléfono" name="Telefono">
//                         <Input />
//                     </Form.Item>
//                     <Form.Item label="Experiencia" name="Experiencia">
//                         <Input />
//                     </Form.Item>
//                 </Form>
//             </Modal>
//         </>
//     );
// };

// export default Profile;
