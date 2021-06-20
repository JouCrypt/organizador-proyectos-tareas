import { AGREGAR_PROYECTO, 
    FORMULARIO_PROYECTO,
     OBTENER_PROYECTO,
     VALIDADOR_FORMULARIO,
     PROYECTO_ACTUAL,
     PROYECTO_ERROR,
     ELIMINAR_PROYECTO} from '../Types';



export default (state, action) => {
    switch(action.type) {
        case FORMULARIO_PROYECTO:
            return {
                ...state,formulario : true
            }
        case OBTENER_PROYECTO:
            return{
                ...state,  
                proyectos: action.payload
            }
        case AGREGAR_PROYECTO:
            return{
                ...state,
                proyectos: [...state.proyectos, action.payload],
                formulario : false,
                errorFormulario:false
            }
        case VALIDADOR_FORMULARIO:
            return{
                ...state, errorFormulario: true

            }
    //selecciona el proyecto que el usuario dio  click
        case PROYECTO_ACTUAL:
            return{
                ...state, 
                proyecto: state.proyectos.filter(proyecto=>proyecto._id===action.payload)
            }

        case ELIMINAR_PROYECTO:
        return {
            ...state,
            proyectos: state.proyectos.filter(proyecto=>proyecto._id!==action.payload),
            proyecto: null

        }
        case PROYECTO_ERROR:
            return {
                ...state,
                mensaje: action.payload
            }
        
        default: return state;
    } 
}