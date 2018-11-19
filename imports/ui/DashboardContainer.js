import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import Dashboard from './Dashboard';

export default DashboardContainer = withTracker(({id}) => {
    Meteor.subscribe("users", id);
    let user;
    let isReady = false;
    if(Meteor.user()){
        user = Meteor.user();
        isReady = true;
    }

    return {
        user: user,
        isReady: isReady,
    };
  })(Dashboard);