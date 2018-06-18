import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import shortid from 'shortid';
import { check } from 'meteor/check';

export const Bloques = new Mongo.Collection('bloques');

if (Meteor.isServer) {
  Meteor.publish('bloques', function () {
    return Bloques.find({ userId: this.userId });
  });
}

Meteor.methods({
  'bloques.insert'(nombreBloque, descripcionBloque, idMateria, idLobby) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    
    Bloques.insert({
      _id: shortid.generate(),
      nombreBloque,
      descripcionBloque,
      idMateria,
      idLobby,
    });
  },

  'bloques.update'( miId, nombreBloque, descripcionBloque, idMateria, idLobby ){
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    Bloques.update({
        _id: miId
    }, {
      $set: {nombreBloque, descripcionBloque, idMateria, idLobby}
    });
  },
  
  'bloques.remove'(id) {
    check(id, String);
    Bloques.remove(id);
  }
});