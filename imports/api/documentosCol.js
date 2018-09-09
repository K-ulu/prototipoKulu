import { FilesCollection } from 'meteor/ostrio:files';

const UserDocs = new FilesCollection({
  storagePath: '/data/assets/app/uploads/UserDocs',
  // storagePath: () => {
  //   return '${process.env.PWD}/UserDocs';
  // },
  downloadRoute: '/files/UserDocs',
  collectionName: 'UserDocs',
  permissions: 0o755,
  allowClientCode: false,
  cacheControl: 'public, max-age=31536000',
  // Read more about cacheControl: https://devcenter.heroku.com/articles/increasing-application-performance-with-http-cache-headers
  onbeforeunloadMessage() {
    return 'Upload is still in progress! Upload will be aborted if you leave this page!';
  },
  onBeforeUpload(file) {
    // Allow upload files under 10MB, and only in png/jpg/jpeg formats
    // Note: You should never trust to extension and mime-type here
    // as this data comes from client and can be easily substitute
    // to check file's "magic-numbers" use `mmmagic` or `file-type` package
    // real extension and mime-type can be checked on client (untrusted side)
    // and on server at `onAfterUpload` hook (trusted side)
    if (file.size <= 15605760 && /docx|pdf|pptx|xlsx/i.test(file.ext)) {
      return true;
    }
    return 'Porfavor cargue un documento, con un tamanio menor o igual 15MB';
  },

  downloadCallback(fileObj) {
    if (this.params.query.download == 'true') {
      // Increment downloads counter
      UserDocs.update(fileObj._id, {$inc: {'meta.downloads': 1}});
    }
    // Must return true to continue download
    return true;
  }
});

// Export FilesCollection instance, so it can be imported in other files
export default UserDocs;