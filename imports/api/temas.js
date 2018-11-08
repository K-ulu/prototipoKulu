import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import shortid from 'shortid';
import { check } from 'meteor/check';

export const Temas = new Mongo.Collection('temas');

if (Meteor.isServer) {
  Meteor.publish('temas', function () {
    return Temas.find();
  });
}

Meteor.methods({
  'temas.insert'(nombreTema, descripcionTema, numTema, idBloque) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    
    Temas.insert({
      _id: shortid.generate(),
      nombreTema,
      descripcionTema,
      numTema,
      idBloque
    });
  },

  'temas.update'( miId, nombreTema, descripcionTema, numTema, idBloque){
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    Temas.update({
        _id: miId
    }, {
      $set: { nombreTema, descripcionTema, numTema, idBloque}
    });
  },
  
  'temas.remove'(id) {
    check(id, String);
    Temas.remove(id);
  }
});