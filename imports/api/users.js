import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import shortid from 'shortid';
import { check } from 'meteor/check';

export const Users = Meteor.users.find();

if(Meteor.isServer){
    Meteor.publish('users', function () {
        return Meteor.users.find({ _id: this.userId}, { fields: { tipoUsuario: 1 } });
    });

    Meteor.publish('allUsers', function () {
        return Meteor.users.find({}, { fields: { profile: 1, emails:1 , tipoUsuario:1 } });
    });
}

Meteor.methods({
  'users.insert'(email, nombre, apellidoP) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    
    Meteor.users.insert(
      {
        _id: shortid.generate(),
        emails: [{
          address: email,
          verified: false
        }],
        password: "",
        tipoUsuario: "alumno",
        profile: {
          nombre: nombre,
          apellidoP: apellidoP,
          apellidoM: "",
          nickname: "",
          curp: ""
        }
      }
    );
  },
    'users.update'( correo, nombre, apellido){
      let correos = [{address: correo, verified:false}];
      if (!this.userId) {
        throw new Meteor.Error('not-authorized');
      }
      Meteor.users.update(
          {
            emails:correos
          },
          {
            $set: { "profile.nombre" : nombre, "profile.apellidoP" : apellido}
          }
      );
    },
    
    'users.remove'(id) {
      check(id, String);
   
      Meteor.users.remove(id);
    }
  });

