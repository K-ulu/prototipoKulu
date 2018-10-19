import UserDocs from './documentosCol.js'
import { Meteor } from 'meteor/meteor';
  
if (Meteor.isServer) {
    Meteor.publish('documentos.alla', function () {
        return UserDocs.find().cursor;
    });
}

Meteor.methods({
    'docRemoveFilea'(id) {
        UserDocs.remove({_id: id}, function (error) {
            if (error) {
              console.error("Documento no removido, error: " + error.reason)
            } else {
              console.info("Documento removido correctamente!");
            }
        });

    },
    
    'docRenameFilea'(id, name) {
        UserDocs.update({
            _id: id
        }, {
            $set: { name }
        });
    }
});