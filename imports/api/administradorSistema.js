import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import shortid from 'shortid';
import { check } from 'meteor/check';

export const AdministradorSistemas = new Mongo.Collection('administradorSistemas');

if (Meteor.isServer) {
  Meteor.publish('alumno', function () {
    return AdministradorSistemas.find({ userId: this.userId });
  });
}

Meteor.methods({
  'administradorSistemas.insert'(fechaNacimiento, pais, estado, ciudad) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
  
    AdministradorSistemas.insert({
      _id: shortid.generate(),
      fechaNacimiento,
      pais,
      estado,
      ciudad,
      userId: this.userId
    });
  },

  'administradorSistemas.update'( miId, fechaNacimiento, pais,estado, ciudad ){
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    AdministradorSistemas.update({
      userId: miId
    }, {
      $set: { fechaNacimiento, pais,estado, ciudad }
    });
  },
  'administradorSistemas.remove'(id) {
    check(id, String);
 
    AdministradorSistemas.remove(id);
  }
});