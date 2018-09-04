import React from 'react';
import PropTypes from 'prop-types';
import { Accounts } from 'meteor/accounts-base';
import { withRouter } from "react-router-dom";
import { Session } from 'meteor/session';

import ReactDropzone from "react-dropzone";
import UserFiles from '../api/filesCol.js';
class MaestroElementosNuevo extends React.Component {

  constructor(props) {
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
    this.setState({
      files: this.state.files.concat(files),
     });
  }

  cerrar = () => {
    this.props.nuevo();
  };

  uploadIt() {
    var todas = this.state.files.length;//obetenemos el total del arreglo

    for (var i = 0; i < todas; i++) { //recorremos todo el arreglo
      console.log(this.state.files[i]);
      var file = this.state.files[i];
      let self = this;

      if (file) {
        let uploadInstance = UserFiles.insert({
          file: file,
          meta: {
            locator: self.props.fileLocator,
            userId: Meteor.userId() // Optional, used to check on server for file tampering
          },
          streams: 'dynamic',
          chunkSize: 'dynamic',
          allowWebWorkers: true // If you see issues with uploads, change this to false
        }, false)

        self.setState({
          uploading: uploadInstance, // Keep track of this instance to use below
          inProgress: true // Show the progress bar now
        });

        // These are the event functions, don't need most of them, it shows where we are in the process
        uploadInstance.on('start', function () {
          console.log('Starting');
        })

        uploadInstance.on('end', function (error, fileObj) {
          console.log('On end File Object: ', fileObj);
        })

        uploadInstance.on('uploaded', function (error, fileObj) {
          console.log('uploaded: ', fileObj);

          // Remove the filename from the upload box
          self.refs['fileinput'].value = '';

          // Reset our state for the next file
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

    if (!_.isEmpty(this.state.uploading)) {
      return <div>
        {this.state.uploading.file.name}

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
                          <h2 className="text-center">Nuevo Contenido Multimedia</h2>
                        </div>     
                      </div>

                      <div className="row justify-content-center">
                        <div className="col-10">

                          <ReactDropzone
                            accept="image/*"
                            onDrop={this.onPreviewDrop}
                            style={{"width" : "100%", "height" : "25%", "border" : "1px dashed black"}}>
                            <div>
                              Arrastra unos archivos aqui, o click para cargar una imagen!.
                            </div>                          
                          </ReactDropzone>

                          <aside>
                            <h2>Imagen a subir!</h2>
                            <ul>
                              {
                                this.state.files.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
                              }
                            </ul>
                          </aside>
                          {this.showUploads()}

                          <button className="btn btn-primary btn-block" onClick={this.uploadIt} >Agregar</button>                          
                          <button className="btn btn-primary btn-block" onClick={this.cerrar} >Cerrar</button>                         
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

export default withRouter(MaestroElementosNuevo);