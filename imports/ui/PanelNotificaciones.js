import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import { Notificaciones } from '../api/notificaciones';
import NotificacionesList from './NotificacionesList';

class PanelNotificaciones extends React.Component {

  constructor(props){
		super(props);
		this.state = {
      isReadyN: '',
			notificaciones: [], //almacena las notificaciones
		};
  }
  
  //actualizamos props
	static getDerivedStateFromProps(nextProps, prevState) {
    if(nextProps.isReadyN){
      console.log("updated props from panel", nextProps);      
      return {
        notificaciones: nextProps.notificaciones,
        isReadyN: nextProps.isReadyN
      };
    }
    //retornamos null cuando no sea necesario actualizar state
    return null;
  }

  render () {
    return (
      <div>
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <div className="card noborder mb-3">

              <div className="card-header">
                <h3>Notificaciones</h3>		
              </div>

              <div className="card-body">
                <div className="row justify-content-center">
                  <div className="col-6">
                    <h1 className="text-center">Panel de Notificaciones</h1>
                    <p>Aquí encontrarás las invitaciones a sesiones y podrás unirte a ellas.</p>
                  </div>     
                </div>

                <div className="row justify-content-center">
                  <div className="col-10">
                    <NotificacionesList notificaciones={ this.state.notificaciones } isReadyN={ this.state.isReadyN }/>
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

	//obteniendo informacion de notificaciones
  let handleN = Meteor.subscribe('notificaciones');
  let isReadyN = handleN.ready();
	let notificaciones = Notificaciones.find().fetch();		
	
	console.log('notificaciones usuario from panel', notificaciones);

	return {
		isReadyN,
		notificaciones
	};
})(PanelNotificaciones);