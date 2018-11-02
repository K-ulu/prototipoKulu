import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import AdminContenidoDashboard from './AdminContenidoDashboard';

import { Materias } from '../api/materias';
import { Bloques } from '../api/bloques';

export default AdminContenidoDashboardContainer = withTracker(() => {
    let handle = Meteor.subscribe("materias");
		let isReady = handle.ready();
		let materias = Materias.find().fetch();

    let handleB = Meteor.subscribe("bloques");
		let isReadyB = handle.ready();
		let bloques = Bloques.find().fetch();

    return {
			isReady: isReady,
      materias: materias,
      bloques: bloques
    };
  })(AdminContenidoDashboard);
