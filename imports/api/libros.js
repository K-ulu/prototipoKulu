import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import shortid from 'shortid';
import { check } from 'meteor/check';

export const Libros = new Mongo.Collection('libros');

if (Meteor.isServer) {
  Meteor.publish('libro', function () {
    return Libros.find({ userId: this.userId });
  });
}

Meteor.methods({
  'libros.insert'(nombreLibro, tamanio,fechaCarga,descripcionLibros) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    
    Libros.insert({
      _id: shortid.generate(),
      nombreLibro,
      tamanio,
      fechaCarga,
      descripcionLibros,
      idAdmonContenido: this.userId
    });
  },

  'libros.update'( miId, nombreLibro,tamanio,fechaCarga,descripcionLibros){
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    Libros.update({
        _id: miId
    }, {
      $set: { nombreLibro,tamanio,fechaCarga,descripcionLibros}
    });
  },
  
  'libros.remove'(id) {
    check(id, String);
    Libros.remove(id);
  }
});