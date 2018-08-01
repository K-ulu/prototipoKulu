import React from 'react'

export default class LeftSidebar extends React.Component {

	render(){
		return (
			<div id="sidebar-wrapper">

				<ul className="sidebar-nav">

					<li className="submenu">
						<a className="active" href="/teachers">
							<i className="fa fa-fw fa-bars"></i>
							<span> Dashboard </span>
						</a>
					</li>

					<li className="submenu">
						<a className="nuevaSesion" href="#">
							<i className="fa fa-fw fa-play"></i>
							<span> Nueva Sesión </span>
						</a>
					</li>

					<li className="submenu">
						<a href="#">
							<i className="fa fa-fw fa-eye"></i>
							<span> Explorar </span>
						</a>
					</li>

					<li className="submenu">
						<a href="#">
							<i className="fa fa-fw fa-book"></i>
							<span> Biblioteca </span>
							<span className="menu-arrow"></span>
						</a>
						<ul className="list-unstyled">
							<li>
								<a href="forms-general.html">
									<i className="fa fa-fw fa-copy"></i>
									<span> Libros </span>
								</a>
							</li>
							<li>
								<a href="forms-select2.html">
									<i className="fa fa-fw fa-headphones"></i>
									<span> Cont. Mult. </span>
								</a>
							</li>   
							<li>
								<a href="forms-select2.html">
									<i className="fa fa-fw fa-file-text-o"></i>
									<span> Documentos </span>
								</a>
							</li>    
							<li>
								<a href="forms-select2.html">
									<i className="fa fa-fw fa-address-book"></i>
									<span> Obj. de Aprend. </span>
								</a>
							</li>      
							<li>
								<a href="forms-select2.html">
									<i className="fa fa-fw fa-cogs"></i>
									<span> Elem. de Aprend. </span>
								</a>
							</li>         
						</ul>
					</li> 

					<li className="submenu">
						<a href="#">
							<i className="fa fa-fw fa-user"></i>
							<span> Mis Alumnos </span>
						</a>
					</li>            

					<li className="submenu">
						<a href="#">
							<i className="fa fa-fw fa-users"></i>
							<span> Mis Grupos </span>
						</a>
					</li>

					<li className="submenu">
						<a href="#">
							<i className="fa fa-fw fa-headphones"></i>
							<span> Mi Cont. Mult. </span>
						</a>
					</li>

					<li className="submenu">
						<a href="#">
							<i className="fa fa-fw fa-file-text-o"></i>
							<span> Mis Documentos </span>
						</a>
					</li>            

					<li className="submenu">
						<a className="pro" href="#">
							<i className="fa fa-fw fa-star"></i>
							<span> K'ulu' PRO </span>
							<span className="menu-arrow"></span>
						</a>
						<ul className="list-unstyled">
							<li>
								<a target="_blank" href="https://www.pikeadmin.com/pike-admin-pro">Admin PRO features</a>
							</li>
							<li>
								<a href="pro-settings.html">Settings</a>
							</li>
							<li>
								<a href="pro-profile.html">My Profile</a>
							</li>
							<li>
								<a href="pro-users.html">Users</a>
							</li>
							<li>
								<a href="pro-articles.html">Articles</a>
							</li>
							<li>
								<a href="pro-categories.html">Categories</a>
							</li>
							<li>
								<a href="pro-pages.html">Pages</a>
							</li>
							<li>
								<a href="pro-contact-messages.html">Contact Messages</a>
							</li>
							<li>
								<a href="pro-slider.html">Slider</a>
							</li>
						</ul>
					</li>
					
        </ul>
			
			</div>
		);
	}
}