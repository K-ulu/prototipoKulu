import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import {Docentes} from '../imports/api/Docente.js';
import {Alumnos} from '../imports/api/Alumno.js';

Meteor.startup(() => {
  // code to run on server at startup
  Accounts.onCreateUser(function(datos, user) {
      if (datos.tipoUsuario)
          user.tipoUsuario = datos.tipoUsuario;

      if (datos.profile)
          user.profile = datos.profile;

      return user;
  });
});
