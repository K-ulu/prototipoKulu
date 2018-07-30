import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import shortid from 'shortid';
import { check } from 'meteor/check';

export const Alumnos = new Mongo.Collection('alumnos');

if (Meteor.isServer) {
  Meteor.publish('alumnos', function () {
    return Alumnos.find({ idDocente: this.userId });
  });
}

Meteor.methods({
  'alumnos.insert'(matricula, claveEscuela, correo, idDocente) {
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
  
    Alumnos.insert({
      _id: shortid.generate(),
      matricula,
      claveEscuela,
      userId: this.userId,
      correo,
      idDocente
    });
  },

  'alumnos.insert2'(nombre, apellidoP, matricula, claveEscuela, correo, userId) {
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
  
    Alumnos.insert({
      _id: shortid.generate(),
      nombre,
      apellidoP,
      matricula,
      claveEscuela,
      userId,
      correo,
      idDocente: this.userId
    });
  },

  'alumnos.update'( miId, matricula,claveEscuela){
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    Alumnos.update({
      _id: miId
    }, {
      $set: { matricula, claveEscuela}
    });
  },
  'alumnos.remove'(id) {
    check(id, String);
 
    Alumnos.remove(id);
  }
});