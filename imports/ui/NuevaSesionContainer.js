import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import NuevaSesion from './NuevaSesion';

import { Materias } from '../api/materias';
import { Bloques } from '../api/bloques';
import { Temas } from '../api/temas';
import { Grupos } from '../api/grupos';
import { Alumnos } from '../api/alumnos';
import { Lobbies } from '../api/lobbies';
import { Mensajes } from '../api/mensajes';
import { Users } from '../api/users';

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

    Meteor.subscribe('lobbies');
    let lobbies = Lobbies.find().fetch();		
    
    Meteor.subscribe('mensajes', Session.get('lobby'));
    let mensajes = Mensajes.find().fetch();		
    
    let users = Meteor.subscribe('allUsers');	
    let todos;
    if (users.ready()) {
			todos = Meteor.users.find().fetch(); // will return all users
			//return todos[0].profile.nickname;
		}

    

    return {
      materias: materias,
      bloques: bloques,
      temas: temas,
      grupos: grupos,
      alumnos: alumnos,
      lobbies: lobbies,
      mensajes: mensajes,
      allUsers: todos,
    };
  })(NuevaSesion);

	
		
		