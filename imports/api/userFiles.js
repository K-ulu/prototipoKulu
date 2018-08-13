import UserFiles from './filesCol.js'
import { Meteor } from 'meteor/meteor';

if (Meteor.isClient) {
    Meteor.subscribe('files.images.all');
}
  
if (Meteor.isServer) {
    Meteor.publish('files.all', function () {
    return UserFiles.find().cursor;
    });
}

Meteor.methods({

    'RemoveFile'(id) {
       
        UserFiles.remove({_id: id}, function (error) {
            if (error) {
              console.error("Archivo no removido, error: " + error.reason)
            } else {
              console.info("Archivo removido correctamente!");
            }
        });

    },
    
    'RenameFile'(id, nombre) {
       console.log("noombre", nombre);
      UserFiles.RenameFile({_id: id},{name: nombre}, function (error) {
          if (error) {
            console.error("Archivo no editado, error: " + error.reason)
          } else {
            console.info("Archivo editado correctamente!");
          }
      });

  },
});