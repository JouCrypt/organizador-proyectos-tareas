import React, {useContext, useEffect} from 'react';
import Proyecto from './Proyecto';
import ProyectoContext from '../../Context/proyectoContext';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import AlertaContext from '../../Context/alerta/alertaContext';


const ListadoProyectos = () => {

    //extraer proyectos de state inicial
    const poryectosContext = useContext (ProyectoContext);
    const {mensaje,proyectos, obtenerProyectos} = poryectosContext;

    //extraer alerta
    const alertaContext = useContext (AlertaContext);
    const {alerta, mostrartAlerta} = alertaContext;

    
    //obtener proyectos cuando carga el componente
    useEffect(() => {

        //si hay error
        if(mensaje){
            mostrartAlerta(mensaje.msg,mensaje.categoria);
        }
        obtenerProyectos();
        // eslint-disable-next-line
    }, [mensaje]);


    //revisar si proyectos tiene contenido
    if(proyectos.length === 0) return null;

    
    return (  <ul className="listado-proyectos">
        {alerta ? <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>:null}
        <TransitionGroup>{proyectos.map(proyecto=>(<CSSTransition key={proyecto._id} timeout={200} classNames="proyecto"><Proyecto  proyecto={proyecto}/></CSSTransition>))}</TransitionGroup>
    </ul>);
}
 
export default ListadoProyectos;