import React from 'react'

import LeftSidebarMaestro from './LeftSidebarMaestro';
import LeftSidebarAlumno from './LeftSidebarAlumno';
import LeftSidebarAdminContenido from './LeftSidebarAdminContenido';

export default class LeftSidebar extends React.Component {

	render(){
		let leftSidebar = null;
		if(this.props.tipo == 'maestro'){
			leftSidebar = <LeftSidebarMaestro/>;
		} else if(this.props.tipo == 'alumno'){
			leftSidebar = <LeftSidebarAlumno/>;
		} else if(this.props.tipo == 'adminContenido'){
			leftSidebar = <LeftSidebarAdminContenido/>;
		}
		return leftSidebar;
	}
}