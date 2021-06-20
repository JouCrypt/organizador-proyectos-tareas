import React,{useContext, useEffect} from 'react';
import Sidebar from '../layout/Sidebars'
import FormTareas from '../tareas/FormTarea';
import Barra from '../layout/Barra';
import ListadoTareas from '../tareas/ListadoTareas';
import AuthContext from '../../Context/autenticacion/authContext';

const Proyectos = () => {

    //extraer la informacion de autenticacion
    const authContext = useContext(AuthContext);
    const {usuarioAutenticado} = authContext;

    useEffect(() => {
        usuarioAutenticado();
        // eslint-disable-next-line
    }, [])


    return (  <div className="contenedor-app">
        <Sidebar/>
        <div className="seccion-principal">
            <Barra/>
            <main>
                <FormTareas/>
                <div className="contenedor-tareas">
                <ListadoTareas/>
            </div>

            </main> 
        </div>
    </div>);
}
 
export default Proyectos;