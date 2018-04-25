import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import shortid from 'shortid';

export const Alumno = new Mongo.Collection('alumno');

if (Meteor.isServer) {
  Meteor.publish('alumno', function () {
    return Alumno.find({ userId: this.userId });
  });
}

Meteor.methods({
  'alumno.insert'(matricula, claveEscuela) {
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
  
    Alumno.insert({
      _id: shortid.generate(),
      matricula,
      claveEscuela,
      userId: this.userId,
      visible: true,
      //visitedCount: 0,
      //lastVisitedAt: null
    });
  }
});