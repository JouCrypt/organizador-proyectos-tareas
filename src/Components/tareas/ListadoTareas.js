import React, {Fragment, useContext} from 'react';
import Tarea from './Tarea';
import proyectoContext from '../../Context/proyectoContext';
import tareaContex from '../../Context/Tarea/tareaContext';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import swal from 'sweetalert';

const Listadotareas = () => {

    //obtenet el state del formulario

    const poryectosContext = useContext (proyectoContext);
    const {proyecto, eliminarProyecto} = poryectosContext;

    //obtener la lista del contex de tarea
const tareasContext = useContext(tareaContex);
const {tareasproyecto} = tareasContext;

     //si no hay proyecto seleccionado
     if(!proyecto) return <h2>Selecciona un proyecto</h2>;

//array destructuring para extraer el proyecto actual
    const [proyectoActual] = proyecto;

   


    

    const eliminarP = ()=>{
        if(tareasproyecto.length!==0){
            swal("No se puede eliminar proyecto!", "...elimina primero las tareas!");
            return;
        }

        eliminarProyecto(proyectoActual._id)
    };


    return ( 
                <Fragment>
            <h2>Proyecto: {proyectoActual.nombre}</h2> 
            <ul className="listado-tareas">
                {tareasproyecto.length===0
                ?(<li className="tarea"><p>No hay tareas</p></li>): <TransitionGroup>{tareasproyecto.map(tarea=>(<CSSTransition key ={tarea._id} timeout={200} className="tarea"><Tarea  tarea={tarea}/></CSSTransition> ))} </TransitionGroup>}
                
            </ul>
            <button type="button" className="btn btn-eliminar" onClick={eliminarP}>Eliminar Proyecto &times; </button>
            </Fragment>
    )};
 
export default Listadotareas;