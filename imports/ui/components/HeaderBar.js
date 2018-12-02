import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import { withTracker } from 'meteor/react-meteor-data';

import { Session } from 'meteor/session';
import { Notificaciones } from '../../api/notificaciones';
import NotificacionesListHeaderBar from '../NotificacionesListHeaderBar';

class HeaderBar extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			notificaciones: [], //almacena las notificaciones
		};
	}

	componentDidMount(){
		/*INICIO codigo para comportamiento del componente */
		$("#menu-toggle").click(function(e) {
		e.preventDefault();
		$("#wrapper").toggleClass("toggled");
		});

		$( document ).ready(function() {
		$('ul.sidebar-nav > li a').click(function() {
				$(this).parent().find('ul').toggle();
		});
		
		});
		$("#wrapper").toggleClass("toggled");
		/*FIND codigo para comportamiento del componente */
	}

	//actualizamos props
	static getDerivedStateFromProps(nextProps, prevState) {
    if(nextProps.isReadyN){
      return {
        notificaciones: nextProps.notificaciones,
      };
    }
    //retornamos null cuando no sea necesario actualizar state
    return null;
  }

	//funcion para cerrar sesion
	onLogout(){    
		Accounts.logout();
		this.props.history.replace('/');
		Session.set('user', undefined); //borramos de la sesion los datos del usuario
	}

	toggleSidebar(){
		location.href='#menu-toggle';
	}

	render (){
		return (
			<div className="headerbar">
				{/*<!-- LOGO -->*/}
				<div className="headerbar-left">
					<a href="#" className="logo">
						<img alt="Logo" src="/images/kulu_logo_160.png" />
					</a>
				</div>
					
				<nav className="navbar-custom">                              
						<ul className="list-inline float-right mb-0 d-none d-md-block">    
								<li className="list-inline-item dropdown notif ">
										<a className="nav-link dropdown-toggle arrow-none" data-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
												<i className="fa fa-fw fa-question-circle"></i>
										</a>
										<div className="dropdown-menu dropdown-menu-right dropdown-arrow dropdown-arrow-success dropdown-lg">
												
												{/*<!-- item-->*/}
												<div className="dropdown-item noti-title">
														<h5>
																<small>Help and Support</small>
														</h5>
												</div>				            
										</div>
								</li>
		
								<li className="list-inline-item dropdown notif">
										<a className="nav-link dropdown-toggle arrow-none" data-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
												<i className="fa fa-fw fa-envelope-o"></i>
												<span className="notif-bullet"></span>
										</a>
										<div className="dropdown-menu dropdown-menu-right dropdown-arrow dropdown-arrow-success dropdown-lg">
												
												{/*<!-- item-->*/}
												<div className="dropdown-item noti-title">
														<h5>
																<small><span className="label label-danger pull-xs-right">12</span>Contact Messages</small>
														</h5>
												</div>
				
												{/*<!-- item-->*/}
												<a href="#" className="dropdown-item notify-item">
														<p className="notify-details ml-0">
																<b>Jokn Doe</b>
																<span>New message received</span>
																<small className="text-muted">2 minutes ago</small>
														</p>
												</a>
				
												{/*<!-- item-->*/}
												<a href="#" className="dropdown-item notify-item">
														<p className="notify-details ml-0">
																<b>Michael Jackson</b>
																<span>New message received</span>
																<small className="text-muted">15 minutes ago</small>
														</p>
												</a>
				
												{/*<!-- item-->*/}
												<a href="#" className="dropdown-item notify-item">
														<p className="notify-details ml-0">
																<b>Foxy Johnes</b>
																<span>New message received</span>
																<small className="text-muted">Yesterday, 13:30</small>
														</p>
												</a>
				
												{/*<!-- All-->*/}
												<a href="#" className="dropdown-item notify-item notify-all">
														View All
												</a>                
										</div>
								</li>
		
								<li className="list-inline-item dropdown notif">
										<a className="nav-link dropdown-toggle arrow-none" data-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
												<i className="fa fa-fw fa-bell-o"></i>
												<span className="notif-bullet"></span>
										</a>
										<div className="dropdown-menu dropdown-menu-right dropdown-arrow dropdown-lg">
												
												{/*<!-- item-->*/}
												<div className="dropdown-item noti-title">
														<h5>
																<small><span className="label label-danger pull-xs-right"> { this.state.notificaciones.length } </span>Notificaciones</small>
														</h5>
												</div>

												<NotificacionesListHeaderBar notificaciones={ this.state.notificaciones } />				
				
												{/*<!-- All-->*/}
												<a href="/dashboard/perfil/notificaciones" className="dropdown-item notify-item notify-all">
														Ver notificaciones
												</a>
				
										</div>
								</li>
		
								<li className="list-inline-item dropdown notif">
										<a className="nav-link dropdown-toggle nav-user" data-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
												<img src="/images/admin.jpg" alt="Profile image" className="avatar-rounded"/>
										</a>
										<div className="dropdown-menu dropdown-menu-right profile-dropdown ">
												{/*<!-- item-->*/}
												<div className="dropdown-item noti-title">
														<h5 className="text-overflow">
																<small>Hola, { Session.get('user').profile.nickname } </small>
														</h5>
												</div>
				
												{/*<!-- item-->*/}
												<a href="/dashboard/perfil" className="dropdown-item notify-item">
														<i className="fa fa-user"></i>
														<span>Mi perfil</span>
												</a>    
												
												{/*<!-- item-->*/}
												<button onClick={this.onLogout.bind(this)} className="dropdown-item notify-item">
														<i className="fa fa-power-off"></i>
														<span>Cerrar sesión</span>
												</button>
										</div>
								</li>
		
						</ul>

						<ul className="list-inline menu-left mb-0">
								<li className="float-left">              
										<button className="button-menu-mobile open-left" id="menu-toggle" onClick={this.toggleSidebar.bind(this)}>
												<i className="fa fa-fw fa-bars"></i>
										</button>
								</li>
						</ul>

				</nav>            
			
			</div>
		);
	}
}

export default withTracker(() => {

	//obteniendo informacion de notificaciones
  let handleN = Meteor.subscribe('notificaciones');
  let isReadyN = handleN.ready();
	let notificaciones = Notificaciones.find({}, { limit: 4 }).fetch();		

	return {
		isReadyN,
		notificaciones
	};


})(HeaderBar);