import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import shortid from 'shortid';
import { check } from 'meteor/check';

export const Docentes = new Mongo.Collection('docentes');

if (Meteor.isServer) {
  Meteor.publish('docentes', function () {
    return Docentes.find({ userId: this.userId });
  });
}

Meteor.methods({
  'docentes.insert'(claveDocente, claveEscuela, rfc) {
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
  
    Docentes.insert({
      _id: shortid.generate(),
      claveDocente,
      claveEscuela,
      rfc,
      userId: this.userId
    });
  },

  'docentes.update'( miId, rfc, claveDocente, claveEscuela){
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    Docentes.update({
      userId: miId
    }, {
      $set: { rfc, claveDocente,  claveEscuela}
    });
  },

  'docentes.remove'(id) {
    check(id, String);
 
    Docentes.remove(id);
  },
  'docentes.findAll'(){
    return Docentes.find();
  }
});