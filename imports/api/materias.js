import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import shortid from 'shortid';
import { check } from 'meteor/check';

export const Materias = new Mongo.Collection('materias');

if (Meteor.isServer) {
  Meteor.publish('materias', function () {
    return Materias.find();
  });
}

Meteor.methods({
  'materias.insert'(nombreMateria, grado) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    
    Materias.insert({
      _id: shortid.generate(),
      nombreMateria,
      grado,
      cantidadBloques: 0
    });
  },

  'materias.updateCantBloques'( miId, cantidadBloques ){
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    cantidadBloques += 1;
    Materias.update({
      _id: miId
    }, {
      $set: { cantidadBloques }
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
  },

  'materiasRenameFile'(id, name) {
    Materias.update({
      _id: id
    }, {
        $set: { nombreMateria: name }
    });
  },
});
