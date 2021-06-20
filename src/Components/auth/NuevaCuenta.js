import React, {useState, useContext, useEffect} from 'react';
import {Link} from 'react-router-dom';
import AlertaContext from '../../Context/alerta/alertaContext';
import AuthContext from '../../Context/autenticacion/authContext';



const NuevaCuenta = (props) => {
    //extraer lod valores del context lo que requerimos

    const alertaContext = useContext(AlertaContext);
    const {alerta, mostrarAlerta} = alertaContext;

    const authContext = useContext(AuthContext);
    const {mensaje,autenticado,registrarUsuario } = authContext;

    //en caso de que el usuario se haya registrado o autenticado o sea un registro duplicado
    useEffect(() => {
        if (autenticado){
            props.history.push('/proyectos');
        }
        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }  // eslint-disable-next-line
    }, [mensaje, autenticado, props.history])


const [usuario, setUsuario] = useState({
    nombre:"",
    email: "",
    password:"",
    confirmar:""
});

// extaer de usuario

const {nombre, email, password, confirmar} = usuario;

    const iniciarSesion = (e) =>{
        const {name, value} = e.target;
        setUsuario({...usuario, [name]:value})

    };
 
    const onSubmit = e =>{
        e.preventDefault();
        //validar campos vacios
        if(nombre.trim() === '' || email.trim() === '' || password.trim() === '' || confirmar.trim() === '' )
        {mostrarAlerta('Todos los campos son obligatorios.', 'alerta-error')
        return;
        }

        //password minimo de 6 caracteres
        if(password.length < 6)
       { mostrarAlerta('La contraseña debe tener almenos 6 caracteres', 'alerta-error');
        return;}
        //los password sean iguales
        if(password !== confirmar){
            { mostrarAlerta('No hay coincidencia en la contraseña', 'alerta-error');
            return;}
        }

        //pasarlo al action
        registrarUsuario({
            nombre,
            password,
            email
        })

    };

    return (  <div className="form-usuario">
                {alerta ? <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div> :null}
                    <div className="contenedor-form sombra-dark">
                        <h1>Obtener una Cuenta</h1>

                        <form onSubmit={onSubmit}>
                        <div className="campo-form">
                                <label htmlFor="nombre">Nombre</label>
                                <input type="text" name="nombre" id="nombre" value={nombre} placeholder="Tu Nombre" onChange={iniciarSesion}/>

                            </div>
                            <div className="campo-form">
                                <label htmlFor="email">Email</label>
                                <input type="email" name="email" id="email" value={email} placeholder="Tu Email" onChange={iniciarSesion}/>

                            </div>
                            <div className="campo-form">
                                <label htmlFor="password">Password</label>
                                <input type="password" name="password" id="password" value={password} placeholder="Tu Password" onChange={iniciarSesion}/>

                            </div>
                            <div className="campo-form">
                                <label htmlFor="confirmar">Confirmar Password</label>
                                <input type="password" name="confirmar" id="confirmar" value={confirmar} placeholder="Repite tu Password" onChange={iniciarSesion}/>

                            </div>
                            <div className="campo-form">
                                <input type="submit" value="Registrarse" className="btn btn-primario btn-block"/>
                            </div>

                        </form>
                        <Link to={'/'} className="enlace-cuenta">
                        Volver a Iniciar Sessión
                        </Link>
                    </div>
        
    </div>);
}
 
export default NuevaCuenta;