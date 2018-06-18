import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import shortid from 'shortid';
import { check } from 'meteor/check';

export const Materias = new Mongo.Collection('materias');

if (Meteor.isServer) {
  Meteor.publish('materias', function () {
    return Materias.find({ userId: this.userId });
  });
}

Meteor.methods({
  'materias.insert'(nombreMateria, grado, cantidadBloques) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    
    Materias.insert({
      _id: shortid.generate(),
      nombreMateria,
      grado,
      cantidadBloques
    });
  },

  'materias.update'( miId, nombreMateria, grado, cantidadBloques ){
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    Materias.update({
      _id: miId
    }, {
      $set: { nombreMateria, grado, cantidadBloques }
    });
  },

  'materias.remove'(id) {
    check(id, String);
 
    Materias.remove(id);
  }
});
