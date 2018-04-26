import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import shortid from 'shortid';

export const Docente = new Mongo.Collection('docentes');

if (Meteor.isServer) {
  Meteor.publish('docente', function () {
    alert("Es servidor");
    return Docente.find({ userId: this.userId });
  });
}

Meteor.methods({
  'docente.insert'(claveDocente, claveEscuela, rfc) {
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
  
    Docente.insert({
      _id: shortid.generate(),
      claveDocente,
      claveEscuela,
      rfc,
      userId: this.userId
    });
  }
});