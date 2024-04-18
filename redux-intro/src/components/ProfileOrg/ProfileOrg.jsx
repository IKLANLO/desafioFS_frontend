import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Slider from 'react-slick'
import { Button, Modal, Form, Input, message, Row, Col } from 'antd'
import { updateOrgan } from '../../redux/organismos/organismosSlice'
import './ProfileOrg.css' // Importamos el archivo de estilos
import AvatarPerfil from '../../assets/images/6991880.jpg'
import Image1 from '../../assets/images/oferta_2_ll_Mesa de trabajo 1.png'
import Image2 from '../../assets/images/Sin título-2_Mesa de trabajo 1.png'
import Image3 from '../../assets/images/oferta_1_ll_Mesa de trabajo 1_Mesa de trabajo 1.png'
import Image4 from '../../assets/images/oportunidades_h2_Mesa de trabajo 1.png'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import '../Profile/Profile.style.scss'

const ProfileOrg = () => {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  }
  const dispatch = useDispatch()
  const {
    organismo: user,
    isSuccess,
    isError,
    message: updateMessage,
  } = useSelector((state) => state.organ)
  const [isEditing, setIsEditing] = useState(false)
  const [editedUser, setEditedUser] = useState(null)

  useEffect(() => {
    if (user) {
      setEditedUser(user)
    }
  }, [user])

  useEffect(() => {
    if (isSuccess) {
      message.success('Perfil actualizado correctamente')
      setIsEditing(false)
    }
  }, [isSuccess])

  useEffect(() => {
    if (isError) {
      message.error(updateMessage)
    }
  }, [isError, updateMessage])

  const handleCancel = () => {
    setIsEditing(false)
  }

  const onFinish = (values) => {
    if (!user || !user._id || typeof user._id !== 'string') {
      console.error('ID de usuario no válido')
      return
    }
    const updatedData = {
      Nombre: values.Nombre,
      Sector: values.Sector,
      Direccion: values.Direccion,
      Tamano: values.Tamano,
    }
    console.log(updatedData)
    dispatch(updateOrgan({ orgId: user._id, orgData: updatedData }))
    setIsEditing(false)
  }

  const onValuesChange = (changedValues) => {
    setEditedUser({ ...editedUser, ...changedValues })
  }

  return (
    <div className="profile-container">
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={24}>
          <h1>Mi Perfil</h1>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={8}>
          <Button
            className="orange-button first-row-button"
            onClick={() => setIsEditing(true)}>
            {user && user.Nombre}
          </Button>
          <Button
            className="orange-button first-row-button"
            onClick={() => setIsEditing(true)}>
            {user && user.Sector}
          </Button>
        </Col>
        <Col xs={24} sm={24} md={8}>
          <div className="avatar-container">
            <img src={AvatarPerfil} alt="Mi Imagen" className="round-image" />
          </div>
        </Col>
        <Col xs={24} sm={24} md={8}>
          <Button
            className="orange-button first-row-button"
            onClick={() => setIsEditing(true)}>
            {user && user.Direccion}
          </Button>
          <Button
            className="orange-button first-row-button"
            onClick={() => setIsEditing(true)}>
            {user && user.Tamano}
          </Button>
        </Col>
      </Row>
      <Row gutter={[16, 16]} className="margin-top-none">
        <Col xs={24} sm={24} md={24}>
          <div className="avatar-container">
            <div className="image-slider-container">
              <div>
                <img src={Image4} alt="Logo" className="slider-h2" />
              </div>
              <Slider {...settings}>
                <div>
                  <img src={Image1} alt="Logo" className="logo" />
                </div>
                <div>
                  <img src={Image2} alt="Logo" className="logo" />
                </div>
                <div>
                  <img src={Image3} alt="Logo" className="logo" />
                </div>
              </Slider>
            </div>
          </div>
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
        ]}>
        <Form
          id="editForm"
          onFinish={onFinish}
          initialValues={editedUser}
          onValuesChange={onValuesChange}>
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
  )
}

export default ProfileOrg
