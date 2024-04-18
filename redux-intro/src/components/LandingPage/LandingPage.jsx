import React from "react";
import Slider from "react-slick";
import "./LandingPage.css"

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const LandingPage = () => {
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1
      };

  return (
    <>
    <h2>La fórmula perfecta para unir <span> talentos + empresas</span> en Bizkaia</h2>
    <p>4 científicos tech para crear la fórmula perfecta: unir talentos y empresas de la mano de BBK Fundazioa. Regístrate y comienza  a sumar tu talento, multiplicar tu experiencia e igualar tus oportunidades:</p>
    <div className="tres">
      <img>Sumatu talento</img>
      <img>Multiplica tu experiencia</img>
      <img>Iguala tus oportunidades</img>
    </div>
    <div className=" button-container">
    <button type="button" className="registrarme"></button>
    <button type="button" className="mas-info"></button>
    </div>
    <div className="image-slider-container">
    <Slider {...settings}>
    <div>
      <h3>1</h3>
    </div>
    <div>
      <h3>2</h3>
    </div>
    <div>
      <h3>3</h3>
    </div>
    <div>
      <h3>4</h3>
    </div>
    <div>
      <h3>5</h3>
    </div>
    <div>
      <h3>6</h3>
    </div>
  </Slider>
  </div>
  </>
  )
}

export default LandingPage