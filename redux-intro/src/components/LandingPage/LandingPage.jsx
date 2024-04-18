import React from 'react'
import { useNavigate } from 'react-router-dom'
import Slider from 'react-slick'
import './LandingPage.css'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import Image1 from '../../assets/iconos/simbolo_lnlb_tal.png'
import Image2 from '../../assets/Logo/match_lnlb_igual.png'
import Image3 from '../../assets/iconos/simbolo_lnlb_bbk.png'

import ImageC1 from '../../assets/images/perfil_1_vII.png'
import ImageC2 from '../../assets/images/perfil_2.png'

const LandingPage = () => {
  const navigate = useNavigate()
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
  }

  return (
    <div className="content-container">
      <h1>
        La fórmula perfecta para unir{' '}
        <span className="orange-text">talentos +</span>
        <span className="blue-text"> empresas</span> en Bizkaia
      </h1>
      <p className="text-center">
        4 científicos tech para crear la fórmula perfecta: unir talentos y
        empresas de la mano de BBK Fundazioa. Regístrate y comienza a sumar tu
        talento, multiplicar tu experiencia e igualar tus oportunidades:
      </p>
      <div className="tres">
        <div className="image-container">
          <img src={Image1} alt="Imagen 1" className="icono" />
          <span className="text">Suma tu talento</span>
        </div>
        <div className="image-container">
          <img src={Image2} alt="Imagen 2" className="icono2" />
          <span className="text">Multiplica tu experiencia</span>
        </div>
        <div className="image-container">
          <img src={Image3} alt="Imagen 3" className="icono" />
          <span className="text">Iguala tus oportunidades</span>
        </div>
      </div>
      <div className="button-container">
        <button
          type="button"
          className="registrarme"
          onClick={() => navigate('/register')}>
          Registrarme ahora
        </button>
        <button
          type="button"
          className="mas-info"
          onClick={() => navigate('/FAQ')}>
          Descubre más
        </button>
      </div>
      <div className="image-slider-container">
        <h2>
          Las oportunidades<br></br>
          <span>Haz el Match Perfecto</span>
        </h2>
        <Slider {...settings}>
          <div>
            <img src={ImageC1} alt="Logo" className="logo" />
          </div>
          <div>
            <img src={ImageC2} alt="Logo" className="logo" />
          </div>
          <div>
            <img src={ImageC1} alt="Logo" className="logo" />
          </div>
          <div>
            <img src={ImageC2} alt="Logo" className="logo" />
          </div>
          <div>
            <img src={ImageC1} alt="Logo" className="logo" />
          </div>
          <div>
            <img src={ImageC2} alt="Logo" className="logo" />
          </div>
        </Slider>
      </div>
    </div>
  )
}

export default LandingPage
