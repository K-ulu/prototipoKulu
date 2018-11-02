import { Mongo } from 'meteor/mongo';

export const Lobbies = new Mongo.Collection('lobbies');

if(Meteor.isServer){
	Meteor.publish('lobbies', function (lobby) {
		return Lobbies.find({ lobby: lobby });
	});
}

Meteor.methods({
  'lobbies.insert'(nombre) {
		//en caso de no haber usuario logueado, negamos la operacion
		if (!this.userId) {
			throw new Meteor.Error('not-authorized');
		}

		//insertamos nuevo lobby
		Lobbies.insert({
			nombre  
		});

  }    


});