import { Mongo } from 'meteor/mongo';
//import '../imports/api/test';

export const Mensajes = new Mongo.Collection('mensajes');
//export const Pruebas = new Mongo.Collection('pruebas');

if(Meteor.isServer){
	Meteor.publish('mensajes', function (lobby) {
		return Mensajes.find({ lobby: lobby});
	});

	// Meteor.publish('mensajesAll', function () {
	// 	return Mensajes.find({});
	// });

	/*Mensajes.before.insert(function (userId, doc) {
		Test.insert({
			campo: 'hola',
		})
	});*/
	

	
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