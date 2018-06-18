import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import MaestroDashboard from './MaestroDashboard';

export default MaestroDashboardContainer = withTracker(({id}) => {
    
    Meteor.subscribe("users", id);
    let user;
    if(Meteor.user()){
        user = Meteor.user();
    }

    return {
        user: user
    };
  })(MaestroDashboard);