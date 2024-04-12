import {useSelector} from "react-redux"
const Profile = () => {
    const {user} = useSelector((state) => state.alum)

    return(
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
        </>
    );
};
export default Profile;