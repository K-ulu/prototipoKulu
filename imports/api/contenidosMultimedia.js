import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import shortid from 'shortid';
import { check } from 'meteor/check';

export const ContenidosMultimedia = new Mongo.Collection('contenidosMultimedia');

if (Meteor.isServer) {
  Meteor.publish('contenidoMultimedia', function () {
    return Documentos.find({ userId: this.userId });
  });
}

Meteor.methods({
  'contMultimediaAdmonCont.insert'(nombre, tipo, tamanio, fechaCarga, descripcioncontenido, idDocente) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    
    ContenidosMultimedia.insert({
      _id: shortid.generate(),
      nombre,
      tipo,
      tamanio,
      fechaCarga,
      descripcioncontenido,
      idDocente,
      idAdmonCont: this.userId
    });
  },

  'contMultimediaDocente.insert'(nombre, tipo, tamanio, fechaCarga, descripcioncontenido, idAdmonCont) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    
    ContenidosMultimedia.insert({
        _id: shortid.generate(),
        nombre,
        tipo,
        tamanio,
        fechaCarga,
        descripcioncontenido,
        idAdmonCont,
        idDocente: this.userId
    });
  },

  'contenidosMultimedia.update'( miId, nombre, tipo, tamanio, fechaCarga, descripcioncontenido ){
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    ContenidosMultimedia.update({
      _id: miId
    }, {
      $set: { nombre, tipo, tamanio, fechaCarga, descripcioncontenido }
    });
  },

  'contenidosMultimedia.remove'(id) {
    check(id, String);
 
    ContenidosMultimedia.remove(id);
  }
});
