import { Meteor } from 'meteor/meteor';
import React from 'react';
import {  BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//import {  Router, Route, Switch, Link, Redirect  } from 'react-router';
//import createBrowserHistory from 'history/createBrowserHistory'
//const history = createBrowserHistory();
//hola no funcionó mi parte para guardar imagenes :c

import { Tracker } from 'meteor/tracker';

import Home from '../ui/Home';
import Login from '../ui/Login';
import Signup from '../ui/Signup';
import About from '../ui/About';
import Business from '../ui/Business';
import Contact from '../ui/Contact';
import Support from '../ui/Support';
import NotFound from '../ui/NotFound';
import Caro from '../ui/Caro';
import SaveImages from '../ui/SaveImages.js';
import Images from '../ui/Imagenes.js';

import Dashboard from '../ui/Dashboard';
import MaestroDashboard from '../ui/MaestroDashboard';
import MaestroElementos from '../ui/MaestroElementos';
import MaestroElementosNuevo from '../ui/MaestroElementosNuevo';
import UsuarioDashboard from '../ui/UsuarioDashboard';
import Link from '../ui/Link';
import Chat from '../ui/Chat';

import DashboardContainer from '../ui/DashboardContainer';

import { withTracker } from 'meteor/react-meteor-data';

//importacion de la clase maestroAlumnos
import MaestroAlumnos from '../ui/MaestroAlumnos.js';

let isAuthenticated, tipo;
let user;
Tracker.autorun(() => {
  isAuthenticated = !!Meteor.userId(); //doble negacion dice si la cadena esta vacia o no
  //onAuthChange(isAuthenticated);
  console.log('isAuthenticated', isAuthenticated);
});

/*const unauthenticatedPages = ['/signup', '/login'];
const authenticatedPages = ['/teachers'];
const onEnterPublicPage = () => { //si un usuario logueado quiere entrar a una pagina publica lo redirigimos a la seccion privada
  if(Meteor.userId()){
    history.replace('/teachers');
  }
}
const onEnterPrivatePage = () => { //si un usuario no esta logueado lo regresamos al login (previene regresar a un lugar con las flechas)
  if(!Meteor.userId()){
    history.replace('/');
  }
}*/

/*export const onAuthChange = (isAuthenticated) => {
  const pathname = history.location.pathname;
  const isUnauntheticatedPage = unauthenticatedPages.includes(pathname);
  const isAuthenticatedPage = authenticatedPages.includes(pathname);
  isAuthenticated = this.isAuthenticated;
  //
  if(isAuthenticated && isUnauntheticatedPage){//if on unauthenticated page and logged in, redirect to /links
    history.replace('/teachers');
  } else if(!isAuthenticated && isAuthenticatedPage){//if on authenticated page and not logged in redirect to /
    history.replace('/');
  }
}*/

export const routes = (
  <Router>
    <Switch>
      <Route path="/links" component={()=>(<Link/>)}/>               
      <Route exact path="/" component={()=>(<Home isAuthenticated={isAuthenticated}/>)}/>
      <Route path="/login" component={()=>(<Login isAuthenticated={isAuthenticated}/>)}/>
      <Route path="/signup" component={()=>(<Signup isAuthenticated={isAuthenticated}/>)}/>
      <Route path="/about" component={()=>(<About isAuthenticated={isAuthenticated}/>)}/>
      <Route path="/business" component={()=>(<Business isAuthenticated={isAuthenticated}/>)}/>
      <Route path="/contact" component={()=>(<Contact isAuthenticated={isAuthenticated}/>)}/>
      <Route path="/support" component={()=>(<Support isAuthenticated={isAuthenticated}/>)}/>
      {/* No estoy segura de teachers */}
      <Route path="/teachers" component={()=>(<MaestroDashboard isAuthenticated={isAuthenticated}/>)}/>
      <Route path="/caro" component={()=>(<Caro/>)}/> 
      <Route path="/saveImages" component={()=>(<SaveImages/>)}/>   
      <Route path="/imagenes" component={()=>(<Images/>)}/> 
      <Route path="/users" component={()=>(<UsuarioDashboard isAuthenticated={isAuthenticated}/>)}/>    
      <Route path="/dashboard" component={()=>(<DashboardContainer isAuthenticated={isAuthenticated}/>)}/> 
      <Route path="/dashboard/nueva-sesion" component={ ()=>(<DashboardContainer isAuthenticated={isAuthenticated}/>)}/>       
      <Route path="/dashboard/explora" component={ ()=>(<DashboardContainer isAuthenticated={isAuthenticated}/>)}/>       
      <Route path="/dashboard/biblioteca" component={ ()=>(<DashboardContainer isAuthenticated={isAuthenticated}/>)}/>
      <Route path="/dashboard/biblioteca/libros" component={ ()=>(<DashboardContainer isAuthenticated={isAuthenticated}/>)}/>
      <Route path="/dashboard/biblioteca/multimedia" component={ ()=>(<DashboardContainer isAuthenticated={isAuthenticated}/>)}/>
      <Route path="/dashboard/biblioteca/documentos" component={ ()=>(<DashboardContainer isAuthenticated={isAuthenticated}/>)}/>
      <Route path="/dashboard/biblioteca/objetos" component={ ()=>(<DashboardContainer isAuthenticated={isAuthenticated}/>)}/>
      <Route path="/dashboard/biblioteca/elementos" component={ ()=>(<DashboardContainer isAuthenticated={isAuthenticated}/>)}/>
      <Route exact path="/dashboard/alumnos" component={ ()=>(<DashboardContainer isAuthenticated={isAuthenticated} tipo={"maestroAlumnos"}/>)}/>  
      <Route exact path="/dashboard/grupos" component={ ()=>(<DashboardContainer isAuthenticated={isAuthenticated} tipo={"maestroGrupos"}/>)}/> 
      <Route path="/dashboard/multimedia" component={ ()=>(<DashboardContainer isAuthenticated={isAuthenticated}/>)}/>
      <Route path="/dashboard/documentos" component={ ()=>(<DashboardContainer isAuthenticated={isAuthenticated}/>)}/>      
      
      <Route path="*" component={()=>(<NotFound isAuthenticated={isAuthenticated}/>)}/>
    </Switch>
  </Router>
);
