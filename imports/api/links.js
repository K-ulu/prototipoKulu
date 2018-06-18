import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Links = new Mongo.Collection('links');

if(Meteor.isServer){
    Meteor.publish('links', function () {
        return Links.find({ userId: this.userId });
    });
}

Meteor.methods({
    greetUser(){
        //console.log('greetUser is running');
        return 'Hello user!';

    }
});