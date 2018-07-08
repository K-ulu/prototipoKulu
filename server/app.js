import { FilesCollection } from 'meteor/ostrio:files';

export const UserFiles = new FilesCollection({collectionName: 'userfiles'});
// optionally attach a schema
UserFiles.attachSchema(FilesCollection.schema);