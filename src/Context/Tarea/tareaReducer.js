import {TAREAS_PROYECTO,
AGREGAR_TAREAS,
VALIDAR_TAREAS,
ELIMINAR_TAREA,
TAREA_ACTUAL,
ESTADO_TAREA,
ACTUALIZAR_TAREA,
LIMPIAR_TAREA
} from '../../Types/index';




export default (state,action) =>{
    switch(action.type){
case TAREAS_PROYECTO:
    return{
        ...state,tareasproyecto: action.payload
    }

case AGREGAR_TAREAS:
    return{
        ...state,
        tareasproyecto: [...state.tareasproyecto, action.payload],
        errorTarea:false
    }

case VALIDAR_TAREAS:
    return{
        ...state,
        errorTarea:true
    }

case ELIMINAR_TAREA:
    return{
        ...state, 
        tareasproyecto: state.tareasproyecto.filter(tarea => tarea._id !== action.payload)
    }

case ACTUALIZAR_TAREA:
case ESTADO_TAREA:
    return { 
        ...state, tareasproyecto: state.tareasproyecto.map(tarea => tarea._id === action.payload._id ? action.payload : tarea)
    }

case TAREA_ACTUAL:
    return{
        ...state, tareaseleccionada: action.payload
        
    }
case LIMPIAR_TAREA:
    return{
        ...state,  tareaseleccionada: null
    }

   
        default:  
          return state;
    }
}