import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import shortid from 'shortid';

export const Docente = new Mongo.Collection('docente');

if (Meteor.isServer) {
  Meteor.publish('docente', function () {
    return Docente.find({ userId: this.userId });
  });
}

Meteor.methods({
  
    'docente.insert'(nombre, ApPaterno) {
      if (!this.userId) {
        throw new Meteor.Error('not-authorized');
      }
  
      new SimpleSchema({
        nombre: {
          type: String,
          label: 'Apellido Paterno',
          //regEx: SimpleSchema.RegEx.Url
        },
        apPaterno: {
            type: String,
            label: 'Apellido Paterno',
            //regEx: SimpleSchema.RegEx.Url
        }
      }).validate({ nombre });
  
      Docente.insert({
        _id: shortid.generate(),
        nombre,
        ApPaterno,
        userId: this.userId,
        visible: true,
        //visitedCount: 0,
        //lastVisitedAt: null
      });
    }
});