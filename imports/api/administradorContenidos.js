import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import shortid from 'shortid';
import { check } from 'meteor/check';

export const AdministradorContenidos = new Mongo.Collection('administradorContenidos');

if (Meteor.isServer) {
  Meteor.publish('administradorContenidos', function () {
    return AdministradorContenidos.find({ userId: this.userId });
  });
}

Meteor.methods({
  'administradorContenidos.insert'(fechaNacimiento, pais, estado ) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
  
    AdministradorContenidos.insert({
      _id: shortid.generate(),
      fechaNacimiento,
      pais,
      estado,
      userId: this.userId
    });
  },

  'administradorContenidos.update'( miId, fechaNacimiento, pais,estado ){
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    AdministradorContenidos.update({
      userId: miId
    }, {
      $set: { fechaNacimiento, pais,estado }
    });
  },

  'administradorContenidos.remove'(id) {
    check(id, String);
    AdministradorContenidos.remove(id);
  }
});