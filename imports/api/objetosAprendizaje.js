import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import shortid from 'shortid';
import { check } from 'meteor/check';

export const ObjetosAprendizaje = new Mongo.Collection('objetosAprendizaje');

if (Meteor.isServer) {
  Meteor.publish('objetoAprendizaje', function () {
    return Articulos.find({ userId: this.userId });
  });
}

Meteor.methods({
  'objetosAprendizaje.insert'(nombreObjeto, tipoObjeto, categoriaObjeto,materia,bloque, tema, fechaCarga, descripcion) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    
    ObjetosAprendizaje.insert({
      _id: shortid.generate(),
      nombreObjeto,
      tipoObjeto,
      categoriaObjeto,
      materia,
      bloque,
      tema,
      fechaCarga,
      descripcion,
      idAdmonContenido: this.userId
    });
  },

  'objetosAprendizaje.update'(miId, nombreObjeto, tipoObjeto, categoriaObjeto, materia, bloque, tema, fechaCarga, descripcion){
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    ObjetosAprendizaje.update({
      _id: miId
    }, {
      $set: { nombreObjeto, tipoObjeto, categoriaObjeto, materia, bloque, tema, fechaCarga, descripcion}
    });
  },
  'objetosAprendizaje.remove'(id) {
    check(id, String);
 
    ObjetosAprendizaje.remove(id);
  }
});
