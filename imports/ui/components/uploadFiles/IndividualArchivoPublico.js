import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";

class IndividualArchivoPublico extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  static propTypes = {
    fileName: PropTypes.string.isRequired,
    fileSize: PropTypes.number.isRequired,
    fileUrl: PropTypes.string,
    fileId: PropTypes.string.isRequired
  }

  openFile(url){
    //abre url 
    window.open(url, '_blank');
  }

  render() {
    console.log(this.props);
    //dividimos el arreglo atraves de "." para poder obtener la extension del archivo
    let extension = this.props.fileName.split('.');   
    let image = null;
    let etiquetaTipoArchivo = null;
    let pathname = this.props.history.location.pathname;
    
    //determinamos la imagen y la etiqueta del tipo de texto de acuerdo a la url y al tipo de archivos
    //si estamos en la url de libros
    if(pathname == '/dashboard/biblioteca/libros' || pathname == '/dashboard/biblioteca/libros/'){
      if(extension.includes("pdf")){
        image = <img className="card-img-top " src="/images/book.png" alt="pdf image"/>
        etiquetaTipoArchivo = <p className="card-text text-muted text-center">PDF</p>
      }      //si estamos en la url de contenido multimedia
    } else if(pathname == '/dashboard/biblioteca/multimedia' || pathname == '/dashboard/biblioteca/multimedia/'){
      if(extension.includes("mp3") || extension.includes("wav") || extension.includes("wma")){
        image = <img className="card-img-top " src="/images/audio.png" alt="pdf image"/>
        etiquetaTipoArchivo = <p className="card-text text-muted text-center">Audio</p>
      } else if(extension.includes("mp4") || extension.includes("3gp") || extension.includes("avi") || extension.includes("flv") || extension.includes("wmv")){
        image = <img className="card-img-top " src="/images/video.png" alt="pdf image"/>
        etiquetaTipoArchivo = <p className="card-text text-muted text-center">Vídeo</p>
      } else if(extension.includes("jpg") || extension.includes("JPG") || extension.includes("png") || extension.includes("PNG") || extension.includes("bmp") || extension.includes("gif")){
        image = <img className="card-img-top " src="/images/picture.png" alt="pdf image"/>
        etiquetaTipoArchivo = <p className="card-text text-muted text-center">Imagen</p>
      }     //si estamos en la url de contenido documentos
    } else if(pathname == '/dashboard/biblioteca/documentos' || pathname == '/dashboard/biblioteca/documentos/'){
      if(extension.includes("docx") || extension.includes("doc")){
        image = <img className="card-img-top " src="/images/word.png" alt="pdf image"/>
        etiquetaTipoArchivo = <p className="card-text text-muted text-center">Texto</p>
      } else if(extension.includes("pptx") || extension.includes("ppt")){
        image = <img className="card-img-top " src="/images/powerp.png" alt="pdf image"/>
        etiquetaTipoArchivo = <p className="card-text text-muted text-center">Presentación</p>
      } else if(extension.includes("pdf")){
        image = <img className="card-img-top " src="/images/pdf.png" alt="pdf image"/>
        etiquetaTipoArchivo = <p className="card-text text-muted text-center">PDF</p>
      }
    } else {
      if(extension.includes("docx") || extension.includes("doc")){
        image = <img className="card-img-top " src="/images/word.png" alt="pdf image"/>
        etiquetaTipoArchivo = <p className="card-text text-muted text-center">Texto</p>
      } else if(extension.includes("pptx") || extension.includes("ppt")){
        image = <img className="card-img-top " src="/images/powerp.png" alt="pdf image"/>
        etiquetaTipoArchivo = <p className="card-text text-muted text-center">Presentación</p>
      } else if(extension.includes("pdf")){
        image = <img className="card-img-top " src="/images/pdf.png" alt="pdf image"/>
        etiquetaTipoArchivo = <p className="card-text text-muted text-center">PDF</p>
      }
      if(extension.includes("mp3") || extension.includes("wav") || extension.includes("wma")){
        image = <img className="card-img-top " src="/images/audio.png" alt="pdf image"/>
        etiquetaTipoArchivo = <p className="card-text text-muted text-center">Audio</p>
      } else if(extension.includes("mp4") || extension.includes("3gp") || extension.includes("avi") || extension.includes("flv") || extension.includes("wmv")){
        image = <img className="card-img-top " src="/images/video.png" alt="pdf image"/>
        etiquetaTipoArchivo = <p className="card-text text-muted text-center">Vídeo</p>
      } else if(extension.includes("jpg") || extension.includes("JPG") || extension.includes("png") || extension.includes("PNG") || extension.includes("bmp") || extension.includes("gif")){
        image = <img className="card-img-top " src="/images/picture.png" alt="pdf image"/>
        etiquetaTipoArchivo = <p className="card-text text-muted text-center">Imagen</p>
      } 
    }

    return (
      <div className="col-md-4 col-lg-3">
        <div className="card" id="document">
          <div className="text-center">
            { image }
          </div>          
          <div className="card-body br-none">
            <h5 className="card-title">{ this.props.fileName }</h5>
            { etiquetaTipoArchivo }         
            <div className="row justify-content-center">
              <div className="col-8 no-padding">
                <button onClick={ this.openFile.bind(this, this.props.fileUrl) } className="btn btn-outline-success btn-block" target="_blank"><i className="fa fa-fw fa-eye"></i></button>                
              </div>  
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(IndividualArchivoPublico);