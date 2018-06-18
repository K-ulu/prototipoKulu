import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import Dashboard from './Dashboard';

export default DashboardContainer = withTracker(({id}) => {
    
    Meteor.subscribe("users", id);
    let user;
    if(Meteor.user()){
        user = Meteor.user();
    }

    return {
        user: user
    };
  })(Dashboard);