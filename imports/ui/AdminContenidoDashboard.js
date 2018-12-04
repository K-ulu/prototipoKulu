import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withRouter } from "react-router-dom";

//importando contenido general de la interfaz
import HeaderBar from './components/HeaderBar';
import LeftSidebar from './components/LeftSidebar';
//importando pagina principal
import ContenidoPrincipalAdminContenido from './components/ContenidoPrincipalAdminContenido';
//importando componentes de la biblioteca
import BibliotecaDocumentos from './BibliotecaDocumentos';
import BibliotecaElementos from './BibliotecaElementos';
import BibliotecaLibros from './BibliotecaLibros';
import BibliotecaMultimedia from './BibliotecaMultimedia';
import BibliotecaObjetos from './BibliotecaObjetos';
//importando componentes de material educativo
import AdminContenidoMaterias from './AdminContenidoMaterias';
import AdminContenidoBloques from './AdminContenidoBloques';
import AdminContenidoTemas from './AdminContenidoTemas';


class AdminContenidoDashboard extends React.Component {
  render () {
    //variable que almacena el contenido segun la url visitada
    let contenido = null;
    let pathname = this.props.history.location.pathname;
    
    if(pathname == '/dashboard' || pathname == '/dashboard/'){
      contenido = <ContenidoPrincipalAdminContenido/>;
    } else if(pathname == '/dashboard/biblioteca/libros' || pathname == '/dashboard/biblioteca/libros/'){
      contenido = <BibliotecaLibros tipo="adminContenido"/>
    } else if(pathname == '/dashboard/biblioteca/multimedia' || pathname == '/dashboard/biblioteca/multimedia/'){
      contenido = <BibliotecaMultimedia tipo="adminContenido"/>
    } else if(pathname == '/dashboard/biblioteca/documentos' || pathname == '/dashboard/biblioteca/documentos/'){
      contenido = <BibliotecaDocumentos tipo="adminContenido"/>
    } else if(pathname == '/dashboard/biblioteca/objetos' || pathname == '/dashboard/biblioteca/objetos/'){
      contenido = <BibliotecaObjetos tipo="adminContenido"/>
    } else if(pathname == '/dashboard/biblioteca/elementos' || pathname == '/dashboard/biblioteca/elementos/'){
      contenido = <BibliotecaElementos tipo="adminContenido"/>
    } else if(pathname == '/dashboard/programa/materias' || pathname == '/dashboard/programa/materias/'){
      contenido = <AdminContenidoMaterias/>
    } else if(pathname == '/dashboard/programa/bloques' || pathname == '/dashboard/programa/bloques/'){
      contenido = <AdminContenidoBloques/>
    } else if(pathname == '/dashboard/programa/temas' || pathname == '/dashboard/programa/temas/'){
      contenido = <AdminContenidoTemas/>
    }

    return (
      <div id="main" className="enlarged">  

        {/*<!-- top bar navigation -->*/}
        <HeaderBar history={ this.props.history }/>

        {/*Wrapper*/}
        <div id="wrapper">

          {/*Left Sidebar*/}
          <LeftSidebar tipo="adminContenido"/>

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

export default withRouter(AdminContenidoDashboard);