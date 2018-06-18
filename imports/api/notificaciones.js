import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import shortid from 'shortid';
import { check } from 'meteor/check';

export const Notificaciones = new Mongo.Collection('notificaciones');

if (Meteor.isServer) {
  Meteor.publish('notificaciones', function () {
    return Libros.find({ userId: this.userId });
  });
}

Meteor.methods({
  'notificaciones.insert'(fechaNotificacion, titulo,descripcion,expiracion) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    
    Notificaciones.insert({
      _id: shortid.generate(),
      fechaNotificacion,
      titulo,
      descripcion,
      expiracion,
      idUsuario: this.userId
    });
  },

  'notificaciones.update'( miId, fechaNotificacion, titulo,descripcion,expiracion ){
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    Notificaciones.update({
        _id: miId
    }, {
      $set: { fechaNotificacion, titulo,descripcion,expiracion }
    });
  },
  
  'notificaciones.remove'(id) {
    check(id, String);
    Notificaciones.remove(id);
  }
});