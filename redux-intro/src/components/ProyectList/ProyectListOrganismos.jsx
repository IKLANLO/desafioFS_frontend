import * as React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
import { getProyects, reset } from '../../redux/organismos/organismosSlice'
import ProyectDetailOrg from './ProyectDetailOrg/ProyectDetailOrg'
import { notification } from 'antd'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'

const ProyectListOrganismos = () => {
  const dispatch = useDispatch()
  const { isSuccess, isError, message, organismo, proyectos } = useSelector(
    (state) => state.organ
  )

  useEffect(() => {
    if (isError) {
      notification.error({
        description: message,
      })
    }
    dispatch(reset())
  }, [isSuccess, isError, message])

  useEffect(() => {
    try {
      console.log('organismo', organismo)
      dispatch(getProyects(organismo._id))
      // dispatch(getProyects('65ff1dcdaf39de81e04a49c4'))
    } catch (error) {
      console.log(error)
    }
  }, [dispatch])

  const handleProyectDetail = (proyecto) => {
    return <ProyectDetailOrg />
  }

  return (
    <>
      {proyectos.map((proyecto) => (
        <div key={proyecto._id}>
          <List
            className="list"
            sx={{
              width: '100%',
              maxWidth: 360,
              bgcolor: '#efe8e8',
            }}>
            <ListItem onClick={() => handleProyectDetail(proyecto)}>
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary={proyecto.Titulo}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: 'block' }}
                      component="span"
                      variant="body2"
                      color="text.primary">
                      {proyecto.Descripcion}
                    </Typography>
                    {proyecto.Estado}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </List>
        </div>
      ))}
    </>
  )
}

export default ProyectListOrganismos
