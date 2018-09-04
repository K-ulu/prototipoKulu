import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import IndividualFile from './FileIndividualFile.js';
import UserFiles from '../api/filesCol.js';

class FileUploadComponent extends Component {
  constructor(props) {
    super(props);
  }

  // This is our progress bar, bootstrap styled
  // Remove this function if not needed


  render() {
    if (this.props.files.length > 0 && this.props.docsReadyYet) {
      console.log("Listo");
      let fileCursors = this.props.files;

      // Run through each file that the user has stored
      // (make sure the subscription only sends files owned by this user)
      let display = fileCursors.map((aFile, key) => {
        // console.log('A file: ', aFile.link(), aFile.get('name'))
        let link = UserFiles.findOne({_id: aFile._id}).link();  //The "view/download" link

        // Send out components that show details of each file
        return <div key={'file' + key}>
          <IndividualFile
            fileName={aFile.name}
            fileUrl={link}
            fileId={aFile._id}
            fileSize={aFile.size}
          />
        </div>
      })

      return <div>
        {display}

      </div>
    }
    else return <div>No tiene ninguna imagen almacenada</div>;
  }
}

//
// This is the HOC - included in this file just for convenience, but usually kept
// in a separate file to provide separation of concerns.
//
export default withTracker( ( props ) => {
  const filesHandle = Meteor.subscribe('files.all');
  console.log(filesHandle);
  const docsReadyYet = filesHandle.ready();
  console.log(docsReadyYet);
  const files = UserFiles.find({}, {sort: {name: 1}}).fetch();

  return {
    docsReadyYet,
    files,
  };
})(FileUploadComponent);