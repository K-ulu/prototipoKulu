import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import { Materias } from '../api/materias';
import { Bloques } from '../api/bloques';

import ElementosObjetosAprendizaje from '../api/elementosObjetosAprendizaje';

class ElementoModal extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      nombreElemento: '', //nombre del elemento (form)
      descripcionElemento: '', //descripcion del elemento form
      categoriaElemento: '',
      archivos: [],

      materias: [], 
      bloques: [],
      optionsBloquesSelect: [], //guarda los bloques de acuerdo a la materia seleccionada
      claveMateria: '',
      claveBloque: '',

      uploading: [],
      progress: 0,
      inProgress: false

    };

    this.handleChangeMateria = this.handleChangeMateria.bind(this);
    this.handleChangeBloque = this.handleChangeBloque.bind(this);
    this.handleChangeCategoriaElemento = this.handleChangeCategoriaElemento.bind(this);
    this.convertirFormatoDMA = this.convertirFormatoDMA.bind(this);
    this.handleChangeArchivo = this.handleChangeArchivo.bind(this);    
    this.onSubmitElemento = this.onSubmitElemento.bind(this);

  }

  //actualizamos props
	static getDerivedStateFromProps(nextProps, prevState) {
		if(nextProps.isReady && nextProps.isReadyB){   
      return {
        materias: nextProps.materias,
        bloques: nextProps.bloques,
      };			
    } 
		//retornamos null cuando no sea necesario actualizar state
		return null;
  }

  //convierte formato de fecha de mes-dia-anio A dia-mes-anio
  convertirFormatoDMA(fecha) {
    let datos = fecha.split('/');
    return datos[1] + '/' + datos[0] + '/' + datos[2];    
  }

  //convierte timestamp a horas
	timestampToTime(timestamp){
    var date = new Date(timestamp);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();
    return hours + ':' + minutes.substr(minutes.length-2) + ':' + seconds.substr(seconds.length-2) + '-' + date.getUTCDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
	}

  //guardar o editar informacion de un elemento
  onSubmitElemento (e) {
    e.preventDefault();

    //recolectando informacion
    let nombreElemento = this.refs.nombreElemento.value.trim();
    let descripcionElemento = this.refs.descripcionElemento.value.trim();
    let categoriaElemento = this.state.categoriaElemento;
    let claveMateria = this.state.claveMateria;
    let claveBloque = this.state.claveBloque;
    let fechaInicio = this.convertirFormatoDMA(this.refs.fechaInicio.value.trim());
    let fechaFin = this.convertirFormatoDMA(this.refs.fechaFin.value.trim());
    let fechaCarga = this.timestampToTime(Date.now());
    let categoriaEnObjeto = this.refs.categoriaEnObjeto.value.trim();

    //verificamos que solo se haya cargado no mas de 1 archivo    
    if(this.state.archivos.length <= 1)    {
      let file = this.state.archivos[0];
      let self = this;

      //determinamos en que modo se abrio el modal
      if(this.props.editing){
        //verificamos que haya valores en los campos que vamos a actualizar
        if(nombreElemento && descripcionElemento && categoriaElemento && categoriaEnObjeto && fechaInicio && fechaFin){
          Meteor.call('elementos.update', this.props.id, nombreElemento, descripcionElemento, categoriaElemento, categoriaEnObjeto, fechaInicio, fechaFin, (err, res) => {
            if(!err){
              $('#'+this.props.id).modal('hide');
              //console.log('elemento actualizado');
              //reseteando los campos de informacion
              /*this.refs.nombreElemento.value = '';
              this.refs.descripcionElemento.value = '';
              this.refs.fechaInicio.value = '';
              this.refs.fechaFin.value = '';
              this.refs.categoriaEnObjeto.value = '';
              this.setState({
                archivos: [],
                categoriaElemento: 'seleccione',
                claveMateria: 'seleccione',
                claveBloque: 'seleccione',
              }); */
            } else {
              $('#'+this.props.id).modal('hide');
            }
          })
          

        } else {
          //informamos que faltan campos a llenar para actualizar los datos
          alert("Faltan campos por llenar");
        }
      } else {
        //verificamos que haya datos en los campos
        if(file && nombreElemento && descripcionElemento && categoriaElemento && claveMateria && claveBloque && fechaInicio && categoriaEnObjeto){
          let uploadInstance = ElementosObjetosAprendizaje.insert({
            file: file,
            meta: {
              locator: self.props.fileLocator,
              userId: Meteor.userId(), // Optional,asignamos el id del usuario que guarda el archivo
              nombreElemento,
              descripcionElemento,
              categoriaElemento,
              fechaInicio,
              fechaFin,
              categoriaEnObjeto,
              claveMateria,
              claveBloque,
              fechaCarga
            },
            streams: 'dynamic',
            chunkSize: 'dynamic',
            allowWebWorkers: true // If you see issues with uploads, change this to false
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
          //ocultamos modal
          $('#'+this.props.id).modal('hide');
          //reseteando los campos de informacion
          this.refs.nombreElemento.value = '';
          this.refs.descripcionElemento.value = '';
          this.refs.fechaInicio.value = '';
          this.refs.fechaFin.value = '';
          this.refs.categoriaEnObjeto.value = '';
          this.setState({
            archivos: [],
            categoriaElemento: 'seleccione',
            claveMateria: 'seleccione',
            claveBloque: 'seleccione',
          });    

        } else {
          alert("Faltan campos por llenar");
        }
      }
      
    } else {
      alert("Solo puedes cargar un archivo al elemento");
      return;
    }

  }  

  componentDidMount(){
    $('#fechaInicio').datepicker({
      uiLibrary: 'bootstrap4'
    });

    $('#fechaFin').datepicker({
      uiLibrary: 'bootstrap4'
    });
    //si se abrio el modal en modo edicion cargamos los datos
    if(this.props.editing){
      console.log('props elementoModal: ', this.props);
      this.refs.nombreElemento.value = this.props.data.nombreElemento;
      this.refs.descripcionElemento.value = this.props.data.descripcionElemento;
      this.refs.fechaInicio.value = this.props.data.fechaInicio;
      this.refs.fechaFin.value = this.props.data.fechaFin;
      this.refs.categoriaEnObjeto.value = this.props.data.categoriaEnObjeto;
      this.setState({ 
        categoriaElemento: this.props.data.categoriaElemento,
      });          
    }
  }

  //evento que se ejecuta al escoger un valor del select (determinamos el id de la materia seleccionada)
  handleChangeMateria(event){    
    this.setState({ claveMateria: event.target.value });  
    //filtramos los blques de acuerdo a la materia seleccionada
		let bloquesMateria = this.state.bloques.filter(bloque => bloque.idMateria ==  event.target.value);
    //actualizamos state para mostrar los bloques de acuerdo a la materia seleccionada    
    this.setState({ optionsBloquesSelect: bloquesMateria });
  }

  //evento que se ejecuta al escoger un valor del select (determinamos el id del bloque seleccionado)
  handleChangeBloque(event){
    this.setState({ claveBloque: event.target.value }); //id del bloque seleccionado
  }

  //evento que se ejecuta al escoger un valor del select (determinamos la categoria del elemento)
  handleChangeCategoriaElemento(event){
    this.setState({ categoriaElemento: event.target.value })
  }

  //evento que se ejecuta al escoger un valor del select (almacenamos el archivo a cargar)
  handleChangeArchivo(event){
    this.setState({ archivos: event.target.files });    
  }

  //mostramos las materias registradas en el select
  renderMateriasListItems(){
    if(this.state.materias.length > 0){
      return this.state.materias.map((materia) => {
        return <option key={materia._id} value={materia._id}>{materia.nombreMateria}</option>
      });
    }    
  }

  renderBloquesListItems(){
		if(this.state.optionsBloquesSelect.length > 0 ){
			return this.state.optionsBloquesSelect.map((bloque) => {
				return <option key={bloque._id} value={bloque._id}>{bloque.nombreBloque} - Bloque {bloque.numBloque} </option>
			});
		} 
	}

  render () {     
    //mostramos los selects de acuerdo al tipo de modo en que se abrio el modal
    let selects = (
      <React.Fragment>
        <div className="form-group">
          <label htmlFor="escogeMateria">Seleccione materia: </label>
          <select value={ this.state.claveMateria } onChange={this.handleChangeMateria} id="escogeMateria" className="form-control form-control rounded">
            <option value ="seleccione">Seleccione materia</option>																
            { this.renderMateriasListItems() }                                
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="escogeBloque">Seleccione bloque: </label>
          <select value={this.state.claveBloque} onChange={this.handleChangeBloque} id="escogeBloque" className="form-control form-control rounded">
            <option value ="seleccione">Seleccione bloque</option>																
            { this.renderBloquesListItems() }                               
          </select>
        </div>
      </React.Fragment>
      );
    
    let fileChooser = (
      <React.Fragment>
        <div className="form-group">
            <label htmlFor="inputArchivo">Seleccione imagen</label>
            <input type="file" className="form-control-file" onChange={this.handleChangeArchivo} id="inputArchivo"/>
          </div> 
      </React.Fragment>
    );
    //si entro en modo edicion oculto los campos que no voy a mostrar
    if(this.props.editing){
      selects = null;
      fileChooser = null;
    }
    return (
      <div className="modal fade" id={ this.props.id } tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel"> { this.props.title }</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form onSubmit={ this.onSubmitElemento }>    
            <div className="modal-body">                                          
                <div className="form-group">
                  <label htmlFor="nombreElemento">Nombre elemento: </label>
                  <input type="text" className="form-control" id="nombreElemento" ref="nombreElemento" defaultValue={ this.state.nombreElemento } placeholder="Independencia de México..."/>                                  
                </div>
                <div className="form-group">
                  <label htmlFor="descripcionElemento">Descripcion elemento: </label>
                  <textarea className="form-control" rows="4" id="descripcionElemento" ref="descripcionElemento" placeholder="Escriba una descripcion aquí..."></textarea>
                </div>
                <div className="form-group">
                  <label htmlFor="categoriaElemento">Seleccione categoria del elemento: </label>
                  <select value={this.state.categoriaElemento} onChange={this.handleChangeCategoriaElemento} id="categoriaElemento" className="form-control form-control rounded">
                    <option value ="seleccione">Seleccione categoria</option>																
                    <option value="personaje">Personaje</option>
                    <option value ="evento">Evento</option>    
                    <option value ="artefacto">Artefacto</option>
                  </select>
                </div>
                { selects }
                <div className="form-group">
                <label htmlFor="categoriaEnObjeto">Categoría en objeto: </label>
                  <input type="text" className="form-control" id="categoriaEnObjeto" ref="categoriaEnObjeto" defaultValue={ this.state.categoriaEnObjeto } placeholder="Civilizacion China..."/>  
                </div>
                <div className="form-row">
                  <div className="form-group col-6 np">
                    <label htmlFor="fechaInicio">Fecha inicio:</label>
                    <input id="fechaInicio" ref="fechaInicio" className="form-control form-control rounded"/>
                  </div>
                  <div className="form-group col-6 np">
                    <label htmlFor="fechaFin">Fecha fin:</label>
                    <input id="fechaFin" ref="fechaFin" className="form-control form-control rounded"/>
                  </div>          
                </div>  
                { fileChooser }                                 
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
              <button className="btn btn-primary">{ this.props.actionName }</button>
            </div>
            </form>
          </div>
        </div>
      </div> 
    );
  }
}

export default withTracker(() => {
  //obtenemos informacion de las materias
  let handle = Meteor.subscribe("materias");
  let isReady = handle.ready();
  let materias = Materias.find().fetch();

  //obtenemos informacion de bloques
  let handleB = Meteor.subscribe("bloques");
  let isReadyB = handleB.ready();
  let bloques = Bloques.find().fetch();

  return {
    isReady: isReady,
    materias: materias,
    isReadyB: isReadyB,
    bloques: bloques,
  };
})(ElementoModal);