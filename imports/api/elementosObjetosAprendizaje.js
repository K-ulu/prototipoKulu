import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import shortid from 'shortid';
import { check } from 'meteor/check';

export const ElementosObjetosAprendizaje = new Mongo.Collection('elementosObjetosAprendizaje');

if (Meteor.isServer) {
  Meteor.publish('elementoObjetoAprendizaje', function () {
    return ElementosObjetosAprendizaje.find({ userId: this.userId });
  });
}

Meteor.methods({
  'elementosObjetosAprendizaje.insert'(nombreElemento, descripcionElemento, fechaCarga, idObjetoAprendizaje, idContenidoMultimedia) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
  
    // new SimpleSchema({
    //   nombre: {
    //     type: String,
    //     label: 'nombre',
    //     //regEx: SimpleSchema.RegEx.Url
    //   },
    //   apPaterno: {
    //       type: String,
    //       label: 'Apellido Paterno',
    //       //regEx: SimpleSchema.RegEx.Url
    //   }
    // }).validate({ nombre, ApPaterno });
  
    ElementosObjetosAprendizaje.insert({
      _id: shortid.generate(),
      nombreElemento,
      descripcionElemento,
      fechaCarga,
      idObjetoAprendizaje,
      idContenidoMultimedia
    });
  },

  'elementosObjetosAprendizaje.update'( miId, nombreElemento,descripcionElemento, fechaCarga, idObjetoAprendizaje, idContenidoMultimedia){
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    ElementosObjetosAprendizaje.update({
      userId: miId
    }, {
      $set: { nombreElemento, descripcionElemento, fechaCarga, idObjetoAprendizaje, idContenidoMultimedia}
    });
  },
  
  'elementosObjetosAprendizaje.remove'(id) {
    check(id, String);
 
    ElementosObjetosAprendizaje.remove(id);
  }
});