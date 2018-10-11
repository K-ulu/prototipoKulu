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

  openFile(url){
    //abre url 
    window.open(url, '_blank');
  }

  render() {
    //dividimos el arreglo atraves de "." para poder obtener la extension del archivo
    let extension = this.props.fileName.split('.');   
    let image = null;
    let etiquetaTipoArchivo = null;
    //determinamos la imagen y la etiqueta del tipo de texto
    if(extension.includes("mp3") || extension.includes("wav") || extension.includes("wma")){
      image = <img className="card-img-top " src="/images/audio.png" alt="pdf image"/>
      etiquetaTipoArchivo = <p className="card-text text-muted">Audio</p>
    } else if(extension.includes("mp4") || extension.includes("3gp") || extension.includes("avi") || extension.includes("flv") || extension.includes("wmv")){
      image = <img className="card-img-top " src="/images/video.png" alt="pdf image"/>
      etiquetaTipoArchivo = <p className="card-text text-muted">Vídeo</p>
    } else if(extension.includes("jpg") || extension.includes("JPG") || extension.includes("png") || extension.includes("PNG") || extension.includes("bmp") || extension.includes("gif")){
      image = <img className="card-img-top " src="/images/picture.png" alt="pdf image"/>
      etiquetaTipoArchivo = <p className="card-text text-muted">Imagen</p>
    }    

    return (
      <div className="col-md-3">
        <div className="card" id="document">
          <div className="text-center">
            { image }
          </div>          
          <div className="card-body br-none">
            <h5 className="card-title">{ this.props.fileName }</h5>
            { etiquetaTipoArchivo }         
            <div className="row">
              <div className="col-4 no-padding">
                <button onClick={ this.openFile.bind(this, this.props.fileUrl) } className="btn btn-outline-success btn-block" target="_blank"><i className="fa fa-fw fa-eye"></i></button>                
              </div>  
              <div className="col-4 no-padding">
                <button onClick={ this.renameFile } className="btn btn-outline-primary btn-block"><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button>                
              </div>  
              <div className="col-4 no-padding">
                <button onClick={ this.removeFile } className="btn btn-outline-danger btn-block"><i className="fa fa-trash-o" aria-hidden="true"></i></button>
              </div>  
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