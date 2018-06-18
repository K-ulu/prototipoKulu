import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import { Tracker } from 'meteor/tracker';
import { routes, onAuthChange} from '../imports/routes/routes';

/*Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId(); //verifica que tenga un contenido y nos regresa true si hay algo false si no hay nada
  onAuthChange(isAuthenticated);
  console.log('isAuthenticated', isAuthenticated);
});*/


Meteor.startup(() => {
  ReactDOM.render(routes, document.getElementById('app'));


  Meteor.call('greetUser', (err, res) => {
    //console.log('Greet User Arguments', err, res)

  });
});
