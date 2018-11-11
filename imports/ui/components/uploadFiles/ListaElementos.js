import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import ElementosObjetosAprendizaje  from '../../../api/elementosObjetosAprendizaje';
import IndividualElemento from './IndividualElemento';
import IndividualElementoAdminCont from './IndividualElementoAdminCont';

class ListaElementos extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isReady: '',
      elementos: [],
    };
  }

  //actualizamos props
	static getDerivedStateFromProps(nextProps, prevState) {
		if(nextProps.elementos.length > 0){
			return {
        elementos: nextProps.elementos,
        isReady: nextProps.isReady,
      };
		}
		//retornamos null cuando no sea necesario actualizar state
		return null;
  }
  
  render () {
    if(this.state.elementos.length > 0 && this.state.isReady){
      let elementos = this.state.elementos;

      let display = elementos.map((aFile, key) => {
        // console.log('A file: ', aFile.link(), aFile.get('name'))
        let link = ElementosObjetosAprendizaje.findOne({_id: aFile._id}).link();  //The "view/download" link
    
        // Send out components that show details of each file
        return <IndividualElementoAdminCont
        key={'file' + key}
        fileName={aFile.name}
        fileUrl={link}
        elementoId={aFile._id}
        fileSize={aFile.size}
        data={aFile.meta}        
      />
        
                       
      })

      return <div className="container">
        <div className="row">
          { display }
        </div>
      </div>

    } else return <div> No tiene ningun documento almacenado </div>;
  }
}

export default withTracker(() => {
  const elementosHandle = Meteor.subscribe('elementos.all');
  const isReady = elementosHandle.ready();
  let elementos = ElementosObjetosAprendizaje.find().fetch();

  return {
    isReady: isReady,
    elementos: elementos,
  };

})(ListaElementos);