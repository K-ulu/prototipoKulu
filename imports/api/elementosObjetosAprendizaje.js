import { FilesCollection } from 'meteor/ostrio:files';
import { Meteor } from 'meteor/meteor';

const ElementosObjetosAprendizaje = new FilesCollection({
  storagePath: '/data/assets/app/uploads/elementos',
  downloadRoute: '/files/elementos',
  collectionName: 'elementos',
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
    // if (file.size <= 10485760 && /mp4|png|jpe?g/i.test(file.ext)) {
    if (file.size <= 15605760 && /mp4|mp3|gif|png|jpe?g/i.test(file.ext)) {
      return true;
    }
    return 'Please upload a content, with size equal or less than 15MB';
  },

  downloadCallback(fileObj) {
    if (this.params.query.download == 'true') {
      // Increment downloads counter
      ElementosObjetosAprendizaje.update(fileObj._id, {$inc: {'meta.downloads': 1}});
    }
    // Must return true to continue download
    return true;
  }
});

if (Meteor.isServer) {
  Meteor.publish('elementos.all', function () {
    return ElementosObjetosAprendizaje.find().cursor;
  });
}

Meteor.methods({
  

  /*'elementos.rename'( miId, nombreElemento,descripcionElemento, fechaCarga, idObjetoAprendizaje, idContenidoMultimedia){
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    ElementosObjetosAprendizaje.update({
      userId: miId
    }, {
      $set: { nombreElemento, descripcionElemento, fechaCarga, idObjetoAprendizaje, idContenidoMultimedia}
    });
  },*/
  
  'elementos.remove'(id) {    
    ElementosObjetosAprendizaje.remove({_id: id}, function (error) {
      if (error) {
        console.error("Archivo no removido, error: " + error.reason)
      } else {
        console.info("Archivo removido correctamente!");
      }
    });     
  }, 

  'elemento.usado'(id) {
    ElementosObjetosAprendizaje.update({
      _id: id
    }, {
        $set: { 'meta.$.usado': true }
    });
  }, 

});

// Export FilesCollection instance, so it can be imported in other files
export default ElementosObjetosAprendizaje;