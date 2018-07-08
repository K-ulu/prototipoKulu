// import React from 'react';
// import { Mongo } from 'meteor/mongo';
// import { Meteor } from 'meteor/meteor';

// const Photos = new Mongo.Collection('photos');

// export default class SaveImages extends React.Component {
//     constructor(props){
//         super(props);
//         this.state = {
//           error: '', //almacena el error
//           value: '' //almacena valor del tipo de usuario
//         };
//         this.photoInputOnChange = this.photoInputOnChange.bind(this);
//     }

//     getMeteorData(){
//         console.log(Photos.find({}).fetch());
//         return{
//             photos: Photos.find({}).fetch()
//         }
//     }

//     renderPhoto(){
//         return (
//             <div>mi nuevo metodo</div>
//         )
//     }
    
//     photoInputOnChange(){
//         console.log('onChange');
//         console.log(this.refs.photoInput.value);
//        // if (Meteor.isClient) {
//         Photos.insert({photo:this.refs.photoInput.value});
//         //}
//     }

//     render(){
//         return (
//             <div>
//               <p>Probando guardar imagenes</p>
//               {this.renderPhoto()}
//               {/* {this.getMeteorData()} */}
//               <input ref='photoInput' onChange={this.photoInputOnChange}/>
//             </div>          
//         );
//     }
// }

import { Meteor } from 'meteor/meteor';
import { FilesCollection } from 'meteor/ostrio:files';
import Grid from 'gridfs-stream';
import { MongoInternals } from 'meteor/mongo';
import fs from 'fs';

let gfs;
if (Meteor.isServer) {
  gfs = Grid(
    MongoInternals.defaultRemoteCollectionDriver().mongo.db,
    MongoInternals.NpmModule
  );
}

export const Images = new FilesCollection({
  collectionName: 'images',
  allowClientCode: false,
  debug: Meteor.isServer && process.env.NODE_ENV === 'development',
  onBeforeUpload(file) {
    if (file.size <= 10485760 && /png|jpg|jpeg/i.test(file.extension)) return true;
    return 'Please upload image, with size equal or less than 10MB';
  },
  onAfterUpload(image) {
    // Move file to GridFS
    Object.keys(image.versions).forEach(versionName => {
      const metadata = { versionName, imageId: image._id, storedAt: new Date() }; // Optional
      const writeStream = gfs.createWriteStream({ filename: image.name, metadata });

      fs.createReadStream(image.versions[versionName].path).pipe(writeStream);

      writeStream.on('close', Meteor.bindEnvironment(file => {
        const property = `versions.${versionName}.meta.gridFsFileId`;

        // If we store the ObjectID itself, Meteor (EJSON?) seems to convert it to a
        // LocalCollection.ObjectID, which GFS doesn't understand.
        this.collection.update(image._id, { $set: { [property]: file._id.toString() } });
        this.unlink(this.collection.findOne(image._id), versionName); // Unlink files from FS
      }));
    });
  },
  interceptDownload(http, image, versionName) {
    // Serve file from GridFS
    const _id = (image.versions[versionName].meta || {}).gridFsFileId;
    if (_id) {
      const readStream = gfs.createReadStream({ _id });
      readStream.on('error', err => { throw err; });
      readStream.pipe(http.response);
    }
    return Boolean(_id); // Serve file from either GridFS or FS if it wasn't uploaded yet
  },
  onAfterRemove(images) {
    // Remove corresponding file from GridFS
    images.forEach(image => {
      Object.keys(image.versions).forEach(versionName => {
        const _id = (image.versions[versionName].meta || {}).gridFsFileId;
        if (_id) gfs.remove({ _id }, err => { if (err) throw err; });
      });
    });
  }
});

if (Meteor.isServer) {
  Images.denyClient();
}