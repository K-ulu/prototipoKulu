import React from 'react';
import { Meteor } from 'meteor/meteor';

export default class LobbiesListItem extends React.Component {

	render(){
		return(
			<div>
				<p>{this.props.nombre}</p>
			</div>
		);

	}
	
}