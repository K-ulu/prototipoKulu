import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Users = Meteor.users.find();

if(Meteor.isServer){
    Meteor.publish('users', function () {
        return Meteor.users.find({ _id: this.userId}, { fields: { tipoUsuario: 1 } });
    });

}

