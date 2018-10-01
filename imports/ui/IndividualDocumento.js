import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Para confirmar eliminación;
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

//Para las notificaciones!
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class IndividualDocumento extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
    
    //binding functions
    this.docRemoveFile = this.docRemoveFile.bind(this);
    this.docRenameFile = this.docRenameFile.bind(this);  
  }

  static propTypes = {
    fileName: PropTypes.string.isRequired,
    fileSize: PropTypes.number.isRequired,
    fileUrl: PropTypes.string,
    fileId: PropTypes.string.isRequired
  }

  docRemoveFile(){
    confirmAlert({
      title: 'Confirmación de Eliminación',
      message: '¿Esta seguro que desea eliminar este archivo?.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => Meteor.call('docRemoveFile', this.props.fileId, function (err, res) {
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

  docRenameFile(){
    let validName = /[^a-zA-Z0-9 \.:\+()\-_%!&]/gi;
    let prompt    = window.prompt('Nuevo Archivo?', this.props.fileName);

    // Replace any non valid characters, also do this on the server
    if (prompt) {
      prompt = prompt.replace(validName, '-');
      prompt.trim();
    }   

    console.log(prompt);
    if (!_.isEmpty(prompt)) {
      Meteor.call('docRenameFile', this.props.fileId, prompt, function (err, res) {
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
    console.log(this.props);
    return (
      <div className="col-md-4">
        <div className="card">
          <img className="card-img-top" src="/images/pdf.png" alt="pdf image"/>
          <div className="card-body">
            <h5 className="card-title">{ this.props.fileName }</h5>
            <p className="card-text text-muted">Documento PDF</p>          
            <div className="row">
              <div className="col-4">
                <button onClick={ this.openFile.bind(this, this.props.fileUrl) } className="btn btn-outline-success btn-block" target="_blank"><i className="fa fa-fw fa-eye"></i></button>                
              </div>  
              <div className="col-4">
                <button onClick={ this.docRenameFile } className="btn btn-outline-primary btn-block"><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button>                
              </div>  
              <div className="col-4">
                <button onClick={ this.docRemoveFile } className="btn btn-outline-danger btn-block"><i class="fa fa-trash-o" aria-hidden="true"></i></button>
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
export default IndividualDocumento;