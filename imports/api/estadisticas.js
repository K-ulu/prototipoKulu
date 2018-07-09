import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import shortid from 'shortid';
import { check } from 'meteor/check';

export const Estadisticas = new Mongo.Collection('estadisticas');

if (Meteor.isServer) {
  Meteor.publish('estadisticas', function () {
    return Estadisticas.find({ userId: this.userId });
  });
}

Meteor.methods({
  'estadisticas.insert'(idSesion, NoNinias, NoNinios, NoClics, tiempoUsoPromUsuario, idUsuario, tiempoTotalUsuario) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    
    Estadisticas.insert({
      _id: shortid.generate(),
      idSesion,
      NoNinias,
      NoNinios,
      NoClics,
      tiempoUsoPromUsuario,
      idUsuario,
      tiempoTotalUsuario
    });
  },

  'estadisticas.update'( miId, idSesion, NoNinias, NoNinios, NoClics, tiempoUsoPromUsuario, idUsuario, tiempoTotalUsuario ){
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    Estadisticas.update({
      _id: miId
    }, {
      $set: { idSesion, NoNinias, NoNinios, NoClics, tiempoUsoPromUsuario, idUsuario, tiempoTotalUsuario }
    });
  },
  
  'estadisticas.remove'(id) {
    check(id, String);
 
    Estadisticas.remove(id);
  }
});
