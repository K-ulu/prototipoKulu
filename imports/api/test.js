import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Test = new Mongo.Collection('test');

if (Meteor.isServer) {
  Meteor.publish('test', function () {
    return Test.find();
  });
}