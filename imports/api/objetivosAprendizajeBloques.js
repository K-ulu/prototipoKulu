import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import shortid from 'shortid';
import { check } from 'meteor/check';

export const ObjetivosBloques = new Mongo.Collection('objetivosBloques');

if (Meteor.isServer) {
  Meteor.publish('objetivosBloques', function () {
    return ObjetivosBloques.find({ userId: this.userId });
  });
}

Meteor.methods({
  'objetivosBloques.insert'(descripcionObjetivo, idBloque) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    
    ObjetivosBloques.insert({
      _id: shortid.generate(),
      descripcionObjetivo,
      idBloque
    });
  },

  'objetivosBloques.update'( miId, descripcionObjetivo, idBloque ){
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    ObjetivosBloques.update({
        _id: miId
    }, {
      $set: { descripcionObjetivo, idBloque }
    });
  },
  
  'objetivosBloques.remove'(id) {
    check(id, String);
    ObjetivosBloques.remove(id);
  }
});