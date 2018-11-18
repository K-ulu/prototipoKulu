import React from 'react';
import { withRouter } from "react-router-dom";

//importando contenido general de la interfaz
import HeaderBar from './components/HeaderBar';
import LeftSidebar from './components/LeftSidebar';
//importando contenido principal
import ContenidoPrincipalUser from './components/ContenidoPrincipalUser';
//importando componente explora
import Explora from './Explora';
//importando componentes de la biblioteca
import BibliotecaDocumentos from './BibliotecaDocumentos';
import BibliotecaElementos from './BibliotecaElementos';
import BibliotecaLibros from './BibliotecaLibros';
import BibliotecaMultimedia from './BibliotecaMultimedia';
import BibliotecaObjetos from './BibliotecaObjetos';

class UsuarioDashboard extends React.Component {  

  render () {    
    //variable que almacena el contenido segun la url visitada
    let contenido = null;
    let pathname = this.props.history.location.pathname;

    if(pathname == '/dashboard' || pathname == '/dashboard/'){
      contenido = <ContenidoPrincipalUser/>
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
    }



    return (
      <div id="main" className="enlarged">  

        {/*<!-- top bar navigation -->*/}
        <HeaderBar/>

        {/*Wrapper*/}
        <div id="wrapper">

          {/*Left Sidebar*/}
          <LeftSidebar tipo="alumno"/>

          {/*Content*/}
          <div id="page-content-wrapper">
            <div className="content">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-xl-12">
                    <div className="breadcrumb-holder">
                      <h1 className="main-title float-left">{ this.props.history.location.pathname }</h1>
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

export default withRouter(UsuarioDashboard);
