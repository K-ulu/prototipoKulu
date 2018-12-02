import React from 'react';
import { withRouter } from "react-router-dom";

//importando contenido general de la interfaz
import HeaderBar from './components/HeaderBar';
import LeftSidebar from './components/LeftSidebar';
//importando pagina principal
import ContenidoPrincipalMaestro from './components/ContenidoPrincipalMaestro';
//importando componente explora
import Explora from './Explora';
//importando componentes de la biblioteca
import BibliotecaDocumentos from './BibliotecaDocumentos';
import BibliotecaElementos from './BibliotecaElementos';
import BibliotecaLibros from './BibliotecaLibros';
import BibliotecaMultimedia from './BibliotecaMultimedia';
import BibliotecaObjetos from './BibliotecaObjetos';
//importando pagina perfil
import Perfil from './Perfil';

//importando componente para crear nueva sesion
import NuevaSesionContainer from './NuevaSesionContainer';
import NuevaSesion from './NuevaSesion';
import ConfiguraSesion from './components/nuevaSesion/ConfiguraSesion';
//importando componentes para admin de grupos y alumnos
import MaestroAlumnos from './MaestroAlumnos';
import MaestroGrupos from './MaestroGrupos';
//importando componentes privados documentos y cont multimedia
import MaestroContenidoMultimedia from './MaestroContenidoMultimedia';
import MaestroDocumentos from './MaestroDocumentos';

class MaestroDashboard extends React.Component {
  render () {
    //variable que almacena el contenido segun la url visitada
    let contenido = null;
    let pathname = this.props.history.location.pathname;
    
    if(pathname == '/dashboard' || pathname == '/dashboard/'){
      contenido = <ContenidoPrincipalMaestro/>;
    } else if(pathname == '/dashboard/explora' || pathname == '/dashboard/explora/'){
      contenido = <Explora/>
    } else if(pathname == '/dashboard/biblioteca/libros' || pathname == '/dashboard/biblioteca/libros/'){
      contenido = <BibliotecaLibros/>
    } else if(pathname == '/dashboard/biblioteca/multimedia' || pathname == '/dashboard/biblioteca/multimedia/'){
      contenido = <BibliotecaMultimedia/>
    } else if(pathname == '/dashboard/biblioteca/documentos' || pathname == '/dashboard/biblioteca/documentos/'){
      contenido = <BibliotecaDocumentos/>
    } else if(pathname == '/dashboard/biblioteca/objetos' || pathname == '/dashboard/biblioteca/objetos/'){
      contenido = <BibliotecaObjetos/>
    } else if(pathname == '/dashboard/biblioteca/elementos' || pathname == '/dashboard/biblioteca/elementos/'){
      contenido = <BibliotecaElementos/>
    } else if(pathname == '/dashboard/multimedia' || pathname == '/dashboard/multimedia/'){
      contenido = <MaestroContenidoMultimedia/>
    } else if(pathname == '/dashboard/documentos' || pathname == '/dashboard/multimedia/'){
      contenido = <MaestroDocumentos/>
    } else if(pathname == '/dashboard/alumnos' || pathname == '/dashboard/alumnos/'){
      contenido = <MaestroAlumnos/>;
    } else if(pathname == '/dashboard/grupos' || pathname == '/dashboard/grupos/'){
      contenido = <MaestroGrupos/>;
    } else if(pathname == '/dashboard/nueva-sesion' || pathname == '/dashboard/nueva-sesion/'){
      contenido = <NuevaSesion/>;
      //contenido = <ConfiguraSesion/>;
    } else if(pathname == '/dashboard/perfil' || pathname == '/dashboard/perfil/'){
      contenido = <Perfil/>
    }

    return (
      <div id="main" className="enlarged">  

        {/*<!-- top bar navigation -->*/}
        <HeaderBar history={ this.props.history }/>

        {/*Wrapper*/}
        <div id="wrapper">

          {/*Left Sidebar*/}
          <LeftSidebar tipo="maestro"/>

          {/*Content*/}
          <div id="page-content-wrapper">
            <div className="content">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-xl-12">
                    <div className="breadcrumb-holder">
                      <h1 className="main-title float-left d-none d-md-block">{ this.props.history.location.pathname }</h1>
                      <ol className="breadcrumb float-right">
                        <li className="breadcrumb-item">Home</li>
                        <li className="breadcrumb-item active">Dashboard</li>
                      </ol>
                      <div className="clearfix"></div>
                    </div>
                  </div>
                </div>

                { contenido }  

              </div>          
            </div>
          </div>
          {/*End Content*/}
      
        </div>
        {/*End Wrapper*/}

      </div>
    );
  }
}

export default withRouter(MaestroDashboard);