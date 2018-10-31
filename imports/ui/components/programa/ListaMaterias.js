import React from 'react';

import { withTracker } from 'meteor/react-meteor-data';
import ListItemMateria from './ListItemMateria';
import { Materias } from '../../../api/materias';

class ListaMaterias extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      materias: [],   
      isReady: '',   
    };  
  }

  componentDidMount(){
    console.log('lista materias props: ', this.props);
  }

  //actualizamos props
	static getDerivedStateFromProps(nextProps, prevState) {
		if(nextProps.materias.length > 0){
      console.log('lista materias props actualizados: ', nextProps);
			return {
        materias: nextProps.materias,
        isReady: nextProps.isReady,
      };
		}
		//retornamos null cuando no sea necesario actualizar state
		return null;
	}

  render(){
    if(this.state.materias.length > 0 && this.state.isReady){
      console.log('mis props render:', this.state);
      let display = this.state.materias.map((materia) => {
        return <ListItemMateria key={ 'key' + materia._id } materiaId={ materia._id  } nombre={ materia.nombreMateria} grado={ materia.grado } cantBloques={ materia.cantidadBloques }/>
      }); 

      return <div className="container">
        <div className="row">
          { display }
        </div>
      </div>
    } else return <div> No tiene ningun documento almacenado </div>;
    
    
  } 
}

export default withTracker(() => {
  let handle = Meteor.subscribe("materias");
  let isReady = handle.ready();
  let materias = Materias.find().fetch();
  return {
    isReady: isReady,
    materias: materias,
  };
  

})(ListaMaterias);