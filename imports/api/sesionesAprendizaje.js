import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import shortid from 'shortid';
import { check } from 'meteor/check';

export const SesionesAprendizaje = new Mongo.Collection('sesionesAprendizaje');

if (Meteor.isServer) {
  Meteor.publish('sesionesAprendizaje', function () {
    return SesionesAprendizaje.find({ userId: this.userId });
  });
}

Meteor.methods({
  'sesionesAprendizaje.insert'( tipoSesion, NoParticipanteSesion, horaInicio, horaFinal, temaSesion, idLobby ) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
  
    SesionesAprendizaje.insert({
      _id: shortid.generate(),
      tipoSesion,
      NoParticipanteSesion,
      horaInicio,
      horaFinal,
      temaSesion,
      idLobby
    });
  },

  'sesionesAprendizaje.update'( miId, tipoSesion, NoParticipanteSesion, horaInicio, horaFinal, temaSesion, idLobby ){
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    SesionesAprendizaje.update({
      userId: miId
    }, {
      $set: { tipoSesion, NoParticipanteSesion, horaInicio, horaFinal, temaSesion, idLobby }
    });
  },

  'sesionesAprendizaje.remove'(id) {
    check(id, String);
    SesionesAprendizaje.remove(id);
  }
});