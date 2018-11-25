import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import Chat from  '../../Chat';

import { Materias } from '../../../api/materias';
import { Bloques } from '../../../api/bloques';
import { Temas } from '../../../api/temas';
import { Grupos } from '../../../api/grupos';
import { Alumnos } from '../../../api/alumnos';
import { Lobbies } from '../../../api/lobbies';
import { Mensajes } from '../../../api/mensajes';

class ConfiguraSesion extends React.Component {

  constructor(props){
		super(props);
		this.state = {
      materias: [], //guarda todas las materias registradas
			materia: {}, //guardamos objeto completo de la materia seleccionada
			bloques: [], //guarda todos los bloques registrados
			temas: [], //guarda todos los temas registrados
			grupos: [], //guarda todos los grupos registrados por el usuario logueado
			alumnos: [], //guarda todos los grupos registrados por el usuario logueado
			alumnosGrupo: [], //guarda los alumnos filtrados y los muestra en el select segun el grupo
			valueMateria: '', //valor de la materia seleccionado en el select
			valueBloque: '', //valor del bloque seleccionado en el select
			valueTema: '', //valor del tema seleccionado en el select
			valueGrupo: '', //valor del tema seleccionado en el select
			optionsBloquesSelect: [], //guarda los bloques de acuerdo a la materia seleccionada
			optionsTemasSelect: [], //guarda los temas de acuerdo al bloque seleccioando

			lobbies: [], //almacena todos los lobbies 
			mensajes: [], //almacena todos los mensajes
      allUsers: [], //alamcena todos los usuarios

      
    };

    this.onSubmitConfiguracion = this.onSubmitConfiguracion.bind(this);
    this.handleChangeMateria = this.handleChangeMateria.bind(this);
    this.handleChangeBloque = this.handleChangeBloque.bind(this);
    this.handleChangeTema = this.handleChangeTema.bind(this);    
    this.handleConfigTab = this.handleConfigTab.bind(this);
    this.handleChangeGrupo = this.handleChangeGrupo.bind(this);    
    this.onAgregar = this.onAgregar.bind(this);
    this.onQuitar = this.onQuitar.bind(this);
    
  }
  
  //habilitamos el primer tab cuando se carga el componente
	componentDidMount(){
    document.getElementById("default").click();		
    console.log("Configura sesion mounted");
    console.log("props config", this.props);

    //agregamos usuario logueado a la lista de pariticipantes de forma hidden
    this.agregarPropietario();    
  }
  
  //agregamos al propietario de la partida a la lista de participantes
  agregarPropietario(){
    let seleccionados = document.querySelector('#seleccionados');        
    let option = document.createElement('option');
    option.textContent = Session.get('user').profile.nombre +  ' ' + Session.get('user').profile.apellidoP; //creamos nuestro objeto option
    option.id = Session.get('user')._id + 'seleccionado';
    option.value = Session.get('user')._id;    
    option.hidden = true;
    seleccionados.appendChild(option);
  }
  
  //actualizamos props
	static getDerivedStateFromProps(nextProps, prevState) {
    if(nextProps.materias.length > 0 && nextProps.bloques.length > 0 && nextProps.temas.length > 0){
      console.log('nuevos props de gera: ', nextProps);
      return {
        materias: nextProps.materias,
        bloques: nextProps.bloques,
        temas: nextProps.temas,
        grupos: nextProps.grupos,
        alumnos: nextProps.alumnos,
        lobbies: nextProps.lobbies,
        mensajes: nextProps.mensajes,
        allUsers: nextProps.allUsers,
      };
    }
    //retornamos null cuando no sea necesario actualizar state
    return null;
  }

  //evento select materia
	handleChangeMateria(event){
		//guardamos el id de la materia seleccionada
    this.setState({ valueMateria: event.target.value });
		//filtramos los blques de acuerdo a la materia seleccionada
		let bloquesMateria = this.state.bloques.filter(bloque => bloque.idMateria ==  event.target.value);
		//actualizamos state para mostrar los bloques de acuerdo a la materia seleccionada
		this.setState({ optionsBloquesSelect: bloquesMateria });		
  }

	//evento select bloque
	handleChangeBloque(event){
		//guardamos el id de el bloque seleccionado
		this.setState({ valueBloque: event.target.value });
		//filtramos los temas de acuerdo al bloque seleccionado
		let temasBloque = this.state.temas.filter(tema => tema.idBloque == event.target.value);
		//acutalizamos state para mostrar los temas de acuerdo a el bloque seleccionado
		this.setState({ optionsTemasSelect:  temasBloque });
  }
  
  //evento select tema
	handleChangeTema(event){
		//guardamos el id del tema seleccionado
		this.setState({ valueTema: event.target.value });
		//TODO: filtramos los objetos disponibles de acuerdo al tema
		// console.log(event.target.value);
	}

	//evento select grupo (mostramos los alumnos)
	handleChangeGrupo(event){
		//guardamos el id del grupo seleccionado
    this.setState({ valueGrupo: event.target.value });
    //filtramos los alumnos de acuerdo al grupo seleccionado    
    let alumnosGrupoData = this.state.alumnos.filter( alumno => alumno.idGrupo == event.target.value);
    let alumnosGrupo = []; //contendra la informacion del usuario
    //recorremos de acuerdo a cuantos alumnos hay en el grupo    
    for(let i = 0; i < alumnosGrupoData.length; i++){
      //recorremos entre los datos de los usuarios
      let correoAlumno = alumnosGrupoData[i].correo;
      for(let j = 0; j < this.state.allUsers.length; j ++){
        //comparamos correo
        let correoUsuario = this.state.allUsers[j].emails[0].address;
        if(correoAlumno == correoUsuario){
          alumnosGrupo.push(this.state.allUsers[j]); //guardamos la info de los usuarios en un nuevo arreglo
        }
      }
    }
    //datos del usuario filtrados 
		// actualizamos state para mostrar los alumnos que estan registrados en ese grupo (info de usuarios)
		this.setState({ alumnosGrupo  });
  }
  
  //evento que se dispara cuando cambias de tab
	handleEvent(params, e){
		//Declare all variables
		let i, tabcontent, tablinks;

		// Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
		// Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

		// Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(params).style.display = "block";
    e.currentTarget.className += " active";
	}

	//evento clic primera tab
	handleConfigTab(event){
		event.preventDefault();

		//Declare all variables
		let i, tabcontent, tablinks;

		// Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
		// Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

		// Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById('participantes').style.display = "block";
		// e.currentTarget.className += " active";
		// let hola = document.getElementsByClassName('tablinks');
		// console.log('tabs', tablinks);
		tablinks[1].className += " active";
	}

	//metodo que se encarga de cargar la materias en el select segun los datos del state
	renderMateriasListItems(){
		if(this.state.materias.length > 0){
			return this.state.materias.map((materia) => {
				return <option key={materia._id} value={materia._id}>{materia.nombreMateria}</option>
			});
		} 
  }

	//metodo que se encarga de cargar los bloques en el select segun los datos del state
	renderBloquesListItems(){
		if(this.state.optionsBloquesSelect.length > 0 ){
			return this.state.optionsBloquesSelect.map((bloque) => {
				return <option key={bloque._id} value={bloque._id}>{bloque.nombreBloque} - Bloque {bloque.numBloque} </option>
			});
		} 
	}

	//metodo que se encarga de cargar los grupos en el select segun los datos del state
	renderGruposListItems(){
		if(this.state.grupos.length > 0 ){
			return this.state.grupos.map((grupo) => {
				return <option key={grupo._id} value={grupo._id}>{grupo.nombreGrupo} -{grupo.grado} - {grupo.grupo}</option>
			});
		} 
	}

	//metodo que se encarga de cargar los bloques en el select segun los datos del state
	renderTemasListItems(){
		if(this.state.optionsTemasSelect.length > 0 ){
			return this.state.optionsTemasSelect.map((tema) => {
				return <option key={tema._id} value={tema._id}>{tema.nombreTema} - {tema.descripcionTema}</option>
			});
		} 
	}
	
	//metodo que se encarga de cargar los alumnos en el select
	renderAlumnosListItems(){
		if(this.state.alumnosGrupo.length > 0 ){
			return this.state.alumnosGrupo.map( (usuario) => {
				return <option key={ usuario._id } value={ usuario._id } id={ usuario._id }> { usuario.profile.nombre } { usuario.profile.apellidoP }</option>
			});
		} 
  }
  
  //cuando se le da clic a continuar para crear la nueva sesion
  onSubmitConfiguracion(e){
    e.preventDefault();    
    console.log(this.props);
    this.props.completarConfiguracion();    

  }


  //cuando le damos clic al boton de agregar para agregar alumno
  onAgregar(e){
    e.preventDefault();

    //obtenemos nodos
    const selected = document.querySelectorAll('#opciones option:checked');
    //creamos array a patir de la lista de nodos
    const alumnos = Array.from(selected).map((el) => {
      let obj = { };
      obj.id = el.id + 'seleccionado';
      obj.value = el.value;
      obj.texto = el.textContent; 
      return obj;
    }); 

    //seleccionamos nuestro select
    let seleccionados = document.querySelector('#seleccionados');
    for(let i = 0; i < alumnos.length; i ++){
      //buscamos el elemento para verificar si ya esta agregado
      let elemento = document.querySelector('#'+alumnos[i].id);
      if(elemento == null){ //si no existe en nuestra lista lo agregamos       
        let option = document.createElement('option');
        option.textContent = alumnos[i].texto; //creamos nuestro objeto option
        option.id = alumnos[i].id;
        option.value = alumnos[i].id;
        seleccionados.appendChild(option);
      } else { //mostramos mensaje si ya fue agregado
        alert('Solo puedes agregar al alumno una vez');
      }    
    }
  }

  //cuando le damos al boton quitar para eliminar un alumno
  onQuitar(e){
    e.preventDefault();

    //obtenemos nodos
    const selected = document.querySelectorAll('#seleccionados option:checked');
    //creamos array a patir de la lista de nodos
    const alumnos = Array.from(selected).map((el) => {
      let obj = { };
      obj.id = el.id;
      obj.value = el.value;
      obj.texto = el.textContent; 
      return obj;
    }); 

    //seleccionamos nuestro select
    let seleccionados = document.querySelector('#seleccionados');
    for(let i = 0; i < alumnos.length; i ++){
      //buscamos el elemento para verificar si ya esta agregado
      let elemento = document.querySelector('#'+alumnos[i].id);
      //eliminamos al hijo
      seleccionados.removeChild(elemento);
    }
  }
  
  render () {
    return (
      <div>
				<div className="row">
					<div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
						
						<div className="card noborder mb-3">
							<div className="card-header">
								<ul className="nav nav-tabs card-header-tabs">
									<li className="nav-item">
										<a onClick={ this.handleEvent.bind(this, 'configuracion') } className="nav-link tablinks" href="#" id="default">Configuración</a>
									</li>
									<li className="nav-item">
										<a onClick={ this.handleEvent.bind(this, 'participantes') } className="nav-link tablinks" href="#">Participantes</a>
									</li>
									{/*<li className="nav-item">
										<a onClick={ this.handleEvent.bind(this, 'lobby') } className="nav-link tablinks" href="#">Lobby</a>
									</li>*/}
								</ul>
							</div>
              <div className="card-body">
								{/*title*/}
								<div className="row justify-content-center">
									<div className="col-6">
										<h1 className="text-center">Nueva Sesión</h1>
									</div>     
								</div>


								<div className="row justify-content-center">
									<div className="col-10">		

                    <form onSubmit={ this.onSubmitConfiguracion }>

                      <div id="configuracion" className="row tab-content">
                        <div className="col-12">												
                          {/* Materia */}
                          <div className="form-group row justify-content-center">
                            <div className="col-2">
                              <label htmlFor="materia" className="col-form-label">Materia: </label>
                            </div>
                            <div className="col-7">
                              <select value={ this.state.valueMateria } onChange={ this.handleChangeMateria } className="form-control rounded">
                                <option value ="seleccione">Seleccione materia</option>
                                  { this.renderMateriasListItems() }                              
                              </select> 
                            </div>
                          </div>		

                          {/* Bloque */}
                          <div className="form-group row justify-content-center">
                            <div className="col-2">
                              <label htmlFor="bloque" className="col-form-label">Bloque: </label>
                            </div>
                            <div className="col-7">
                              <select value={ this.state.valueBloque } onChange={ this.handleChangeBloque } id="bloque" className="form-control">
                                <option value ="seleccione">Seleccione bloque</option>
                                { this.renderBloquesListItems() }
                              </select>
                            </div>
                          </div>

                          {/* Tema */}
                          <div className="form-group row justify-content-center">
                            <div className="col-2">
                              <label htmlFor="tema" className="col-form-label">Tema: </label>
                            </div>
                            <div className="col-7">
                              <select value={ this.state.valueTema } onChange={ this.handleChangeTema } id="tema" className="form-control">
                                <option value ="seleccione">Seleccione tema</option>
                                { this.renderTemasListItems() }
                              </select>
                            </div>
                          </div>

                          {/* Tipo */}
                          <div className="form-group row justify-content-center">
                            <div className="col-2">
                              <label htmlFor="tipo" className="col-form-label">Tipo: </label>
                            </div>
                            <div className="col-7">
                              <select id="tipo" className="form-control">
                                <option value="seleccione">Seleccione tipo</option>
                                <option>Línea del tiempo</option>
                                <option>Cuerpo humano</option>
                                <option>Mapas</option>
                              </select>
                            </div>
                          </div>

                          {/* Objeto */}
                          <div className="form-group row justify-content-center">
                            <div className="col-2">
                              <label htmlFor="objeto" className="col-form-label">Objeto: </label>
                            </div>
                            <div className="col-7">
                              <select id="objeto" className="form-control">
                                <option value="seleccione">Seleccione objeto</option>
                                <option>...</option>
                              </select>
                            </div>
                          </div>

                          <div className="form-group row justify-content-end">
                            <div className="col-2">
                              <button onClick={ this.handleConfigTab } className="btn btn-primary btn-block">Continuar</button>
                            </div>
                            
                          </div>
                                            
                        </div>                       
                      </div>

                      <div id="participantes" className="row tab-content">
                        <div className="col-12">   												
                          {/* Seleccion de grupos*/}
                          <div className="form-group row justify-content-center">
                            <div className="col-10">
                              <label htmlFor="grupos" className="col-form-label">Alumnos: </label>
                            </div>
                            <div className="col-10">
                              <select value={ this.state.valueGrupo } onChange={ this.handleChangeGrupo } id="grupos" className="form-control">
                                <option value ="seleccione">Seleccione grupo</option>
                                { this.renderGruposListItems() }
                              </select>
                              <small id="ayuda" className="form-text text-muted">Selecciona un grupo para ver tus alumnos.</small>
                            </div>														
                          </div>

                          <div className="form-group row">
                            <div className="col-5">
                              <select id="opciones" multiple className="custom-select" size="10">
                                { this.renderAlumnosListItems() }
                              </select>
                            </div>
                            <div className="col-2">
                              <div className="row">
                                <div className="col">
                                  <button onClick={ this.onAgregar } className="btn btn-success btn-block">Agregar</button>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col">
                                  <button onClick={ this.onQuitar } className="btn btn-danger btn-block">Quitar</button>
                                </div>
                              </div>
                            </div>
                            <div className="col-5">
                              <select id="seleccionados" multiple className="custom-select" size="10">
                              </select>
                            </div>
                          </div>
                          
                          
                          <div className="form-group row justify-content-end">
                            <div className="col-2">
                              <button type="button" className="btn btn-outline-danger btn-block">Regresar</button>
                            </div>													
                            <div className="col-2">
                              <button className="btn btn-primary btn-block">Continuar</button>
                            </div>														
                          </div>
                                            
                        </div>                       
                      </div>

                      {/*<div id="lobby" className="row tab-content">
											<div className="col-6">  												
												<Chat lobbies={this.state.lobbies} mensajes={this.state.mensajes} allUsers={this.state.allUsers}/>
											</div>
										</div>*/}

                    </form>


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

export default withTracker(() => {
  Meteor.subscribe("materias");
  Meteor.subscribe("bloques");
  Meteor.subscribe('temas');
  Meteor.subscribe('grupos');
  Meteor.subscribe('alumnos');
  let materias = Materias.find().fetch();
  let bloques = Bloques.find().fetch();
  let temas = Temas.find().fetch();
  let grupos = Grupos.find().fetch();
  let alumnos = Alumnos.find({ idDocente: Meteor.userId(), estatus: 'registrado' }).fetch();

  Meteor.subscribe('lobbies');
  let lobbies = Lobbies.find().fetch();		
  
  Meteor.subscribe('mensajes', Session.get('lobby'));
  let mensajes = Mensajes.find().fetch();		
  
  let users = Meteor.subscribe('allUsers');	
  let todos;
  if (users.ready()) {
    todos = Meteor.users.find().fetch(); // will return all users
    //return todos[0].profile.nickname;
  }

  return {
    materias: materias,
    bloques: bloques,
    temas: temas,
    grupos: grupos,
    alumnos: alumnos,
    lobbies: lobbies,
    mensajes: mensajes,
    allUsers: todos,
  };

})(ConfiguraSesion);