import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import shortid from 'shortid';
import { check } from 'meteor/check';

export const Documentos = new Mongo.Collection('documentos');

if (Meteor.isServer) {
  Meteor.publish('documento', function () {
    return Documentos.find({ userId: this.userId });
  });
}

Meteor.methods({
  'documentosAdmonCont.insert'(nombre, descripcionDoc, tipo, estado, idDocente, idMateria) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    
    Documentos.insert({
      _id: shortid.generate(),
      nombre,
      descripcionDoc,
      tipo,
      estado,
      idDocente,
      idAdmonCont: this.userId,
      idMateria
    });
  },

  'documentosDocente.insert'(nombre, descripcionDoc, tipo, estado, idAdmonCont, idMateria) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    
    Documentos.insert({
        _id: shortid.generate(),
        nombre,
        descripcionDoc,
        tipo,
        estado,
        idAdmonCont,
        idDocente: this.userId,
        idMateria
    });
  },

  'documentos.update'( miId, nombre, descripcionDoc, tipo, estado, idMateria){
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    Documentos.update({
      _id: miId
    }, {
      $set: { nombre, descripcionDoc, tipo, estado, idMateria}
    });
  },

  'documentos.remove'(id) {
    check(id, String);
 
    Documentos.remove(id);
  }
});
