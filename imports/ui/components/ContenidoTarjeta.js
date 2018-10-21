import React from 'react';

import ContenidosMultimedia from '../../api/contenidosMultimedia';
import Libros from '../../api/libros';
import Documentos from '../../api/documentos';


import IndividualArchivoPublico from './uploadFiles/IndividualArchivoPublico';

export default class ContenidoTarjeta extends React.Component {
  render(){
    if (this.props.files.length > 0  && this.props.meta == 'documentos') {
      console.log("Listo");
      let fileCursors = this.props.files;

      // Run through each file that the user has stored
      // (make sure the subscription only sends files owned by this user)
      let display = fileCursors.map((aFile, key) => {
      // console.log('A file: ', aFile.link(), aFile.get('name'))
      let link = Documentos.findOne({_id: aFile._id}).link();  //The "view/download" link
      console.log(Documentos.findOne({_id: aFile._id}));
      console.log(link);
        
      return <IndividualArchivoPublico
          key={'file' + key}
          fileName={aFile.name}
          fileUrl={link}
          fileId={aFile._id}
          fileSize={aFile.size}
        />      
    })

    return <div className="col-12">
      <h3>{ this.props.title } <span className="badge badge-secondary"><i className="fa fa-star" aria-hidden="true"></i>   Nuevo</span></h3>
      <p>{ this.props.description }</p>
      <div className="row">
        { display }
      </div> 
    </div>
    } else if(this.props.files.length > 0  && this.props.meta == 'multimedia'){
      console.log("Listo");
      let fileCursors = this.props.files;

      // Run through each file that the user has stored
      // (make sure the subscription only sends files owned by this user)
      let display = fileCursors.map((aFile, key) => {
      // console.log('A file: ', aFile.link(), aFile.get('name'))
      let link = ContenidosMultimedia.findOne({_id: aFile._id}).link();  //The "view/download" link
      console.log(ContenidosMultimedia.findOne({_id: aFile._id}));
      console.log(link);
        
      return <IndividualArchivoPublico
          key={'file' + key}
          fileName={aFile.name}
          fileUrl={link}
          fileId={aFile._id}
          fileSize={aFile.size}
        />      
    })

    return <div className="col-12">
      <h3>{ this.props.title } <span className="badge badge-secondary"><i className="fa fa-star" aria-hidden="true"></i>   Nuevo</span></h3>
      <p>{ this.props.description }</p>
      <div className="row">
        { display }
      </div> 
    </div>

    } else if(this.props.files.length > 0  && this.props.meta == 'libros'){
      console.log("Listo");
      let fileCursors = this.props.files;

      // Run through each file that the user has stored
      // (make sure the subscription only sends files owned by this user)
      let display = fileCursors.map((aFile, key) => {
      // console.log('A file: ', aFile.link(), aFile.get('name'))
      let link = Libros.findOne({_id: aFile._id}).link();  //The "view/download" link
      console.log(Libros.findOne({_id: aFile._id}));
      console.log(link);
        
      return <IndividualArchivoPublico
          key={'file' + key}
          fileName={aFile.name}
          fileUrl={link}
          fileId={aFile._id}
          fileSize={aFile.size}
        />      
    })

    return <div className="col-12">
      <h3>{ this.props.title } <span className="badge badge-secondary"><i className="fa fa-star" aria-hidden="true"></i>   Nuevo</span></h3>
      <p>{ this.props.description }</p>
      <div className="row">
        { display }
      </div> 
    </div>

    }
    else return <div> No tiene ningun documento almacenado </div>;
  }
}