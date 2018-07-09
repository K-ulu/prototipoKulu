import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import shortid from 'shortid';
import { check } from 'meteor/check';

export const Grupos = new Mongo.Collection('grupos');

if (Meteor.isServer) {
  Meteor.publish('grupos', function () {
    return Grupos.find({ userId: this.userId });
  });
}

Meteor.methods({
  'grupos.insert'(nombreGrupo, grado, grupo, cantidadAlumnos, claveEscuela ) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
  
    Grupos.insert({
      _id: shortid.generate(),
      nombreGrupo,
      grado,
      grupo,
      cantidadAlumnos,
      claveEscuela,
      claveDocente: this.userId
    });
  },

  'grupos.update'( miId, nombreGrupo, grado, grupo, cantidadAlumnos, claveEscuela ){
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    Grupos.update({
      userId: miId
    }, {
      $set: { nombreGrupo, grado, grupo, cantidadAlumnos, claveEscuela }
    });
  },

  'grupos.remove'(id) {
    check(id, String);
    Grupos.remove(id);
  }
});