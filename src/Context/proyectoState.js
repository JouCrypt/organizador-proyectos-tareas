import React, {useReducer} from 'react';
import proyectoContext from './proyectoContext';
import proyectoReducer from './proyectoReducer';
import { FORMULARIO_PROYECTO, 
    OBTENER_PROYECTO,
    AGREGAR_PROYECTO,
    VALIDADOR_FORMULARIO,
    PROYECTO_ACTUAL,
    ELIMINAR_PROYECTO,
    PROYECTO_ERROR
} from '../Types';
import clienteAxios from '../config/axios';




const ProyectoState = props => {

 

    const initialState = {
         proyectos : [],
            formulario: false,
            errorFormulario:false,
            proyecto:null,
            mensaje:null
    }
    // dispatch para ejecutar las acciones

    const [state, dispatch] = useReducer(proyectoReducer, initialState)

    // Serie de funciones para el CRUD
    const mostrarFormulario = () =>{
        dispatch({
            type: FORMULARIO_PROYECTO

        })
    };

    //obtener los proyectos

    const obtenerProyectos = async () =>{
        try {
            const resultado = await clienteAxios.get('/api/proyectos');
            //console.log(resultado.data)

            dispatch({
                type: OBTENER_PROYECTO,
                payload: resultado.data
               
             })
            
        } catch (error) {
            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }
    
            dispatch({
                type:PROYECTO_ERROR,
                payload: alerta
            })
          
        }
    };
//agregar nuevo proyecto
const agregarProyecto= async proyecto=>{
    try {   
            const resultado = await clienteAxios.post('/api/proyectos', proyecto);
           // console.log(resultado.data);
            // insertar proyecto en el state con el dispatch
                dispatch({
                type:AGREGAR_PROYECTO,
                payload: resultado.data
                })


        
    } catch (error) {
        const alerta = {
            msg: error.response.data.msg,
            categoria: 'alerta-error'
        }

        dispatch({
            type:PROYECTO_ERROR,
            payload: alerta
        })
      
    }


};

//VALIDA EL FORMULARIO POR ERRORES
const mostrarError = () =>{
    dispatch({
        type: VALIDADOR_FORMULARIO
    })
};
//selecciona el proyecto que el usuario dio  click

const proyectoActual = proyectoId =>{

    dispatch({
        type:PROYECTO_ACTUAL,
        payload: proyectoId
    })
};

//ELIMINAR UN PROYECTO
const eliminarProyecto= async proyectoId =>{
    try {

        await clienteAxios.delete(`/api/proyectos/${proyectoId}`);
        dispatch({
            type:ELIMINAR_PROYECTO, 
            payload: proyectoId
        })
                      
    } catch (error) {
        const alerta = {
            msg: error.response.data.msg,
            categoria: 'alerta-error'
        }

        dispatch({
            type:PROYECTO_ERROR,
            payload: alerta
        })
      
    }
};

    return (
        <proyectoContext.Provider value={{errorFormulario:state.errorFormulario,
                                         proyecto:state.proyecto,
                                         proyectos: state.proyectos, 
                                         formulario : state.formulario, 
                                         mensaje: state.mensaje,
                                         mostrarFormulario,
                                         obtenerProyectos,
                                         agregarProyecto,
                                         proyectoActual,
                                         mostrarError,
                                         eliminarProyecto}}>

            {props.children}
        </proyectoContext.Provider>
    )

}
export default ProyectoState