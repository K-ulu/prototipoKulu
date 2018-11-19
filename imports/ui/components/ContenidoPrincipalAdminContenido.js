import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import Documentos from '../../api/documentos';
import ContenidosMultimedia from '../../api/contenidosMultimedia';
import Libros from '../../api/libros';
import ElementosObjetosAprendizaje from '../../api/elementosObjetosAprendizaje';

class ContenidoPrincipalAdminContenido extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      documentos: [],
      contenidosMultimedia: [],
      libros: [],
      elementos: [],
    };
  }

  //actualizamos props
	static getDerivedStateFromProps(nextProps, prevState) {
		if(nextProps.isReadyD && nextProps.isReadyContMult && nextProps.isReadyL && nextProps.isReadyE){      
			return {
        documentos: nextProps.documentos,
        contenidosMultimedia: nextProps.contenidosMultimedia,
        libros: nextProps.libros,
        elementos: nextProps.elementos,
      };
		}
		//retornamos null cuando no sea necesario actualizar state
		return null;
  }

  render () {
    //contadores en pantalla
    let countDocumentos = null;
    let countContMult = null;
    let countLibros = null;
    let countElementos = null;

    //asignando datos segun datos
    countDocumentos = (this.state.documentos.length > 0)? this.state.documentos.length : 0;
    countContMult = (this.state.contenidosMultimedia.length > 0)? this.state.contenidosMultimedia.length : 0; 
    countLibros = (this.state.libros.length > 0)? this.state.libros.length : 0;
    countElementos = (this.state.elementos.length > 0)? this.state.elementos.length : 0;

    return (
      <div>
        {/*Inicio componente */}
        {/*Inicio row */}
        <div className="row">  

          <div className="col-xs-12 col-md-6 col-lg-6 col-xl-3">
            <div className="card-box noradius noborder bg-default">
              <i className="fa fa-file-text-o float-right text-white"></i>
              <h6 className="text-white text-uppercase m-b-20">Documentos</h6>
              <h1 className="m-b-20 text-white counter"> { countDocumentos } </h1>
              <span className="text-white">¡Nuevos!</span>
            </div>
          </div>

          <div className="col-xs-12 col-md-6 col-lg-6 col-xl-3">
            <div className="card-box noradius noborder bg-orange">
              <i className="fa fa-fw fa-headphones float-right text-white"></i>
              <h6 className="text-white text-uppercase m-b-20">Cont. Mult.</h6>
              <h1 className="m-b-20 text-white counter"> { countContMult } </h1>
              <span className="text-white">¡Nuevos!</span>
            </div>
          </div>

          <div className="col-xs-12 col-md-6 col-lg-6 col-xl-3">
            <div className="card-box noradius noborder bg-info">
              <i className="fa fa-fw fa-copy float-right text-white"></i>
              <h6 className="text-white text-uppercase m-b-20">Libros</h6>
              <h1 className="m-b-20 text-white counter"> { countLibros } </h1>
              <span className="text-white">¡Nuevos!</span>
            </div>
          </div>

          <div className="col-xs-12 col-md-6 col-lg-6 col-xl-3">
            <div className="card-box noradius noborder bg-purple">
              <i className="fa fa-fw fa-cogs float-right text-white"></i>
              <h6 className="text-white text-uppercase m-b-20">Elementos</h6>
              <h1 className="m-b-20 text-white counter"> { countElementos } </h1>
              <span className="text-white">¡Nuevos!</span>
            </div>
          </div>

        </div>
        {/*Fin row */}
  
        {/*Inicio row */}
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-8">
            <div className="card mb-3">
              <div className="card-header">
                <h3><i className="fa fa-line-chart"></i> Primeros pasos como administrador de contenidos</h3>
              </div>
              <div className="card-body">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-12">
                    <h4>Eiusmod adipisicing mollit laborum eiusmod in in.</h4>
                      <div className="row">
                        <div className="col-12">                          
                          <p>Elit consectetur excepteur aliqua irure pariatur. Veniam amet cillum elit laborum sunt. Sit magna dolor eiusmod consequat proident id ad ea commodo aute duis ullamco sint dolor.</p>
                          <p>Mollit anim qui do culpa eiusmod cupidatat. Labore magna sit Lorem ut sint. Anim incididunt Lorem irure fugiat proident laboris ut eiusmod sunt in adipisicing laborum aliqua minim. Eiusmod exercitation non minim officia consequat excepteur culpa ipsum culpa fugiat occaecat. Id mollit labore veniam anim ea dolor deserunt ipsum cillum ullamco ex. Tempor voluptate ex fugiat non magna.</p>                                               
                          <p>Excepteur laborum et qui veniam fugiat deserunt id nisi sint. Dolore laboris elit ad eu deserunt dolor nisi excepteur occaecat. Esse incididunt id ad ad occaecat minim ipsum nulla. Ut sunt duis occaecat eu incididunt laboris ipsum pariatur. Non tempor incididunt cillum aute tempor duis laboris laborum do.</p>
                          <p>Sint magna voluptate cillum irure eiusmod eiusmod. Consectetur dolore anim do cillum labore minim pariatur amet est exercitation cupidatat. Dolor eiusmod ad esse voluptate et minim ipsum incididunt duis aute commodo. Ipsum quis veniam enim excepteur sit est cupidatat.</p>
                        </div>
                      </div>
                    </div>                    
                  </div>
                </div>
              </div>
              <div className="card-footer small text-muted">Updated yesterday at 11:59 PM</div>
            </div>
          </div>

          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-4">
            <div className="card mb-3">
              <div className="card-header">
                <h3><i className="fa fa-exclamation-triangle" aria-hidden="true"></i> Avisos</h3>
              </div>
              <div className="card-body">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-12 col-md-6 col-xl-12">
                      <div className="card text-white bg-primary mb-3">
                        <div className="card-header text-white">Aviso</div>
                        <div className="card-body">
                          <h5 className="card-title">Secondary card title</h5>
                          <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-md-6 col-xl-12">
                      <div className="card text-white bg-primary mb-3">
                        <div className="card-header text-white">Aviso</div>
                        <div className="card-body">
                          <h5 className="card-title">Secondary card title</h5>
                          <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-footer small text-muted">Updated yesterday at 11:59 PM</div>
            </div>
          </div>

        </div>                
        {/*Fin row */}   

      {/*Fin componente */}
      </div>
    );
  }
}

export default withTracker(() => {
  //recopilando informacion de documentos
  let handleD = Meteor.subscribe("documentos.all");
  let isReadyD = handleD.ready();
  let documentos = Documentos.find().fetch();

  //recopilando innformacion de cont mult
  let handleContMult = Meteor.subscribe("contenidosMultimedia.all");
  let isReadyContMult = handleContMult.ready();
  let contenidosMultimedia = ContenidosMultimedia.find().fetch();

  //recopilamos informacion de libros
  let handleL = Meteor.subscribe("libros.all");
  let isReadyL = handleL.ready();
  let libros = Libros.find().fetch();

  //recopilamos informacion de elementos
  let handleE = Meteor.subscribe("elementos.all");
  let isReadyE = handleE.ready();
  let elementos = ElementosObjetosAprendizaje.find().fetch();

  return {
    //documentos
    isReadyD,
    documentos,
    //cont multimedia
    isReadyContMult,
    contenidosMultimedia,
    //libros
    isReadyL,
    libros,
    //elementos
    isReadyE,
    elementos,
  };

})(ContenidoPrincipalAdminContenido);