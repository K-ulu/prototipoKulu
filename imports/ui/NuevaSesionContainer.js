import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import NuevaSesion from './NuevaSesion';

import { Materias } from '../api/materias';
import { Bloques } from '../api/bloques';
import { Temas } from '../api/temas';
import { Grupos } from '../api/grupos';
import { Alumnos } from '../api/alumnos';

export default NuevaSesionContainer = withTracker(() => {
    Meteor.subscribe("materias");
    Meteor.subscribe("bloques");
    Meteor.subscribe('temas');
    Meteor.subscribe('grupos');
    Meteor.subscribe('alumnos');
		let materias = Materias.find().fetch();
    let bloques = Bloques.find().fetch();
    let temas = Temas.find().fetch();
    let grupos = Grupos.find().fetch();
    let alumnos = Alumnos.find().fetch();

    return {
      materias: materias,
      bloques: bloques,
      temas: temas,
      grupos: grupos,
      alumnos: alumnos,
    };
  })(NuevaSesion);

	
		
		