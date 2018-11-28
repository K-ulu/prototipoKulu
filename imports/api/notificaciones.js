import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import shortid from 'shortid';
import { check } from 'meteor/check';

export const Notificaciones = new Mongo.Collection('notificaciones');

if (Meteor.isServer) {
  Meteor.publish('notificaciones', function () {
    return Notificaciones.find({ userId: this.userId });
  });
}

Meteor.methods({
  'notificaciones.insert'(userId, titulo, descripcion, lobby, sesionAprendizaje, expiracion) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    
    Notificaciones.insert({
      _id: shortid.generate(),
      userId, 
      titulo,
      descripcion,
      lobby, 
      sesionAprendizaje,
      timestamp: Date.now(),
      expiracion
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