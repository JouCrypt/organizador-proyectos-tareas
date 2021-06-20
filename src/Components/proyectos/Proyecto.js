import React, {useContext} from 'react';
import proyectoContext from '../../Context/proyectoContext';
import tareaContex from '../../Context/Tarea/tareaContext';

const Proyecto = ({proyecto}) => {

//obtenet el state del proyectos

const poryectosContext = useContext (proyectoContext);
const {proyectoActual} = poryectosContext;

//obtener la funcion del contex de tarea
const tareasContext = useContext(tareaContex);
const {obtenerTareas} = tareasContext;

//funcion para agregar el proyecto actual

const seleccionarProyecto = id => {
proyectoActual(id); //fijar proyecto actual
obtenerTareas(id); //filtrar las tareas cuando se de click
};

    return ( <li>
            <button type="button" className="btn btn-blank" onClick={() => seleccionarProyecto(proyecto._id)}>
                {proyecto.nombre}
            </button>
    </li>);
}
 
export default Proyecto;