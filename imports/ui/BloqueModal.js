import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import { Materias } from '../api/materias';

class BloqueModal extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      nombreBloque: '',
      numBloque: '',
      descripcionBloque: '', 
      claveMateria: '',
      materias: [],   
      isReady: '',   
    };

    this.onSubmitBloque = this.onSubmitBloque.bind(this);
    this.handleChangeNumBloque = this.handleChangeNumBloque.bind(this);
    this.handleChangeMateria = this.handleChangeMateria.bind(this);
  }

  componentDidMount() {
    //si se abrio el modal en modo edicion cargamos los datos
    if(this.props.editing){
      this.refs.nombreBloque.value = this.props.nombreBloque;
      this.refs.descripcionBloque.value = this.props.descripcionBloque; 
      this.setState({ numBloque: this.props.numBloque, claveMateria: this.props.idMateria });
    }
  }

  //actualizamos props
	static getDerivedStateFromProps(nextProps, prevState) {
		if(nextProps.materias.length > 0){      
			return {
        materias: nextProps.materias,
        isReady: nextProps.isReady,
      };
		}
		//retornamos null cuando no sea necesario actualizar state
		return null;
	}

  //guardar o editar bloque
  onSubmitBloque(e) {
    e.preventDefault();

    //recuperamos la informacion del formulario
    let nombreBloque = this.refs.nombreBloque.value.trim();
    let numBloque = this.state.numBloque;
		let descripcionBloque = this.refs.descripcionBloque.value.trim();       
    let idMateria = this.state.claveMateria;

    //obtenemos informacion de la materia
    let materia = this.state.materias.filter(materia => materia._id ==  idMateria);

    //determinamos en que modo se abrio el modal
    if(this.props.editing){
      Meteor.call('bloques.update', this.props.id, nombreBloque, descripcionBloque, idMateria, numBloque, (err, res) => {
        if(!err){
          $('#'+this.props.id).modal('hide');
          this.refs.nombreBloque.value = '';
          this.refs.descripcionBloque.value = '';
          this.setState({ numBloque: 'seleccione', claveMateria: 'seleccione' });
        } else {
          console.log(err.reason);
          $('#'+this.props.id).modal('hide');
        }
      });

    } else {
      Meteor.call('bloques.insert', nombreBloque, descripcionBloque, numBloque, idMateria, (err, res) => {
        if (!err) { //bloque insertado
          $('#'+this.props.id).modal('hide');
          this.refs.nombreBloque.value = '';
          this.refs.descripcionBloque.value = '';
          this.setState({ numBloque: 'seleccione', claveMateria: 'seleccione' });
  
          Meteor.call('materias.updateCantBloques', materia[0]._id, materia[0].cantidadBloques, (err, res) => {
            if(!err){
              //console.log('insertado');
            } else {
              console.log(err.reason);
            }
          });
          
        } else { //error al enviar mensaje
          $('#'+this.props.id).modal('hide');
          console.log(err.reason);
        }
      });
    }

  }

  //evento del select del num bloque
  handleChangeNumBloque(event){
    this.setState({ numBloque: event.target.value });   
  }

  //evento del select al escoger la materia
  handleChangeMateria(event){
    this.setState({ claveMateria: event.target.value });  
  }

  //mostrando las materias en el select
  renderMateriasListItems(){
    return this.state.materias.map((materia) => {
      return <option key={materia._id} value={materia._id}>{materia.nombreMateria}</option>
    });

  }

  render() {
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
            <form onSubmit={ this.onSubmitBloque }>    
              <div className="modal-body">  
                <div className="form-row">
                  <div className="form-group col-4">
                    <label htmlFor="numBloque">Num Bloque: </label>
                    <select value={this.state.numBloque} onChange={this.handleChangeNumBloque} id="numBloque" className="form-control form-control rounded">
                      <option value ="seleccione">Num:</option>																
                      <option value="1">I</option>
                      <option value ="2">II</option>                                  
                      <option value ="3">III</option>
                      <option value ="4">IV</option>
                      <option value ="5">V</option>
                    </select>
                  </div>
                  <div className="form-group col-8">
                    <label htmlFor="nombreBloque">Bloque: </label>
                    <input type="text" className="form-control" id="nombreBloque" ref="nombreBloque" defaultValue={ this.state.nombreBloque } placeholder="El alfabeto..."/> 
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="descripcionBloque">Descripcion bloque: </label>
                  <textarea className="form-control" rows="5" id="descripcionBloque" ref="descripcionBloque" placeholder="Escriba una descripcion aquí..."></textarea>
                </div>
                <div className="form-group">
                  <label htmlFor="escogeGrado">Seleccione materia: </label>
                  <select value={ this.state.claveMateria } onChange={this.handleChangeMateria} id="escogeGrado" className="form-control form-control rounded">
                    <option value ="seleccione">Seleccione materia</option>																
                    { this.renderMateriasListItems() }                                
                  </select>
                </div>   
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

export default withTracker(()=> {
  let handle = Meteor.subscribe("materias");
  let isReady = handle.ready();
  let materias = Materias.find().fetch();

  return {
    isReady: isReady,
    materias: materias,
  };

})(BloqueModal);