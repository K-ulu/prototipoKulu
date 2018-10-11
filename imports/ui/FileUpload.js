import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import IndividualFile from './FileIndividualFile.js';
import UserFiles from '../api/filesCol.js';

import { Session } from 'meteor/session';

class FileUploadComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.files.length > 0 && this.props.docsReadyYet) {
      let fileCursors = this.props.files;

      // Run through each file that the user has stored
      // (make sure the subscription only sends files owned by this user)
      let display = fileCursors.map((aFile, key) => {
        // console.log(UserFiles.findOne({_id: aFile._id}));
        let link = UserFiles.findOne({_id: aFile._id}).link();  //The "view/download" link

        // Send out components that show details of each file
        return <IndividualFile
            key={'file' + key}
            fileName={aFile.name}
            fileUrl={link}
            fileId={aFile._id}
            fileSize={aFile.size}
            fileType = {aFile.type}
          />
      })

      return <div className="container">
        <div className="row">
          { display }
        </div> 
      </div>
    }
    else return <div> No tiene ningun archivo almacenado </div>;
  }
}

//
// This is the HOC - included in this file just for convenience, but usually kept
// in a separate file to provide separation of concerns.
//
export default withTracker( ( props ) => {
  id = Session.get('user')._id;
  const filesHandle = Meteor.subscribe('files.all');
  const docsReadyYet = filesHandle.ready();
  const files = UserFiles.find({userId: id}, {sort: {name: 1}}).fetch();

  return {
    docsReadyYet,
    files,
  };
})(FileUploadComponent);
