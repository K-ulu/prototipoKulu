// import { FilesCollection } from 'meteor/ostrio:files';

// export const UserFiles = new FilesCollection({collectionName: 'userfiles'});
// // optionally attach a schema
// // UserFiles.attachSchema(FilesCollection.schema);

// if (Meteor.isServer) {
//   Meteor.publish('files.all', function () {
//   return UserFiles.find().cursor;
//   });
// }

// Meteor.methods({

//   'RemoveFile'(id) {
     
//       UserFiles.remove({_id: id}, function (error) {
//           if (error) {
//             console.error("File wasn't removed, error: " + error.reason)
//           } else {
//             console.info("File successfully removed");
//           }
//       });

//   },
  
// });

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
              console.error("File wasn't removed, error: " + error.reason)
            } else {
              console.info("File successfully removed");
            }
        });

    },
    
});