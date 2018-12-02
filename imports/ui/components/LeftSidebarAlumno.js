import React from 'react';

export default class LeftSidebarAlumno extends React.Component {
  render(){
    return (
      <div id="sidebar-wrapper">

        <ul className="sidebar-nav">

          <li className="submenu">
            <a className="active" href="/dashboard">
              <i className="fa fa-fw fa-bars"></i>
              <span> Dashboard </span>
            </a>
          </li>

          <li className="submenu">
            <a className="nuevaSesion" href="/dashboard/sesion">
              <i className="fa fa-fw fa-play"></i>
              <span> Nueva Mini Sesión </span>
            </a>
          </li>

          <li className="submenu">
            <a href="/dashboard/explora">
              <i className="fa fa-fw fa-eye"></i>
              <span> Explorar </span>
            </a>
          </li>

          <li className="submenu">
            <a href="#">
              <i className="fa fa-fw fa-book"></i>
              <span> Biblioteca </span>
              <span className="menu-arrow"></span>
            </a>
            <ul className="list-unstyled">
              <li>
                <a href="/dashboard/biblioteca/libros">
                  <i className="fa fa-fw fa-copy"></i>
                  <span> Libros </span>
                </a>
              </li>
              <li>
                <a href="/dashboard/biblioteca/multimedia">
                  <i className="fa fa-fw fa-headphones"></i>
                  <span> Cont. Mult. </span>
                </a>
              </li>   
              <li>
                <a href="/dashboard/biblioteca/documentos">
                  <i className="fa fa-fw fa-file-text-o"></i>
                  <span> Documentos </span>
                </a>
              </li>    
              <li>
                <a href="/dashboard/biblioteca/objetos">
                  <i className="fa fa-fw fa-address-book"></i>
                  <span> Obj. de Aprend. </span>
                </a>
              </li>      
              <li>
                <a href="/dashboard/biblioteca/elementos">
                  <i className="fa fa-fw fa-cogs"></i>
                  <span> Elem. de Aprend. </span>
                </a>
              </li>         
            </ul>
          </li> 

          {/*<li className="submenu">
            <a href="#">
              <i className="fa fa-fw fa-headphones"></i>
              <span> Mi Cont. Mult. </span>
            </a>
          </li>

          <li className="submenu">
            <a href="#">
              <i className="fa fa-fw fa-file-text-o"></i>
              <span> Mis Documentos </span>
            </a>
          </li>*/}
          
        </ul>
      </div>
    );
  }
}