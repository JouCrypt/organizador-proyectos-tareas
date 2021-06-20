import React, {useContext} from 'react';
import proyectoContext from '../../Context/proyectoContext';
import tareaContex from '../../Context/Tarea/tareaContext';



const Tarea = ({tarea}) => {

    //obtenet el state del proyectos

const poryectosContext = useContext (proyectoContext);
const {proyecto} = poryectosContext;

//extraer el proyecto

    const [ proyectoActual] = proyecto;

    const tareasContext = useContext(tareaContex);
    const {eliminarTarea, obtenerTareas, actualizarTarea, guardarTareaActual} = tareasContext;
    
    
    //funcion que se ejecuta cuando el usuario elimina una tarea
    const tareaEliminar = tarea =>{
        eliminarTarea(tarea);
        obtenerTareas(proyectoActual._id);
    };


//funncion que modifica el estado de la tarea
 const cambiarEstado = tarea =>{
        if(tarea.estado)
            tarea.estado = false;
        else
            tarea.estado = true;
        
            actualizarTarea(tarea);

 };

 //agregar una tarea actual cuando el usuario desea editarla

 const seleccionarTarea = tarea =>{
    guardarTareaActual(tarea);
 };

    return ( <li className="tarea sombra"><p>{tarea.nombre}</p>
            <div className="estado">
                {tarea.estado ? <button type="button" className="completo" onClick={()=>cambiarEstado(tarea)}>Completo</button> : <button type="button" className="incompleto" onClick={()=>cambiarEstado(tarea)}>Incompleto</button>}
            </div>
            <div className="acciones">
                <button type="button" className="btn btn-primario" onClick={()=>seleccionarTarea(tarea)}>Editar</button>
                <button type="button" className="btn btn-secundario" onClick={()=>tareaEliminar(tarea)}>Eliminar</button>
            </div>
            </li> 
    );
}
 
export default Tarea;