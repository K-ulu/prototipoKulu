import React from 'react';
import PropTypes from 'prop-types';
import { Accounts } from 'meteor/accounts-base';
import { withRouter } from "react-router-dom";
import { Session } from 'meteor/session';

import ReactDropzone from "react-dropzone";
import UserDocs from '../api/documentosCol.js';
class MaestrosDocumentoNuevo extends React.Component {

  constructor(props) {
    let todas = 0;
    super(props);

    this.state = {
      files: [],
      uploading: [],
      progress: 0,
      inProgress: false
    };
    
    this.uploadIt = this.uploadIt.bind(this);
  }

  onPreviewDrop = (files) => {
    console.log(files);
    this.setState({
      files: this.state.files.concat(files),
     });
  }

  cerrar = () => {
    this.props.nuevo();
  };

  uploadIt() {
    this.todas = this.state.files.length;//obetenemos el total del arreglo

    for (var i = 0; i < this.todas; i++) { //recorremos todo el arreglo
      var file = this.state.files[i]; //Asignamos a una variable una posicion del arreglo
      let self = this;

      if (file) {
        let uploadInstance = UserDocs.insert({
          file: file,
          meta: {
            locator: self.props.fileLocator,
            userId: Meteor.userId() // Optional,asignamos el id del usuario que guarda el archivo
          },
          streams: 'dynamic',
          chunkSize: 'dynamic',
          allowWebWorkers: true, // If you see issues with uploads, change this to false
        }, false)

        self.setState({
          uploading: uploadInstance, // guardamos los datos de la variable a upliading
          inProgress: true // mostramos la barra de progreso
        });

        // These are the event functions, don't need most of them, it shows where we are in the process
        uploadInstance.on('start', function () {//Se emplieza a cargar el archivo
          console.log('Starting');
        })

        uploadInstance.on('end', function (error, fileObj) {//Se termina de cargar el archivo
          console.log('On end File Object: ', fileObj);
        })

        uploadInstance.on('uploaded', function (error, fileObj) {
          console.log('uploaded: ', fileObj);

          // Resetea los datos para el siguiente
          self.setState({
            uploading: [],
            progress: 0,
            inProgress: false
          });
        })

        uploadInstance.on('error', function (error, fileObj) {
          console.log('Error during upload: ' + error)
        });

        uploadInstance.on('progress', function (progress, fileObj) {
          console.log('Upload Percentage: ' + progress)
          // Update our progress bar
          self.setState({
            progress: progress
          });
        });

        uploadInstance.start(); 
    }
  }

    this.setState({
      files: [],
    });
  }

  showUploads() {
    console.log('**********************************', this.state.uploading);
    var descripcion = "";
      if (!_.isEmpty(this.state.uploading)) {
        if (this.todas > 1){
          descripcion = "Cargando archivos";
        }
        else{
          descripcion = "Cargando " + this.state.uploading.file.name;
        }
        return <div>
          {descripcion}
          <div className="progress progress-bar-default">
            <div style={{width: this.state.progress + '%'}} aria-valuemax="100"
              aria-valuemin="0"
              aria-valuenow={this.state.progress || 0} role="progressbar"
              className="progress-bar">
              <span className="sr-only">{this.state.progress}% Complete (success)</span>
              <span>{this.state.progress}%</span>
            </div>
          </div>
        </div>
      }
  }

  render () {
    const previewStyle = {
      display: 'inline',
      width: 100,
      height: 100,
    };
    return (
        <div id="page-content-wrapper">
          <div className="content">
            <div className="container-fluid">            


              <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <div className="card noborder mb-3">

                    <div className="card-body">
                      {/*title*/}
                      <div className="row justify-content-center">
                        <div className="col-10">
                          <h2 className="text-center">Nuevo Documento</h2>
                        </div>     
                      </div>

                      <div className="row justify-content-center">
                        <div className="col-10">

                          <ReactDropzone
                            accept="application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.openxmlformats-officedocument.presentationml.presentation"
                            onDrop={this.onPreviewDrop}
                            style={{"width" : "100%", "height" : "25%", "border" : "1px dashed black"}}>
                            <div>
                              Arrastra los documentos aqui, o click para cargar el documento!.
                            </div>  
                          </ReactDropzone>

                          <aside>
                            <h3>Documento a subir!</h3>
                            <ul>
                              {
                                this.state.files.map(
                                  f => 
                                    <li key={f.name}>
                                      {f.name} - {f.size} bytes 
                                    </li>
                                )
                              }
                            </ul>
                          </aside>
                          {this.showUploads()}

                          <button className="btn btn-success btn-block" onClick={this.uploadIt} >Agregar</button>                          
                          <button className="btn btn-warning btn-block" onClick={this.cerrar} >Cerrar</button>                         
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>          
          </div>
        </div>
    );
  }
}

export default withRouter(MaestrosDocumentoNuevo);