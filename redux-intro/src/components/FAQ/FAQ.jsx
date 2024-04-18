import React from 'react';
import "./FAQ.css"
const FAQ = () => {
  return (
    <>
        <h1>FAQ</h1>

    <div className="faq-container">
      <h2 className="faq-question">¿Qué es LanLab?</h2>
      <p className="faq-answer">
        LanLab es una WebApp que ha nacido para dar servicio a los talentos
        jóvenes de Bizkaia que desean buscar un contacto con el mercado laboral,
        ya sea en forma de prácticas (Programa Lab) o en forma de empleo
        (Programa Lan).
      </p>
      <h2 className="faq-question">¿Cómo veo las oportunidades de empleo?</h2>
      <p className="faq-answer">
        El registro es totalmente gratuito para los talentos que quieran abrirse
        su ficha y conseguir visibilidad. Para las empresas, los primeros meses
        podrán disfrutar de la suscripción gratuita. Una vez hayan probado
        LanLab y hayan comprobado su eficacia, podrán comenzar su suscripción de
        pago, que será un porcentaje de los beneficios.
      </p>
      <h2 className="faq-question">¿Quiénes somos?</h2>
      <p className="faq-answer">
        Somos 4 científicos tech, obsesionados con mejorar la sociedad en la que
        vivimos. Vemos el problema del empleo entre la juventud como un elemento
        clave a solucionar, y como expertos en tecnología de marketing, data,
        full stack y ciberseguridad, quisimos aportar un producto innovador y de
        calidad a Bizkaia. Gracias a BBK Fundazioa, hemos podido hacerlo
        realidad.
      </p>
      <h2 className="faq-question">¿Cómo funciona la elección de candidatos?</h2>
      <p className="faq-answer">
        Mediante un match. El algoritmo entrenado y diseñado para perseguir al
        mejor candidato para el puesto en cuestión. Se acabaron las largas horas
        en descifrar CVs, realizar entrevistas con candidatos que no encajan con
        lo que se esperaba. Se acabaron los rechazos y las no respuestas.
      </p>
      <h2 className="faq-question">¿Cómo se guardan mis datos?</h2>
      <p className="faq-answer">
        Tus datos son totalmente anónimos y cumplen con la legislación y
        tratamiento de datos vigente. Puedes rectificar o eliminar tus datos
        enviándonos un email a <b>data@lanlab.es</b>
      </p>
    </div>
    </>
  );
}

export default FAQ;
