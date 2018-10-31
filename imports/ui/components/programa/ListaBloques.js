import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Tracker } from 'meteor/tracker'; 

import ListItemBloques from './ListItemBloques';
import { Bloques } from '../../../api/bloques';

class ListaBloques extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      claveMat: '',
      bloques: [],
      isReadyB: '',
    };
  }

  //actualizamos props
	static getDerivedStateFromProps(nextProps, prevState) {
		if(nextProps.isReadyB){
      return {
        claveMat: nextProps.claveMat,
        bloques: nextProps.bloques,
        isReadyB: nextProps.isReadyB
      };

    }

    
		//retornamos null cuando no sea necesario actualizar state
		return null;
  }

  render(){    
    if(this.state.bloques.length > 0 /*&& this.state.isReadyB*/){
      let display = this.state.bloques.map((bloque) => {
        return <ListItemBloques key={ 'key' + bloque._id } bloqueId={ bloque._id } numBloque={ bloque.numBloque } nombreBloque={ bloque.nombreBloque } descripcionBloque={ bloque.descripcionBloque }/>
      });

      return <div className="row">
          { display }
        </div>
      

    } else return <div> Esta materia no tiene ningun bloque registrado </div>;
    
  }
}

export default withTracker((props) => {
  //obtenemos informacion de bloques
  let handleB = Meteor.subscribe('bloques');
  let isReadyB = handleB.ready();
  let bloques = Bloques.find({ idMateria: props.claveMat }).fetch();
  return {
    isReadyB: isReadyB,
    bloques: bloques,
  };  

})(ListaBloques)