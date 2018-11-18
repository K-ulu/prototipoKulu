import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import Libros from '../../api/libros';
import ElementosObjetosAprendizaje from '../../api/elementosObjetosAprendizaje';
import Documentos from '../../api/documentos';
import ContenidosMultimedia from '../../api/contenidosMultimedia';

class ContenidoPrincipalUser extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      libros: [],
      elementos: [],
      documentos: [],
      multimedia: [],
    };
  }

  //actualizamos props
	static getDerivedStateFromProps(nextProps, prevState) {
		if(nextProps.isReadyL && nextProps.isReadyE && nextProps.isReadyD && nextProps.isReadyM){      
			return {
        libros: nextProps.libros,
        elementos: nextProps.elementos,
        documentos: nextProps.documentos,
        multimedia: nextProps.multimedia,
      };
		}
		//retornamos null cuando no sea necesario actualizar state
		return null;
  }

  render () {
    //contadores en pantalla
    let countLibros = null;
    let countElementos = null;
    let countDocumentos = null;
    let countMultimedia = null;
    
    //asignando datos 
    countLibros = (this.state.libros.length > 0)? this.state.libros.length : 0;
    countElementos = (this.state.elementos.length > 0)? this.state.elementos.length : 0;
    countDocumentos = (this.state.documentos.length > 0)? this.state.documentos.length : 0;
    countMultimedia = (this.state.multimedia.length > 0)? this.state.multimedia.length: 0;

    return (
      <div>
				{/*Inicio componente */}
				{/*Inicio row */}
				<div className="row">  

					<div className="col-xs-12 col-md-6 col-lg-6 col-xl-3">
						<div className="card-box noradius noborder bg-default">
              <i className="fa fa-user-o float-right text-white"></i>
							<h6 className="text-white text-uppercase m-b-20">Libros</h6>
							<h1 className="m-b-20 text-white counter"> { countLibros } </h1>
							<span className="text-white">Nuevo</span>
						</div>
					</div>

					<div className="col-xs-12 col-md-6 col-lg-6 col-xl-3">
						<div className="card-box noradius noborder bg-warning">
							<i className="fa fa-users float-right text-white"></i>
							<h6 className="text-white text-uppercase m-b-20">Elementos</h6>
							<h1 className="m-b-20 text-white counter"> { countElementos } </h1>
							<span className="text-white">Nuevo</span>
						</div>
					</div>

					<div className="col-xs-12 col-md-6 col-lg-6 col-xl-3">
						<div className="card-box noradius noborder bg-info">
							<i className="fa fa-file-text-o float-right text-white"></i>
							<h6 className="text-white text-uppercase m-b-20">Documentos</h6>
							<h1 className="m-b-20 text-white counter"> { countDocumentos } </h1>
							<span className="text-white">Nuevo</span>
						</div>
					</div>

					<div className="col-xs-12 col-md-6 col-lg-6 col-xl-3">
						<div className="card-box noradius noborder bg-success">
							<i className="fa fa-file-video-o float-right text-white"></i>
							<h6 className="text-white text-uppercase m-b-20">Cont. Mult.</h6>
							<h1 className="m-b-20 text-white counter"> { countMultimedia } </h1>
							<span className="text-white">Nuevo</span>
						</div>
					</div>

				</div>
				{/*Fin row */}
	
				{/*Inicio row */}
        <div className="row">
          
					<div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <div className="card mb-3">
              <div className="card-header">
                <h3><i className="fa fa-line-chart"></i> Explora</h3>
              </div>
              <div className="card-body">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-md-6 col-xl-3">
                      <p className="font-weight-bold text-center">Libros.</p>
                      <p className="text-center">Officia nulla enim anim do aliqua enim elit nisi officia quis irure ipsum in pariatur. Dolore ad reprehenderit elit duis eu esse esse. Consectetur consequat labore id excepteur eiusmod aute. <a href="/dashboard/biblioteca/libros">Leer más</a> </p>                     
                    </div>     
                    <div className="col-md-6 col-xl-3">
                      <p className="font-weight-bold text-center">Contenido multimedia.</p>
                      <p className="text-center">Officia nulla enim anim do aliqua enim elit nisi officia quis irure ipsum in pariatur. Dolore ad reprehenderit elit duis eu esse esse. Consectetur consequat labore id excepteur eiusmod aute. <a href="/dashboard/biblioteca/multimedia">Leer más</a> </p>                     
                    </div>   
                    <div className="col-md-6 col-xl-3">
                      <p className="font-weight-bold text-center">Documentos.</p>
                      <p className="text-center">Officia nulla enim anim do aliqua enim elit nisi officia quis irure ipsum in pariatur. Dolore ad reprehenderit elit duis eu esse esse. Consectetur consequat labore id excepteur eiusmod aute. <a href="/dashboard/biblioteca/documentos">Leer más</a> </p>                     
                    </div>   
                    <div className="col-md-6 col-xl-3">
                      <p className="font-weight-bold text-center">Elementos de objetos de aprendizaje.</p>
                      <p className="text-center">Officia nulla enim anim do aliqua enim elit nisi officia quis irure ipsum in pariatur. Dolore ad reprehenderit elit duis eu esse esse. Consectetur consequat labore id excepteur eiusmod aute. <a href="/dashboard/biblioteca/elementos">Leer más</a> </p>                     
                    </div>                  
                  </div>
                </div>
              </div>              
            </div>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-12">
            <div className="card mb-3">
              <div className="card-header">
                <h3><i className="fa fa-line-chart"></i> Primeros pasos como alumno</h3>
              </div>
              <div className="card-body">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-12">
                      <h5 className="font-weight-bold">Eiusmod adipisicing mollit laborum.</h5>
                      <div className="row">
                        <div className="col-12">                          
                          <p>Elit consectetur excepteur aliqua irure pariatur. Veniam amet cillum elit laborum sunt. Sit magna dolor eiusmod consequat proident id ad ea commodo aute duis ullamco sint dolor.</p>                          
                          <p>Deserunt Lorem ipsum irure elit labore nisi aute aliqua ad aute fugiat id. Et est aliquip reprehenderit excepteur nostrud ipsum quis officia aliqua dolor pariatur sint laboris. Incididunt minim consequat proident veniam nisi. Nisi velit laborum consectetur incididunt. Ullamco nostrud in in incididunt dolor culpa elit magna cillum ipsum laboris sunt labore laborum. Laborum cillum deserunt eiusmod magna esse non aute adipisicing qui ullamco.</p>
                        </div>
                        <div className="col-12">
                          <p>Deserunt Lorem ipsum irure elit labore nisi aute aliqua ad aute fugiat id. Et est aliquip reprehenderit excepteur nostrud ipsum quis officia aliqua dolor pariatur sint laboris. Incididunt minim consequat proident veniam nisi. Nisi velit laborum consectetur incididunt. Ullamco nostrud in in incididunt dolor culpa elit magna cillum ipsum laboris sunt labore laborum. Laborum cillum deserunt eiusmod magna esse non aute adipisicing qui ullamco.</p>
                        </div>
                        <div className="col-12">
                          <p>Deserunt Lorem ipsum irure elit labore nisi aute aliqua ad aute fugiat id. Et est aliquip reprehenderit excepteur nostrud ipsum quis officia aliqua dolor pariatur sint laboris. Incididunt minim consequat proident veniam nisi. Nisi velit laborum consectetur incididunt. Ullamco nostrud in in incididunt dolor culpa elit magna cillum ipsum laboris sunt labore laborum. Laborum cillum deserunt eiusmod magna esse non aute adipisicing qui ullamco.</p>
                        </div>
                      </div>
                    </div>                    
                  </div>
                </div>
              </div>              
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
  //recopilando informacion de libros
  let handleL = Meteor.subscribe('libros.all');
  let isReadyL = handleL.ready();
  let libros = Libros.find().fetch();

  //recopilando informacion de elementos
  let handleE = Meteor.subscribe('elementos.all');
  let isReadyE = handleE.ready();
  let elementos = ElementosObjetosAprendizaje.find().fetch();

  //recopilando informacion de documentos
  let handleD = Meteor.subscribe('documentos.all');
  let isReadyD = handleD.ready();
  let documentos = Documentos.find().fetch();

  //recopilando informacion de multimedia
  let handleM = Meteor.subscribe('contenidosMultimedia.all');
  let isReadyM = handleM.ready();
  let multimedia = ContenidosMultimedia.find().fetch();

  return {
    isReadyL,
    libros,
    isReadyE,
    elementos,
    isReadyD,
    documentos,
    isReadyM,
    multimedia,
  }

})(ContenidoPrincipalUser);