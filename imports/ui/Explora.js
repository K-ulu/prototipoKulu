import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import ContenidoTarjeta from './components/ContenidoTarjeta';

import ContenidosMultimedia from '../api/contenidosMultimedia';
import Libros from '../api/libros';
import Documentos from '../api/documentos';

class Explora extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      multimedia: [],
      documentos: [],
      libros: [],
    };  
  }

  componentDidMount(){
    console.log('mis props: ', this.props);
  }

  //actualizamos props
	static getDerivedStateFromProps(nextProps, prevState) {
		if(nextProps.documentos.length > 0 || nextProps.multimedia.length > 0 || nextProps.libros.length > 0){      
      console.log('mis nuevos props: ', nextProps);
			return {
        documentos: nextProps.documentos,
        multimedia: nextProps.multimedia,
        libros: nextProps.libros,
      };
    } 
    /*if(nextProps.multimedia.length > 0){
      console.log('mis nuevos props: ', nextProps);
      return {
        multimedia: nextProps.multimedia,
      };
    } 
    if(nextProps.libros.length > 0){
      console.log('mis nuevos props: ', nextProps);
      return {
        libros: nextProps.libros,
      };
    }*/
		//retornamos null cuando no sea necesario actualizar state
		return null;
  }

  renderContentMultimedia(){
    if(this.state.multimedia.length > 0 ){
      return <ContenidoTarjeta title="Contenido Multimedia" description="Descubre el nuevo contenido multimedia que tenemos para ti, audio-historias, imágenes y vídeos interesantes." files={ this.state.multimedia } meta="multimedia"/>
    } 
  }

  renderContentLibros(){
    if(this.state.libros.length > 0 ){
      return <ContenidoTarjeta title="Libros" description="Mira los nuevos libros que tenemos para ti. Una asombrosa colección divertida y entretenida." files={ this.state.libros } meta="libros" />       
    } 
  }
  
  renderContentDocumentos(){
    if(this.state.documentos.length > 0 ){
      return <ContenidoTarjeta title="Documentos" description="Enteráte de los últimos documentos compartidos por maestros. Juega, lee y aprende." files={ this.state.documentos } meta="documentos"/>;
    } 
  }
  
  render(){
    return (
      <div>
        {/*inicio del componente*/}
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
            {/*Card*/}                  
            <div className="card noborder mb-3">
              <div className="card-body">
                {/*Card title*/}
                <div className="row justify-content-center">
                  <div className="col-8">
                    <h1 className="text-center">Explora</h1>
                    <p className="mt-3">Exercitation nuldeserunt id eiusmod magna culpa tempor excepteur officia labore nulla do in.</p>
                  </div>     
                </div>
                <div className="row justify-content-center">
                  <div className="col-10">   
                    <div className="row">
                      { this.renderContentMultimedia() }
                      { this.renderContentLibros() }
                      { this.renderContentDocumentos() }
                      {/*<ContenidoTarjeta title="Contenido Multimedia" description="Descubre el nuevo contenido multimedia que tenemos para ti, audio-historias, imágenes y vídeos interesantes." files={ this.state.documentos } />                     
                      <ContenidoTarjeta title="Libros" description="Mira los nuevos libros que tenemos para ti. Una asombrosa colección divertida y entretenida."/>       
                      <ContenidoTarjeta title="Documentos" description="Enteráte de los últimos documentos compartidos por maestros. Juega, lee y aprende."/>       */}
                    </div>                                                                       
                  </div>
                </div>
              </div>
              {/*<div className="card-footer small text-muted">Updated yesterday at 11:59 PM</div>*/}
            </div>
          </div>


        </div>

        {/*fin del componente*/}
      </div>
    );
  }
}

export default withTracker( ( props ) => {
  id = Session.get('user')._id;
  const docsHandle = Meteor.subscribe('documentos.all');  
  const docsReadyYet = docsHandle.ready();  
  documentos = Documentos.find({ "meta.estado": 'publico'}, {sort: {name: 1}, limit: 4}).fetch();

  const multimediaHandle = Meteor.subscribe('contenidosMultimedia.all');  
  const multimediaReadyYet = multimediaHandle.ready();  
  multimedia = ContenidosMultimedia.find({ "meta.estado": 'publico'}, {sort: {name: 1}, limit: 4}).fetch();

  const librosHandle = Meteor.subscribe('libros.all');  
  const librosReadyYet = librosHandle.ready();  
  libros = Libros.find({ "meta.estado": 'publico'}, {sort: {name: 1}, limit: 4}).fetch();
  
  console.log('documentos explora', documentos);
  console.log('multimedia explora', multimedia);
  console.log('libros explora', libros);
  return {
    documentos,
    multimedia,
    libros,
  };
})(Explora);