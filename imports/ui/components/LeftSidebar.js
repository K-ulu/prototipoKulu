import React from 'react'

import LeftSidebarMaestro from './LeftSidebarMaestro';
import LeftSidebarAlumno from './LeftSidebarAlumno';

export default class LeftSidebar extends React.Component {

	render(){
		let leftSidebar = null;
		if(this.props.tipo == 'maestro'){
			leftSidebar = <LeftSidebarMaestro/>;
		} else if(this.props.tipo == 'alumno'){
			leftSidebar = <LeftSidebarAlumno/>;
		}
		return leftSidebar;
	}
}