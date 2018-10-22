import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withRouter } from "react-router-dom";

//importando contenido general de la interfaz
import HeaderBar from './components/HeaderBar';
import LeftSidebar from './components/LeftSidebar';
//importando pagina principal
import ContenidoPrincipal from './components/ContenidoPrincipal';
//importando componentes de la biblioteca
import BibliotecaDocumentos from './BibliotecaDocumentos';
import BibliotecaElementos from './BibliotecaElementos';
import BibliotecaLibros from './BibliotecaLibros';
import BibliotecaMultimedia from './BibliotecaMultimedia';
import BibliotecaObjetos from './BibliotecaObjetos';


class AdminContenidoDashboard extends React.Component {

	constructor(props){
    super(props);
    this.state = {
      value: '',  //almacena valor del tipo de usuario
      nombreMat: '', //guarda nombre de la materia
      materias: [],
      bloques: [],
      optionsBloquesSelect: [], //guarda los bloques de acuerdo a la materia seleccionada
      numBloque: '5',
      valueBloque: '', //valor del id bloque seleccionado en el select
    };    

    //contexto de navegador para nuestras funciones
    this.handleChange = this.handleChange.bind(this);    
    this.onSubmit = this.onSubmit.bind(this);

    //bloques
    this.handleChangeMateria = this.handleChangeMateria.bind(this);
    this.onSubmitBloques = this.onSubmitBloques.bind(this);

    //temas
    this.onSubmitTemas = this.onSubmitTemas.bind(this);
    this.handleChangeTema = this.handleChangeTema.bind(this);
  }




  //actualizamos props
	static getDerivedStateFromProps(nextProps, prevState) {
		if(nextProps.materias.length > 0){
			return {
        materias: nextProps.materias,
        bloques: nextProps.bloques,
      };
		}
		//retornamos null cuando no sea necesario actualizar state
		return null;
	}

    
  renderMateriasListItems(){
    return this.state.materias.map((materia) => {
      return <option key={materia._id} value={materia.nombreMateria}>{materia.nombreMateria}</option>
    });
  }

	onSubmit(e){
		e.preventDefault();

		//recuperamos texto del mensaje
    let nombre = this.refs.nombre.value.trim();
		let grado = this.state.value;    
    
    //verificamos si existe el mensaje
    if(nombre && grado){
      Meteor.call('materias.insert', nombre, grado, (err, res) => {
        if (!err) { //mensaje enviado
          this.refs.nombre.value = '';
					this.setState({ value: 'seleccione'}); 
        } else { //error al enviar mensaje
          console.log(err.reason);
        }
      });

		}

    
	}

	//evento que administra el cambio de datos en el select
  handleChange(event){
    this.setState({value: event.target.value});
  }
  handleChangeBloque(event){
    this.setState({valueBloque: event.target.value});
    console.log('id del bloque', event.target.value);
  }

  

  renderMateriasListItems(){
    return this.state.materias.map((materia) => {
      return <option key={materia._id} value={materia._id}>{materia.nombreMateria}</option>
    });
  }

  renderBloquesListItems(){
		if(this.state.optionsBloquesSelect.length > 0 ){
			return this.state.optionsBloquesSelect.map((bloque) => {
				return <option key={bloque._id} value={bloque._id}>{bloque.nombreBloque} - Bloque {bloque.numBloque} </option>
			});
		} 
	}

  onSubmitBloques(e){
		e.preventDefault();

		//recuperamos texto del mensaje
    let nombreBloque = this.refs.nombreBloque.value.trim();
		let descripcionBloque = this.refs.descripcionBloque.value.trim();   
    let numBloque = '5';
    let idMateria = this.state.nombreMat;
    
    let materia = this.state.materias.filter(materia => materia._id ==  idMateria);
    console.log('mat ', materia[0]);
    
    Meteor.call('bloques.insert', nombreBloque, descripcionBloque, numBloque, idMateria, (err, res) => {
      if (!err) { //bloque insertado
        this.refs.nombreBloque.value = '';
        this.refs.descripcionBloque.value = '';
        // test.insert({
        //   campo: 'hola'
        // });

        Meteor.call('materias.updateCantBloques', materia[0]._id, materia[0].cantidadBloques, (err, res) => {
          if(!err){
            console.log('insertado');
          } else {
            console.log(err.reason);
          }
        });
        
      } else { //error al enviar mensaje
        console.log(err.reason);
      }
    });

		
	}

  onSubmitTemas(e){ //insertando temas en la colección 
    e.preventDefault();

    //recuperamos valores de los campos
    let nombreTema = this.refs.nombreTema.value.trim();
    let descripcionTema = this.refs.descripcionTema.value.trim();
    let idBloque = this.state.valueBloque;

    Meteor.call('temas.insert', nombreTema, descripcionTema, idBloque, (err, res) => {
      if(!err){
        console.log('tema insertado');
        this.refs.nombreTema.value = '';
        this.refs.descripcionTema.value = '';
      } else {
        console.log(err.reason + ' error al insertar tema');
      }
    });
  }

  handleChangeMateria(event){
    this.setState({nombreMat: event.target.value});    
    //filtramos los blques de acuerdo a la materia seleccionada
		let bloquesMateria = this.state.bloques.filter(bloque => bloque.idMateria ==  event.target.value);
		//actualizamos state para mostrar los bloques de acuerdo a la materia seleccionada
		this.setState({optionsBloquesSelect: bloquesMateria});
  }


  handleChangeTema(event){
    this.setState({ valueBloque: event.target.value }); //id del bloque seleccionado
  }
    
  

  render () {
    //variable que almacena el contenido segun la url visitada
    let contenido = null;
    let pathname = this.props.history.location.pathname;
    
    if(pathname == '/dashboard' || pathname == '/dashboard/'){
      contenido = <h1>hola principal</h1>;
    } else if(pathname == '/dashboard/biblioteca/libros' || pathname == '/dashboard/biblioteca/libros/'){
      contenido = <BibliotecaLibros tipo="adminContenido"/>
    } else if(pathname == '/dashboard/biblioteca/multimedia' || pathname == '/dashboard/biblioteca/multimedia/'){
      contenido = <BibliotecaMultimedia tipo="adminContenido"/>
    } else if(pathname == '/dashboard/biblioteca/documentos' || pathname == '/dashboard/biblioteca/documentos/'){
      contenido = <BibliotecaDocumentos tipo="adminContenido"/>
    } else if(pathname == '/dashboard/biblioteca/objetos' || pathname == '/dashboard/biblioteca/objetos/'){
      contenido = <BibliotecaObjetos tipo="adminContenido"/>
    } else if(pathname == '/dashboard/biblioteca/elementos' || pathname == '/dashboard/biblioteca/elementos/'){
      contenido = <BibliotecaElementos tipo="adminContenido"/>
    }  

    return (
      <div id="main" className="enlarged">  

        {/*<!-- top bar navigation -->*/}
        <HeaderBar/>

        {/*Wrapper*/}
        <div id="wrapper">

          {/*Left Sidebar*/}
          <LeftSidebar tipo="adminContenido"/>

          {/*Content*/}
          <div id="page-content-wrapper">
            <div className="content">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-xl-12">
                    <div className="breadcrumb-holder">
                      <h1 className="main-title float-left">{ this.props.history.location.pathname }</h1>
                      <ol className="breadcrumb float-right">
                        <li className="breadcrumb-item">Home</li>
                        <li className="breadcrumb-item active">Dashboard</li>
                      </ol>
                      <div className="clearfix"></div>
                    </div>
                  </div>
                </div>

                { contenido }  
								
								<div className="row">
									<div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
										<div className="card noborder mb-3">
											<div className="card-body">
												{/*title*/}
												<div className="row justify-content-center">
													<div className="col-6">
														<h1>Testing</h1>
													</div>     
												</div>

												<div className="row">
													<div className="col-6">
														<form onSubmit={ this.onSubmit}>
															<h3>Materia</h3>
															<label htmlFor="materia">nombre: </label>
															<input id="materia" type="text" ref="nombre" placeholder="nombre materia"/>
															<select value={this.state.value} onChange={this.handleChange} className="form-control form-control rounded">
																<option value ="seleccione">Seleccione grado</option>																
																<option value="5">5</option>
																<option value ="6">6</option>                                  
															</select>  
															<button className="btn btn-primary">Enviar</button>
														</form>
													</div>		

                          <div className="col-6">
														<form onSubmit={ this.onSubmitBloques}>
															<h3>Bloque</h3>
                              <select value={this.state.nombreMat} onChange={this.handleChangeMateria} className="form-control form-control rounded">
																<option value ="seleccione">Seleccione materia</option>		
                                { this.renderMateriasListItems() }                              
															</select> 
															<label htmlFor="materia">nombre: </label>
															<input id="bloque" type="text" ref="nombreBloque" placeholder="nombre bloque"/>
                              <input id="bloque" type="text" ref="descripcionBloque" placeholder="descripcion bloque"/>
															
															<button className="btn btn-primary">Enviar</button>
														</form>
													</div>	



                          <div className="col-6">
														<form onSubmit={ this.onSubmitTemas}>
															<h3>Tema</h3>
                              <select value={this.state.nombreMat} onChange={this.handleChangeMateria} className="form-control form-control rounded">
																<option value ="seleccione">Seleccione materia</option>		
                                { this.renderMateriasListItems() }                              
															</select> 
                              <select value={this.state.valueBloque} onChange={this.handleChangeTema} className="form-control form-control rounded">
																<option value ="seleccione">Seleccione bloque</option>		
                                { this.renderBloquesListItems() }                              
															</select> 
															<label htmlFor="materia">nombre: </label>
															<input id="bloque" type="text" ref="nombreTema" placeholder="nombre tema"/>
                              <input id="bloque" type="text" ref="descripcionTema" placeholder="descripcion tema"/>
															
															<button className="btn btn-primary">Enviar</button>
														</form>
													</div>										
												</div>


											</div>
										</div>

										

									
									</div>								
								</div>

                

              </div>          
            </div>
          </div>
          {/*End Content*/}
      
        </div>
        {/*End Wrapper*/}

      </div>
    );
  }
}

export default withRouter(AdminContenidoDashboard);