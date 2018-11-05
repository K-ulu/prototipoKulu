import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import ListItemTema from './ListItemTema';
import { Temas } from '../../../api/temas';

class ListaTemas extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      claveBloque: '',
      temas: [],
      isReadyT: '',
    };
  }

  //actualizamos props
	static getDerivedStateFromProps(nextProps, prevState) {    
		if(nextProps.isReadyT){
			return {
        claveBloque: nextProps.claveBloque,
        temas: nextProps.temas,
        isReadyT: nextProps.isReadyT,
      };
		}
		//retornamos null cuando no sea necesario actualizar state
		return null;
  }

  render (){
    if(this.state.temas.length > 0){
      let display = this.state.temas.map((tema) => {
        return <ListItemTema key={ 'key' + tema._id} temaId={ tema._id } nombreTema={ tema.nombreTema } descripcionTema={ tema.descripcionTema } numTema={ tema.numTema } idBloque={ tema.idBloque }/>
      });

      return <div className="row">
          { display }
        </div>

    } else return <div> Esta bloque no tiene ningun tema registrado </div>;
    
  }
}

export default withTracker((props) => {
  //obtenemos informacion de bloques
  let handleT = Meteor.subscribe('temas');
  let isReadyT = handleT.ready();
  let temas = Temas.find({ idBloque: props.claveBloque }, {sort: { numTema: 1 }}).fetch();
  return {
    isReadyT: isReadyT,
    temas: temas,
  };  

})(ListaTemas);