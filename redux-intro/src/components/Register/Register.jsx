import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Register.style.scss'

const Register = () => {
  const [selectedOption, setSelectedOption] = useState('')
  const navigate = useNavigate()

  const handleClick = (e) => {
    setSelectedOption(e.target.value)
  }

  useEffect(() => {
    if (selectedOption === 'Alumnos') {
      setTimeout(() => navigate('/register/alum'), 200)
    } else if (selectedOption === 'Organismos') {
      setTimeout(() => navigate('/register/org'), 200)
    }
  }, [selectedOption])

  return (
    <div className="main">
      <div className="main__container">
        <button
          className="main__container__button"
          type="text"
          value="Alumnos"
          onClick={handleClick}>
          Alumnos
        </button>
        <button
          className="main__container__button"
          type="text"
          value="Organismos"
          onClick={handleClick}>
          Organismos
        </button>
      </div>
    </div>
  )
}

export default Register
