import React from 'react';
import { withRouter } from "react-router-dom";

import ContenidoPrincipal from './components/ContenidoPrincipal';
import ContenidoMultimedia from './MaestroContenidoMultimedia';
import HeaderBar from './components/HeaderBar';
import LeftSidebar from './components/LeftSidebar';
import MaestroAlumnos from './MaestroAlumnos';
import MaestroGrupos from './MaestroGrupos';
import MaestroDocumentos from './MaestroDocumentos';
class MaestroDashboard extends React.Component {

  componentDidMount(){    
    console.log(' didMount', this.props);   
  }

  render () {
    //variable que almacena el contenido segun la url visitada
    let contenido = null;
    let pathname = this.props.history.location.pathname;
    
    if(pathname == '/dashboard' || pathname == '/dashboard/'){
      contenido = <ContenidoPrincipal/>
    } else if(pathname == '/dashboard/multimedia' || pathname == '/dashboard/multimedia/'){
      contenido = <ContenidoMultimedia/>
    } else if(pathname == '/dashboard/documentos' || pathname == '/dashboard/multimedia/'){
      contenido = <MaestroDocumentos/>
    } else if(pathname == '/dashboard/alumnos' || pathname == '/dashboard/alumnos/'){
      contenido = <MaestroAlumnos/>
    } else if(pathname == '/dashboard/grupos' || pathname == '/dashboard/grupos/'){
      contenido = <MaestroGrupos/>
    } 

    return (
      <div id="main" className="enlarged">  

        {/*<!-- top bar navigation -->*/}
        <HeaderBar/>

        {/*Wrapper*/}
        <div id="wrapper">

          {/*Left Sidebar*/}
          <LeftSidebar/>

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

export default withRouter(MaestroDashboard);