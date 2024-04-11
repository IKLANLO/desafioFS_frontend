import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getProyects } from '../../redux/organismos/organismosSlice'
import { notification } from 'antd'

const ProyectListOrganismos = () => {
  const dispatch = useDispatch()
  const { isSuccess, isError, message } = useSelector((state) => state.organ)

  useEffect(() => {
    if (isSuccess) {
      notification.success({
        description: message,
      })
      // setTimeout(() => navigate('/login'), 1000)
    } else if (isError) {
      notification.error({
        description: message,
      })
    }

    dispatch(reset())
  }, [isSuccess, isError, message])

  useEffect(() => {
    try {
    } catch (error) {}
    dispatch(getProyects())
  }, [])

  return <p>Proyects</p>
}

export default ProyectListOrganismos
