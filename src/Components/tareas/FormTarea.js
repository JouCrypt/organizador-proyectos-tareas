import React, {useContext, useState, useEffect} from 'react';
import proyectoContext from '../../Context/proyectoContext';
import tareaContex from '../../Context/Tarea/tareaContext';


const FormTarea = () => {
      //extraer si un prqoyecto está activo

      const poryectosContext = useContext (proyectoContext);
      const {proyecto} = poryectosContext;
//
      const tareasContext = useContext(tareaContex);
      const { tareaseleccionada, errorTarea,agregarTareas, validarTarea, obtenerTareas, actualizarTarea, limipiarTarea} = tareasContext;  

      //detecta si hay tarea seleccionada
      useEffect(() => {
          if(tareaseleccionada !==null)
          setTarea(tareaseleccionada);
          else
           setTarea({nombre:''})
          
      }, [tareaseleccionada]);

      //state del formulario
      const [tarea, setTarea] = useState({
        nombre:''
      });

      //extraer nombre del proyecto
      const {nombre} = tarea;

        //si no hay proyecto seleccionado
     if(!proyecto) return null;

     //array destructuring para extraer el proyecto actual
         const [proyectoActual] = proyecto;


      const handleChange = e =>{
          const {name, value} = e.target;
          setTarea({...tarea,[name]:value})
      };

      
         const onSubmit = e =>{
             e.preventDefault();

             //validar
            if(nombre.trim() === ''){
                validarTarea();
                return;
            }

            //validar si es edicion o si es nueva tarea
            if(tareaseleccionada === null){
                //tareNueva
                 //agregar la nueva tarea al state de tareas
             tarea.proyecto = proyectoActual._id;
             agregarTareas(tarea);
            } else 
            { //actualizar tarea existente 
                actualizarTarea(tarea);
                //elimina tarea seleccionada del state
                limipiarTarea();
            }


            

             //obtener y filtrar las tareas del proyecto actual
             obtenerTareas(proyectoActual._id);

             //reiniciar el form
             setTarea({nombre:''})
         };

    return (  <div className="formulario">
        <form onSubmit={onSubmit}>
            <div className="contenedor-input">
                <input type="text" className="input-text" name="nombre" value={nombre} placeholder="Nombre Tarea..." onChange={handleChange}/>
            </div>
            <div className="contenedor-input">
                <input type="submit" className="btn btn-primario btn-block btn-submit" name="nombre" value={tareaseleccionada ? "Editar tarea" : "Agregrar Tarea"}/>
            </div>
        </form>
        {errorTarea ?<p className="mensaje error">El nombre de la tarea es obligatorio</p> : null}
    </div> );
}
 
export default FormTarea;