import React, {useState, useContext, useEffect} from 'react';
import {Link} from 'react-router-dom';
import AlertaContext from '../../Context/alerta/alertaContext';
import AuthContext from '../../Context/autenticacion/authContext';

const Login = (props) => {

//extraer lod valores del context lo que requerimos

const alertaContext = useContext(AlertaContext);
const {alerta, mostrarAlerta} = alertaContext;

const authContext = useContext(AuthContext);
const {mensaje,autenticado, iniciarSesion } = authContext;

const [usuario, setUsuario] = useState({
    email: "",
    password:""
});

useEffect(() => {
     if (autenticado){
        props.history.push('/proyectos');
     }
    if(mensaje){
        mostrarAlerta(mensaje.msg, mensaje.categoria);
    }  
    // eslint-disable-next-line
}, [mensaje, autenticado, props.history])

// extaer de usuario

const {email, password} = usuario;

    const handlerChange = (e) =>{
        const {name, value} = e.target;
        setUsuario({...usuario, [name]:value})

    };
 
    const onSubmit = e =>{
        e.preventDefault();
        //validar campos vacios
        if(email.trim()=== "" || password.trim() ==="")           
         {mostrarAlerta('Todos los campos son obligatorios.', 'alerta-error')
        return;
        }
 
        //pasarlo al action
        iniciarSesion({email,password});

    };

    return (  <div className="form-usuario">
             {alerta ? <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div> :null}
                    <div className="contenedor-form sombra-dark">
                        <h1>Iniciar Sesión</h1>

                        <form onSubmit={onSubmit}>
                            <div className="campo-form">
                                <label htmlFor="email">Email</label>
                                <input type="email" name="email" id="email" value={email} placeholder="Tu Email" onChange={handlerChange}/>

                            </div>
                            <div className="campo-form">
                                <label htmlFor="password">Password</label>
                                <input type="password" name="password" id="password" value={password} placeholder="Tu Password" onChange={handlerChange}/>

                            </div>
                            <div className="campo-form">
                                <input type="submit" value="Iniciar Sesión" className="btn btn-primario btn-block"/>
                            </div>

                        </form>
                        <Link to={'/nueva-cuenta'} className="enlace-cuenta">
                        Obtener Cuenta
                        </Link>
                    </div>
        
    </div>);
}
 
export default Login;