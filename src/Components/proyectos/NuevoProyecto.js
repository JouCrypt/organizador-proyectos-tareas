import React, {Fragment, useContext, useState} from 'react';
import proyectoContext from '../../Context/proyectoContext';


const NuevoProyecto = () => {

    //obtenet el state del formulario

    const poryectosContext = useContext (proyectoContext);
    const {formulario,errorFormulario, mostrarFormulario,agregarProyecto,mostrarError} = poryectosContext;

    const [proyecto, setProyecto] = useState({nombre:""});


    const{nombre}=proyecto;

    const onChangeProyecto= e =>{
        const {name, value} = e.target;
        setProyecto({...proyecto, [name]:value})
    };

    const onSubmitProyecto = e =>{
        e.preventDefault();
        //validar proyecto
        if (nombre === ''){
            mostrarError();
            return;}


        //agregar state
        agregarProyecto(proyecto);


        //reiniciar el form
        setProyecto({nombre:''});
        
    };



    return (
       <Fragment>
        <button type="button" className="btn btn-block btn-primario" onClick={()=>mostrarFormulario()} >Nuevo Proyecto</button >
      {formulario ? <form className="formulario-nuevo-proyecto" onSubmit={onSubmitProyecto}>
           <input type="text" name="nombre" className="input-text" placeholder="Nombre del Proyecto" value={nombre} onChange={onChangeProyecto}/>
           <input type="submit" className="btn btn-block btn-primario" value="Agregar Proyecto"/>
       </form>:null}
       {errorFormulario ? <p className="mensaje error">El nombre del Proyecto es Obligatorio</p>: null}
       </Fragment>
    );
}
 
export default NuevoProyecto;