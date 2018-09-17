import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Para confirmar eliminación;
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

//Para las notificaciones!
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class IndividualFile extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
    
    this.removeFile = this.removeFile.bind(this);
    this.renameFile = this.renameFile.bind(this);

  }

  static propTypes = {
    fileName: PropTypes.string.isRequired,
    fileSize: PropTypes.number.isRequired,
    fileUrl: PropTypes.string,
    fileId: PropTypes.string.isRequired,
    fileType: PropTypes.string.isRequired
  }

  removeFile(){
    confirmAlert({
      title: 'Confirmación de Eliminación',
      message: '¿Esta seguro que desea eliminar este archivo?.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => Meteor.call('RemoveFile', this.props.fileId, function (err, res) {
                          if (!err){
                            return(
                              toast.info('🦄Eliminado!', {
                                  position: toast.POSITION.TOP_CENTER,
                                  autoClose: 3000
                              })
                            );
                          }
                          else{
                            console.log(err);
                          }
                        })
        },
        {
          label: 'No',
          onClick: () => alert('Click para cancelar!')
        }
      ]
    })
  }

  renameFile(){

    let validName = /[^a-zA-Z0-9 \.:\+()\-_%!&]/gi;
    let prompt    = window.prompt('Nuevo Archivo?', this.props.fileName);

    // Replace any non valid characters, also do this on the server
    if (prompt) {
      prompt = prompt.replace(validName, '-');
      prompt.trim();
    }

    if (!_.isEmpty(prompt)) {
      Meteor.call('RenameFile', this.props.fileId, prompt, function (err, res) {
        if (err)
          console.log(err);
      })
    }
  }

  render() {
    let tipo = this.props.fileType;
    let arregloDeSubCadenas = tipo.split("/");
    tipo = arregloDeSubCadenas[0];

    let url ="";
    if (tipo == "image"){
      url = this.props.fileUrl;
    }
    else if (tipo == "video"){
      url = "/images/video.png";
    }
    else{
      url = "/images/audio.jpg";
    }

    return (
    <div className="m-t-sm">
      <div className="row">
        <div className="col">
          <img src = {url} width = "70px" height ="70px" />
          <div className="m-b-sm">
            <strong>{this.props.fileName}</strong>
          </div>
        </div>

        <div className="col">
          <div className="row">
            <a href={this.props.fileUrl} className="btn btn-outline btn-success btn-sm"
              target="_blank">Ver</a>
          </div>

          <div className="row">
            <button onClick={this.renameFile} className="btn btn-outline btn-primary btn-sm">
              Renombrar
            </button>
          </div>

          <div className="row">
            <button onClick={this.removeFile} className="btn btn-outline btn-danger btn-sm">
              Borrar
            </button>
          </div>
        </div>
      </div>
      <ToastContainer
          hideProgressBar={true}
          newestOnTop={true}
          autoClose={5000}
      />
    </div>
    );
  }
}
export default IndividualFile;