import React from 'react';

import NotificacionesListItem from './NotificacionesListItem';

export default class NotificacionesList extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      notificaciones: [],
    };
  }

  //actualizamos props
	static getDerivedStateFromProps(nextProps, prevState) {
    if(nextProps.notificaciones != prevState.notificaciones){        
      return {
        notificaciones: nextProps.notificaciones,
      };
    }
    //retornamos null cuando no sea necesario actualizar state
    return null;
  }

  render () {
    if(this.state.notificaciones.length > 0 && this.props.isReadyN){
      let display = this.state.notificaciones.map((notificacion) => {
        return <NotificacionesListItem key={ notificacion._id } {...notificacion}/>
      }); 

      return <div className="container">
        <div className="row justify-content-center">
          { display }
        </div>
      </div>
    } else return <div> No tienes ninguna notificacion </div>;
  }
}