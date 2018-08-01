import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import shortid from 'shortid';
import { check } from 'meteor/check';

export const Articulos = new Mongo.Collection('articulos');

if (Meteor.isServer) {
  Meteor.publish('articulo', function () {
    return Articulos.find({ userId: this.userId });
  });
}

Meteor.methods({
  'articulos.insert'(titulo, cuerpo, descripcionArticulo, fechaSubida) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    
    Articulos.insert({
      _id: shortid.generate(),
      titulo,
      cuerpo,
      descripcionArticulo,
      fechaSubida,
      idAdmonContenido: this.userId
    });
  },

  'articulos.update'( miId, titulo,cuerpo,descripcionArticulo,fechaSubida){
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    Alumnos.update({
      _id: miId
    }, {
      $set: { titulo, cuerpo,descripcionArticulo,fechaSubida}
    });
  },
  
  'articulos.remove'(id) {
    check(id, String);
 
    Alumnos.remove(id);
  }
});
