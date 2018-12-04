import React from 'react';

export default class NotificacionesMiniListItem extends React.Component {
  render () {
    return (    
      <a href="#" className="dropdown-item notify-item">
        <div className="notify-icon bg-faded">
          <img src="/images/admin.jpg" alt="img" className="rounded-circle img-fluid"/>
        </div>
        <p className="notify-details">
          <b> ¡Nueva invitación!{ /*this.props.titulo*/ } </b>
          <span> { /*this.props.descripcion*/ } </span>
          <small className="text-muted">3 minutes ago</small>
        </p>
      </a>
    );
  }
}