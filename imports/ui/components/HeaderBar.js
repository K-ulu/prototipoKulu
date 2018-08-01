import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import { withRouter } from "react-router-dom";
import { Session } from 'meteor/session';

class HeaderBar extends React.Component {

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
                    <ul className="list-inline float-right mb-0">    
                        <li className="list-inline-item dropdown notif">
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
                
                                {/*<!-- item-->*/}
                                <a target="_blank" href="https://www.pikeadmin.com" className="dropdown-item notify-item">
                                    <p className="notify-details ml-0">
                                        <b>Do you want custom development to integrate this theme?</b>
                                        <span>Contact Us</span>
                                    </p>
                                </a>
                
                                {/*<!-- item-->*/}
                                <a target="_blank" href="https://www.pikeadmin.com/pike-admin-pro" className="dropdown-item notify-item">
                                    <p className="notify-details ml-0">
                                        <b>Do you want PHP version of the theme that save dozens of hours of work?</b>
                                        <span>Try Pike Admin PRO</span>
                                    </p>
                                </a>
                
                                {/*<!-- All-->*/}
                                <a title="Clcik to visit Pike Admin Website" target="_blank" href="https://www.pikeadmin.com" className="dropdown-item notify-item notify-all">
                                    <i className="fa fa-link"></i> Visit Pike Admin Website
                                </a>                
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
                                        <small><span className="label label-danger pull-xs-right">5</span>Allerts</small>
                                    </h5>
                                </div>
                
                                {/*<!-- item-->*/}
                                <a href="#" className="dropdown-item notify-item">
                                    <div className="notify-icon bg-faded">
                                        <img src="/images/admin.jpg" alt="img" className="rounded-circle img-fluid"/>
                                    </div>
                                    <p className="notify-details">
                                        <b>John Doe</b>
                                        <span>User registration</span>
                                        <small className="text-muted">3 minutes ago</small>
                                    </p>
                                </a>
                
                                {/*<!-- item-->*/}
                                <a href="#" className="dropdown-item notify-item">
                                    <div className="notify-icon bg-faded">
                                        <img src="/images/admin.jpg" alt="img" className="rounded-circle img-fluid"/>
                                    </div>
                                    <p className="notify-details">
                                        <b>Michael Cox</b>
                                        <span>Task 2 completed</span>
                                        <small className="text-muted">12 minutes ago</small>
                                    </p>
                                </a>
                
                                {/*<!-- item-->*/}
                                <a href="#" className="dropdown-item notify-item">
                                    <div className="notify-icon bg-faded">
                                        <img src="/images/admin.jpg" alt="img" className="rounded-circle img-fluid"/>
                                    </div>
                                    <p className="notify-details">
                                        <b>Michelle Dolores</b>
                                        <span>New job completed</span>
                                        <small className="text-muted">35 minutes ago</small>
                                    </p>
                                </a>
                
                                {/*<!-- All-->*/}
                                <a href="#" className="dropdown-item notify-item notify-all">
                                    View All Allerts
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
                                        <small>Hello, { Session.get('user').profile.nickname } </small>
                                    </h5>
                                </div>
                
                                {/*<!-- item-->*/}
                                <a href="pro-profile.html" className="dropdown-item notify-item">
                                    <i className="fa fa-user"></i>
                                    <span>Profile</span>
                                </a>    
                                
                                {/*<!-- item-->*/}
                                <button onClick={this.onLogout.bind(this)} className="dropdown-item notify-item">
                                    <i className="fa fa-power-off"></i>
                                    <span>Logout</span>
                                </button>
                
                                {/*<!-- item-->*/}
                                <a target="_blank" href="https://www.pikeadmin.com" className="dropdown-item notify-item">
                                    <i className="fa fa-external-link"></i>
                                    <span>Pike Admin</span>
                                </a>
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

export default withRouter(HeaderBar);