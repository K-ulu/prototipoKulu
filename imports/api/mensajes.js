import { Mongo } from 'meteor/mongo';

export const Mensajes = new Mongo.Collection('mensajes');

if(Meteor.isServer){
	Meteor.publish('mensajes', function (lobby) {
		return Mensajes.find({ lobby: lobby});
	});
}

Meteor.methods({
  'mensajes.insert'(texto, lobby) {
		//en caso de no haber usuario logueado, negamos la operacion
		if (!this.userId) {
			throw new Meteor.Error('not-authorized');
		}

		//insertamos nuevo mensaje
		Mensajes.insert({
			texto,  
			user: Meteor.userId(),
			timestamp: Date.now(),
			lobby
		});

  }    


});