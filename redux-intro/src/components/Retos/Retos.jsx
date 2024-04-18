import './Retos.style.scss'

const Retos = () => {
  return (
    <>
    <h1>Retos Diarios</h1>
      <h2>
        ¿Qué lenguaje de marcado se utiliza para estructurar el contenido de una
        página web?
      </h2>
      <div className="container">
        <div className="column">
          <p className="container__res">A - JavaScript</p>
          <p className="container__res">B - CSS</p>
        </div>
        <div className="column">
          <p className="container__res">C - HTML</p>
          <p className="container__res">D - XML</p>
        </div>
      </div>
    </>
  )
}

export default Retos
