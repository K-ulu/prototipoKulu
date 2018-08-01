import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import shortid from 'shortid';
import { check } from 'meteor/check';

export const Grupos = new Mongo.Collection('grupos');

if (Meteor.isServer) {
  Meteor.publish('grupos', function () {
    return Grupos.find({ claveDocente: this.userId });
  });
}

Meteor.methods({
  'grupos.insert'(nombreGrupo, grado, grupo,claveEscuela, cantidadAlumnos) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
  
    Grupos.insert({
      _id: shortid.generate(),
      nombreGrupo,
      grado,
      grupo,
      claveEscuela,
      cantidadAlumnos,
      claveDocente: this.userId
    });
  },

  'grupos.update'( miId, nombreGrupo, grado, grupo, claveEscuela, cantidadAlumnos ){
    console.log(miId, nombreGrupo, grado, grupo, claveEscuela, cantidadAlumnos);
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    Grupos.update({
      _id: miId
    }, {
      $set: { nombreGrupo, grado, grupo, claveEscuela, cantidadAlumnos }
    });
  },

  'grupos.remove'(id) {
    check(id, String);
    Grupos.remove(id);
  }
});