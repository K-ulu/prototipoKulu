import React from 'react'
import { withTracker } from 'meteor/react-meteor-data';

import { Docentes } from '../api/docentes';

class Perfil extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      infoDocente: [],
      showInfoTeacher: false,
    };
  }

  componentDidMount(){
    //si el usuario el maestro mostramos campos extra
    if(Session.get('tipoUsuario') == 'docente'){
      this.setState({ showInfoTeacher: true });
    }
  }

  //actualizamos props
	static getDerivedStateFromProps(nextProps, prevState) {
		if(nextProps.readyD){      
			return {
        infoDocente: nextProps.docente,
      };
    } 
		//retornamos null cuando no sea necesario actualizar state
		return null;
  }

  onSubmit(e) {
    e.preventDefault();
    
    //recuperando valores
    let _id = Session.get('user')._id;
    let nombre = this.refs.nombre.value;
    let apellidoP = this.refs.apellidoP.value;
    let apellidoM = this.refs.apellidoM.value;
    let curp = this.refs.curp.value;

    Meteor.call('user.update.profile', _id, nombre, apellidoP, apellidoM, curp, (err, res) => {
      if(!err){
        alert("Datos actualizados correctamente.");
      } else {
        console.log(err.reason);
        alert("Hubo un error al actualizar tus datos. ");
      }
    });

  }

  onSubmitInfoDocente(e) {
    e.preventDefault();

    //recuperando valores a actualizar
    let id = Session.get('user')._id;
    let claveDocente = this.refs.claveDocente.value;
    let claveEscuela = this.refs.claveEscuela.value;
    let rfc = this.refs.rfc.value;

    Meteor.call('docentes.update', id, rfc, claveDocente, claveEscuela, (err, res) => {
      if(!err){
        alert("Datos actualizados correctamente.");
      } else {
        console.log(err.reason);
        alert("Hubo un error al actualizar tus datos. ");
      }
    });

    
  }

  renderInformacionMaestro(){
    if(this.state.showInfoTeacher){
      let claveDocente = null;
      let claveEscuela = null;
      let rfc = null;
      if(this.state.infoDocente.length > 0){
        claveDocente = this.state.infoDocente[0].claveDocente;
        claveEscuela = this.state.infoDocente[0].claveEscuela;
        rfc = this.state.infoDocente[0].rfc;
      }
      
      return (
        <form onSubmit={ this.onSubmitInfoDocente.bind(this) } >
          <div className="card noborder mb-3">
            <div className="card-header"> <h3>Datos de docente</h3></div>
            <div className="card-body">
              {/*Card title*/}
              <div className="row justify-content-center">                    
                <div className="col-lg-6">
                  <div className="form-group">
                    <label htmlFor="claveDocente">Clave docente: </label>
                    <input type="text" className="form-control" id="claveDocente" ref="claveDocente" defaultValue={ claveDocente } /> 
                  </div>
                  <div className="form-group">
                    <label htmlFor="claveEscuela">Clave de escuela: </label>
                    <input type="text" className="form-control" id="claveEscuela" ref="claveEscuela" defaultValue={ claveEscuela } /> 
                  </div>                
                </div>  
                <div className="col-lg-6">
                  <div className="form-group">
                    <label htmlFor="rfc">RFC: </label>
                    <input type="text" className="form-control" id="rfc" ref="rfc" defaultValue={ rfc }/> 
                  </div>                   
                </div>                                     
              </div>
              <div className="row justify-content-center">
                <div className="col-lg-6 col-xl-4">
                  <button className="btn btn-primary btn-block">Actualizar</button>
                </div>
              </div>
            </div>
          </div>
        </form>
      );

    }
    

  }

  render () {
    return(
      <div>
        {/*inicio del componente*/}
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
            {/*Card*/}                  
            <form onSubmit={ this.onSubmit.bind(this) }>
              <div className="card noborder mb-3">
                <div className="card-header"> <h3>Datos personales</h3></div>
                <div className="card-body">
                  {/*Card title*/}
                  <div className="row justify-content-center">                    
                    <div className="col-lg-6">
                      <div className="form-group">
                        <label htmlFor="nombre">Nombre: </label>
                        <input type="text" className="form-control" id="nombre" ref="nombre" defaultValue={ Session.get('user').profile.nombre } /> 
                      </div>
                      <div className="form-group">
                        <label htmlFor="apellidoP">Apellido Paterno: </label>
                        <input type="text" className="form-control" id="apellidoP" ref="apellidoP" defaultValue={ Session.get('user').profile.apellidoP } /> 
                      </div>
                      <div className="form-group">
                        <label htmlFor="apellidoM">Apellido Materno: </label>
                        <input type="text" className="form-control" id="apellidoM" ref="apellidoM" defaultValue={ Session.get('user').profile.apellidoM } /> 
                      </div>
                      <div className="form-group">
                        <label htmlFor="correo">Correo: </label>
                        <input type="text" className="form-control" id="correo" ref="correo" defaultValue={ Session.get('user').emails[0].address }  disabled/> 
                      </div>
                    </div>  
                    <div className="col-lg-6">
                      <div className="form-group">
                        <label htmlFor="nickname">Nickname: </label>
                        <input type="text" className="form-control" id="nickname" ref="nickname" defaultValue={ Session.get('user').profile.nickname } disabled/> 
                      </div>
                      <div className="form-group">
                        <label htmlFor="curp">CURP: </label>
                        <input type="text" className="form-control" id="curp" ref="curp" defaultValue={ Session.get('user').profile.curp } /> 
                      </div>
                      <div className="form-group">
                        <label htmlFor="tipo">Tipo: </label>
                        <input type="text" className="form-control" id="tipo" ref="tipo" defaultValue={ Session.get('tipoUsuario') } disabled/> 
                      </div>                     
                    </div>                                     
                  </div>
                  <div className="row justify-content-center">
                    <div className="col-lg-6 col-xl-4">
                      <button className="btn btn-primary btn-block">Actualizar</button>
                    </div>
                  </div>
                </div>
              </div>
            </form>


            { this.renderInformacionMaestro() }
          </div>


        </div>

        {/*fin del componente*/}
      </div>
    );
  }
}

export default withTracker(() => {
  let id = Session.get('user')._id;
  const handleD = Meteor.subscribe('docentes');  
  const readyD = handleD.ready();  
  let docente = Docentes.find().fetch();

  return {
    readyD,
    docente,
  };

})(Perfil);