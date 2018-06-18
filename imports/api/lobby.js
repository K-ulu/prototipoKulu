import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import shortid from 'shortid';
import { check } from 'meteor/check';

export const Lobby = new Mongo.Collection('lobby');

if (Meteor.isServer) {
  Meteor.publish('lobby', function () {
    return Lobby.find({ userId: this.userId });
  });
}

Meteor.methods({
  'lobby.insert'(idTema, idMateria, idBloque, idObjeto) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    
    Lobby.insert({
      _id: shortid.generate(),
      idTema,
      idMateria,
      idBloque,
      idObjeto,
    });
  },

  'lobby.update'( miId, idTema, idMateria, idBloque, idObjeto ){
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    Lobby.update({
        _id: miId
    }, {
      $set: {idTema, idMateria, idBloque, idObjeto}
    });
  },
  
  'lobby.remove'(id) {
    check(id, String);
    Lobby.remove(id);
  }
});