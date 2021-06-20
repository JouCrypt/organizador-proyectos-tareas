import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from './Components/auth/Login';
import NuevaCuenta from './Components/auth/NuevaCuenta';
import Proyectos from './Components/proyectos/Proyectos';
import ProyectoState from './Context/proyectoState';
import TareaState from './Context/Tarea/tareaState';
import AlertaState from './Context/alerta/alertaState';
import tokenAuth from'./config/token';
import AuthState from './Context/autenticacion/authState';
import RutaPrivada from './Components/rutas/RutaPrivada';

const token = localStorage.getItem('token');
if(token){
//funcion para enviar el token por headers
tokenAuth(token);
}

function App() {



//  console.log(process.env.REACT_APP_BACKEND_URL);
  return (
    <ProyectoState>
      <TareaState>
        <AlertaState>
          <AuthState>
   <Router>
     <Switch>
       <Route exact path="/" component = {Login}/>
       <Route exact path="/nueva-cuenta" component = {NuevaCuenta}/>
       <RutaPrivada exact path="/proyectos" component = {Proyectos}/>
     </Switch>

   </Router>
   </AuthState>
   </AlertaState>
   </TareaState>
   </ProyectoState>
  );
}

export default App;
