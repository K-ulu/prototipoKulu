import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import shortid from 'shortid';
import { check } from 'meteor/check';

export const UsuarioLobby = new Mongo.Collection('usuarioLobby');

if (Meteor.isServer) {
  Meteor.publish('usuarioLobby', function () {
    return Estadisticas.find({ userId: this.userId });
  });
}

Meteor.methods({
  'usuarioLobby.insert'(idUsuario, idLobby, esduenio) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    
    UsuarioLobby.insert({
      _id: shortid.generate(),
      idUsuario,
      idLobby,
      esduenio
    });
  },

  'usuarioLobby.update'( miId, idUsuario, idLobby, esduenio ){
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    UsuarioLobby.update({
      _id: miId
    }, {
      $set: { idUsuario, idLobby, esduenio }
    });
  },
  
  'usuarioLobby.remove'(id) {
    check(id, String);
 
    UsuarioLobby.remove(id);
  }
});
