import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import shortid from 'shortid';
import { check } from 'meteor/check';

export const UsuarioSAprendizaje = new Mongo.Collection('usuarioSAprendizaje');

if (Meteor.isServer) {
  Meteor.publish('usuarioSAprendizaje', function () {
    return UsuarioSAprendizaje.find({ userId: this.userId });
  });
}

Meteor.methods({
  'usuarioSAprendizaje.insert'(idUsuario, idSesion, tiempoTurno ) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
  
    UsuarioSAprendizaje.insert({
      _id: shortid.generate(),
      idUsuario,
      idSesion,
      tiempoTurno
    });
  },

  'usuarioSAprendizaje.update'( miId,idUsuario, idSesion, tiempoTurno ){
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    UsuarioSAprendizaje.update({
      userId: miId
    }, {
      $set: { idUsuario, idSesion, tiempoTurno }
    });
  },

  'usuarioSAprendizaje.remove'(id) {
    check(id, String);
    UsuarioSAprendizaje.remove(id);
  }
});