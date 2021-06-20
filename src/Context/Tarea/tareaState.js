import React,{useReducer} from 'react';
import TareaContex from './tareaContext';
import TareaReducer from './tareaReducer';
import {TAREAS_PROYECTO,
    AGREGAR_TAREAS,
    VALIDAR_TAREAS,
    ELIMINAR_TAREA,
    ESTADO_TAREA,
    TAREA_ACTUAL,
    ACTUALIZAR_TAREA,
    LIMPIAR_TAREA
} from '../../Types/index';
import clienteAxios from '../../config/axios';



const TareaState = props => {
const initialState = {
  
  tareasproyecto: [],
  errorTarea: false,
  tareaseleccionada:null
};

//crear las funciones


//crear dispatch y state

//obtener tareas de un objeto especifico

const obtenerTareas = async proyecto =>{
    try {
       

        const respuesta =await  clienteAxios.get('/api/tareas', {params: {proyecto}});
        
    
        dispatch({
            type: TAREAS_PROYECTO,
            payload: respuesta.data.tareas
        })
    } catch (error) {
        console.log(error.response);
    }

} 
//crear dispatch y state
const [ state, dispatch] = useReducer(TareaReducer, initialState);

// agregar tareas
const agregarTareas = async tarea=>{
   try {

    await clienteAxios.post('/api/tareas', tarea);
   // console.log(resultado);

    dispatch({
        type:AGREGAR_TAREAS,
        payload:tarea
    })
   } catch (error) {
       console.log(error.response);
   }
    
};

//EDITA MODIFICA UNA TAREA
const actualizarTarea = async tarea =>{
   try {               
        await clienteAxios.put(`/api/tareas/${tarea._id}`,tarea);


    dispatch({
        type: ACTUALIZAR_TAREA,
        payload: tarea
    })
   } catch (error) {
    console.log(error.response);
   }
}

//valida y muestra un error 
const validarTarea = () =>{
    dispatch({
        type: VALIDAR_TAREAS
    })
};
 
//ELIMINAR TAREA
const eliminarTarea = async tarea =>{
    try {
           let {proyecto} = tarea;
           //console.log(proyecto);
            await clienteAxios.delete(`/api/tareas/${tarea._id}`, {params: {proyecto}});

        dispatch({
            type: ELIMINAR_TAREA,
            payload: tarea._id
        })
    } catch (error) {
        console.log(error.response);
    }
    
};

//Cambia el estado de cada tarea
const cambiarEstadoTarea = tarea =>{
 dispatch({
     type: ESTADO_TAREA,
     payload: tarea
 })

};

//EXTRAE UNA TAREA PARA EDICION
const guardarTareaActual= tarea =>{
    dispatch({
        type:TAREA_ACTUAL,
        payload:tarea
    })
};
//elimina la tarea selecionada
const limipiarTarea = () =>{
  dispatch({
    type: LIMPIAR_TAREA
  })
};


return (
    <TareaContex.Provider value={{
        tareasproyecto: state.tareasproyecto,
        errorTarea: state.errorTarea,
        tareaseleccionada: state.tareaseleccionada,
        obtenerTareas,
        agregarTareas,
        validarTarea,
        eliminarTarea,
        cambiarEstadoTarea,
        guardarTareaActual,
        actualizarTarea,
        limipiarTarea
    }}>

       {props.children}
    </TareaContex.Provider>
)

}
export default TareaState;
