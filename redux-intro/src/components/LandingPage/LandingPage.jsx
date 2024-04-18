import React from "react";
import Slider from "react-slick";
import "./LandingPage.css"

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Image1 from "../../assets/iconos/simbolo_lnlb_tal.png"
import Image2 from "../../assets/iconos/simbolo_lnlb.png"
import Image3 from "../../assets/iconos/simbolo_lnlb_bbk.png"

import ImageC1 from "../../assets/images/Servers.png"
import ImageC2 from "../../assets/images/unnamed.jpg"

const LandingPage = () => {
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1
      };

  return (
    <div className="content-container">
  <h2>La fórmula perfecta para unir <span> talentos +</span><span> empresas</span> en Bizkaia</h2>
  <p className="text-center">4 científicos tech para crear la fórmula perfecta: unir talentos y empresas de la mano de BBK Fundazioa. Regístrate y comienza a sumar tu talento, multiplicar tu experiencia e igualar tus oportunidades:</p>
  <div className="tres">
    <div className="image-container">
      <img src={Image1} alt="Imagen 1" className="icono" />
      <span className="text">Suma tu talento</span>
    </div>
    <div className="image-container">
      <img src={Image2} alt="Imagen 2" className="icono" />
      <span className="text">Multiplica tu experiencia</span>
    </div>
    <div className="image-container">
      <img src={Image3} alt="Imagen 3" className="icono" />
      <span className="text">Iguala tus oportunidades</span>
    </div>
  </div>
  <div className="button-container">
    <button type="button" className="registrarme">Registrarme ahora</button>
    <button type="button" className="mas-info">Descubre mas</button>
  </div>
  <div className="image-slider-container">
    <h2>Las oportunidades<br></br><span>Haz el Match Perfecto</span></h2>
    <Slider {...settings}>
      <div>
        <img src={ImageC1} alt="Logo" className="logo" />
      </div>
      <div>
        <img src={ImageC2} alt="Logo" className="logo" />
      </div>
      <div>
        <img src={Image3} alt="Logo" className="logo" />
      </div>
      <div>
        <img src={Image2} alt="Logo" className="logo" />
      </div>
      <div>
        <img src={Image1} alt="Logo" className="logo" />
      </div>
      <div>
        <img src={Image1} alt="Logo" className="logo" />
      </div>
    </Slider>
  </div>
  <div className="image-slider-container">
  <h2>LOS RETOS:<br></br><span>DEMUESTRA TU TALENTO</span></h2>
  <img src={Image2} alt="Logo" className="logo" />

  </div>
</div>
  )
}

export default LandingPage