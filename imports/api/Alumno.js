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