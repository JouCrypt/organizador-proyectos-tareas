import {REGISTRO_EXITOSO, 
    REGISTRO_ERROR,
    OBTENER_USUARIO,
 LOGIN_EXITOSO,
LOGIN_ERROR, 
 CERRAR_SESION} from '../../Types/index';

export default (state, action) => {

    switch(action.type){
        case LOGIN_EXITOSO:
        case REGISTRO_EXITOSO:
         localStorage.setItem('token', action.payload.token);
         return{
             ...state,
             autenticado:true,
             mensaje: null,
             cargando:false
         }
         case LOGIN_ERROR:
         case CERRAR_SESION:
         case REGISTRO_ERROR:
             localStorage.removeItem('token');
             return {
                 ...state, 
                 token:null,
                 usuario:null,
                 autenticado:null,
                 mensaje: action.payload,
                 cargando:false
             }
            
        case OBTENER_USUARIO:
            return{
                ...state,
                autenticado:true,
                cargando:false,
                usuario: action.payload
            }

        default:
            return state;
    }
}