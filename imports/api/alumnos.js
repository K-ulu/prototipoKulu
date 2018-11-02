import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import shortid from 'shortid';
import { check } from 'meteor/check';

export const Alumnos = new Mongo.Collection('alumnos');

if (Meteor.isServer) {
  Meteor.publish('alumnos', function () {
    return Alumnos.find({});
  });
}

Meteor.methods({
  'alumnos.insert'(matricula, claveEscuela, correo, estatus, idGrupo, idDocente) {
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
      idGrupo,
      estatus,
      idDocente
    });
  },

  'alumnos.insert2'(/*nombre, apellidoP,*/ matricula, claveEscuela, correo, idGrupo, estatus, userId) {
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
      userId,
      correo,
      idGrupo,
      estatus,
      idDocente: this.userId
    });
  },

  //El docente puede editar los correos de sus alumnos en caso de que se haya equivocado y no concuerde
  'alumnos.update'( miId, matricula,claveEscuela, idGrupo, correo, idDocente){
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    Alumnos.update({
      _id: miId
    }, {
      $set: { matricula, claveEscuela, idGrupo, correo, idDocente }
    });
  },

  'alumnos.updateStatus'( miId, estatus){
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    Alumnos.update({
      _id: miId
    }, {
      $set: { estatus }
    });

  },

  'alumnos.remove'(id) {
    check(id, String);
 
    Alumnos.remove(id);
  }
});