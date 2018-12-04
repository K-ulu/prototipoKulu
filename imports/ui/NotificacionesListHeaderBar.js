import React from 'react';

import NotificacionesMiniListItem from './NotificacionesMiniListItem';

export default class NotificacionesListHeaderBar extends React.Component {
  
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

  renderNotificacionesListItems(){
    return this.state.notificaciones.map((notificacion) => {
      return (
        <NotificacionesMiniListItem key={ notificacion._id+'maestro' } {...notificacion}/>
      );
    });
  }

  render() {
    return (
      <React.Fragment>
        { this.renderNotificacionesListItems() }
      </React.Fragment>      
    );
  }
}