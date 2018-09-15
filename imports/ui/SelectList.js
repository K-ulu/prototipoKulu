import React from 'react';
import { Meteor } from 'meteor/meteor';

import { Tracker } from 'meteor/tracker';
import { Materias } from '../api/materias';

export default class SelectList extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      materias: [],
      value: '' //almacena valor
    };
  }

  handleChange(event){
		console.log(event.target.value.trim());
    this.setState({value: event.target.value});
  }

  componentDidMount(){
    this.materiasTracker = Tracker.autorun(() => { //carga materias y guarda en state
      Meteor.subscribe('materias');
      const materias = Materias.find().fetch();
      this.setState({ materias });        
    });   
  }

  componentWillUnmount(){
    this.materiasTracker.stop();
  }
    
  renderMateriasListItems(){
    return this.state.materias.map((materia) => {
      return <option key={materia._id} value={materia.nombreMateria}>{materia.nombreMateria}</option>
    });
  }


  render(){
    return (
      <div className="form-group row justify-content-center">
        <div className="col-2">
          <label htmlFor="materia" className="col-form-label">Materia: </label>
        </div>
        <div className="col-7">
          <select value={this.state.value} onChange={this.handleChange.bind(this)} className="form-control rounded">
            <option value ="seleccione">Seleccioneee materia</option>
              { this.renderMateriasListItems() }                              
          </select> 
        </div>
      </div>
    );

  }
};
