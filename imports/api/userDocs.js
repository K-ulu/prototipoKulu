import UserDocs from './documentosCol.js'
import { Meteor } from 'meteor/meteor';
  
if (Meteor.isServer) {
    Meteor.publish('documentos.all', function () {
        return UserDocs.find().cursor;
    });
}

Meteor.methods({
    'docRemoveFile'(id) {
        UserDocs.remove({_id: id}, function (error) {
            if (error) {
              console.error("Documento no removido, error: " + error.reason)
            } else {
              console.info("Documento removido correctamente!");
            }
        });

    },
    
    'docRenameFile'(id, name) {
        UserDocs.update({
            _id: id
        }, {
            $set: { name }
        });
    }
});