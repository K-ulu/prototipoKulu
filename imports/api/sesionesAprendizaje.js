import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import shortid from 'shortid';
import { check } from 'meteor/check';

export const SesionesAprendizaje = new Mongo.Collection('sesionesAprendizaje');

if (Meteor.isServer) {
  Meteor.publish('sesionesAprendizaje', function (_id) {
    return SesionesAprendizaje.find({ _id });
  });
}

Meteor.methods({
  'sesionesAprendizaje.insert'(_id,  materia, bloque, tema, tipo, objeto, idLobby, participantes, activos ) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
  
    SesionesAprendizaje.insert({   
      _id, 
      timelineS: false,   
      materia, 
      bloque,
      tema, 
      tipo, 
      objeto, 
      idLobby, 
      participantes,
      activos
    });
  },

  'sesionesAprendizaje.updateActivos'(id, activos){
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    SesionesAprendizaje.update({
      _id: id
    }, {
      $set: { activos }
    });
  },

  'sesionesAprendizaje.timeLine'(id, estado){
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    SesionesAprendizaje.update({
      _id: id
    }, {
      $set: { timelineS: estado }
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