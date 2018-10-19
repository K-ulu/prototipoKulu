import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import IndividualArchivoPublico from './IndividualArchivoPublico';
import IndividualDocumentoPrivado from './IndividualDocumentoPrivado';
import Documentos from '../../../api/documentos';

import { Session } from 'meteor/session';

class ListaDocumentos extends Component {
  constructor(props) {
    super(props);
  }

  // This is our progress bar, bootstrap styled
  // Remove this function if not needed


  render() {
    if (this.props.files.length > 0 && this.props.docsReadyYet) {
      console.log("Listo");
      let fileCursors = this.props.files;

      // Run through each file that the user has stored
      // (make sure the subscription only sends files owned by this user)
      let display = fileCursors.map((aFile, key) => {
        // console.log('A file: ', aFile.link(), aFile.get('name'))
        let link = Documentos.findOne({_id: aFile._id}).link();  //The "view/download" link
        console.log(Documentos.findOne({_id: aFile._id}));
        console.log(link);
        
        let pathname = this.props.history.location.pathname;
        //determinamos tipo de elemento a mostrar de acuerdo a la url        
        if(pathname == '/dashboard/biblioteca/documentos' || pathname == '/dashboard/biblioteca/documentos/'){ //documento publico (biblioteca)
          // Send out components that show details of each file
          return <IndividualArchivoPublico
            key={'file' + key}
            fileName={aFile.name}
            fileUrl={link}
            fileId={aFile._id}
            fileSize={aFile.size}
          />
        } else { //documento privado (maestro)
          return <IndividualDocumentoPrivado
            key={'file' + key}
            fileName={aFile.name}
            fileUrl={link}
            fileId={aFile._id}
            fileSize={aFile.size}
          />
        }        
      })

      return <div className="container">
        <div className="row">
          { display }
        </div>
      </div>
    }
    else return <div> No tiene ningun documento almacenado </div>;
  }
}

//
// This is the HOC - included in this file just for convenience, but usually kept
// in a separate file to provide separation of concerns.
//
export default withTracker( ( props ) => {
  id = Session.get('user')._id;
  const filesHandle = Meteor.subscribe('documentos.all');
  console.log(filesHandle);
  const docsReadyYet = filesHandle.ready();
  console.log(docsReadyYet);
  let pathname = props.history.location.pathname;
  let files = null;
  if(pathname == '/dashboard/documentos' || pathname == '/dashboard/documentos/'){
    files = Documentos.find( { userId: id } , {sort: {name: 1}}).fetch();
  } else {
    files = Documentos.find({ "meta.estado": 'publico'}, {sort: {name: 1}}).fetch();
  }
  
  console.log(files);
  return {
    docsReadyYet,
    files,
  };
})(ListaDocumentos);