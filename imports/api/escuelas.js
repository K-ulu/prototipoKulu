import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import shortid from 'shortid';
import { check } from 'meteor/check';

export const Escuelas = new Mongo.Collection('escuelas');

if (Meteor.isServer) {
  Meteor.publish('escuelas', function () {
    return Materias.find({ userId: this.userId });
  });
}

Meteor.methods({
  'escuelas.insert'(nombreEscuela, ciudad, estado, pais) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    
    Escuelas.insert({
      _id: shortid.generate(),
      nombreEscuela,
      ciudad,
      estado,
      pais
    });
  },

  'escuelas.update'( miId, nombreEscuela, ciudad, estado, pais ){
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    Escuelas.update({
      _id: miId
    }, {
      $set: { nombreEscuela, ciudad, estado, pais }
    });
  },

  'escuelas.remove'(id) {
    check(id, String);
 
    Escuelas.remove(id);
  }
});
