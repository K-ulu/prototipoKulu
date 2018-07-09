import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import shortid from 'shortid';
import { check } from 'meteor/check';

export const Alumnos = new Mongo.Collection('alumnos');

if (Meteor.isServer) {
  Meteor.publish('alumno', function () {
    return Alumnos.find({ userId: this.userId });
  });
}

Meteor.methods({
  'alumnos.insert'(matricula, claveEscuela, idDocente) {
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
      idDocente
    });
  },

  'alumnos.update'( miId, matricula,claveEscuela){
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    Alumnos.update({
      userId: miId
    }, {
      $set: { matricula, claveEscuela}
    });
  },
  'alumnos.remove'(id) {
    check(id, String);
 
    Alumnos.remove(id);
  }
});