import R from 'ramda';
import moment from 'moment';

import UserFiles from '../api/filesCol.js';
import { Session } from 'meteor/session';
import { withTracker } from 'meteor/react-meteor-data';

export default withTracker( ( props ) => {
    id = Session.get('user')._id;
    const filesHandle = Meteor.subscribe('files.all');
    const docsReadyYet = filesHandle.ready();
    const files = UserFiles.find({userId: id}, {sort: {name: 1}}).fetch();

    return {
        docsReadyYet,
        files,
    };
})

const ipsum = `Sed leo elit, pellentesque sit amet congue quis, ornare nec lorem. Phasellus tincidunt rhoncus magna,
eget elementum odio rutrum fermentum. Ut a justo lacus. Maecenas blandit molestie felis ac viverra. Pellentesque
sagittis ligula neque, sit amet feugiat massa tempor sed. Duis id bibendum ex, pulvinar tincidunt orci. Curabitur
id sem urna. Maecenas sed elit malesuada, cursus ligula ut, vestibulum lorem. Suspendisse vitae ultrices libero.
Mauris maximus, ligula vitae tincidunt scelerisque, ipsum magna euismod massa, eu vulputate enim est tempus sem.
Maecenas id nibh vitae ante volutpat facilisis nec eget velit. Proin et ligula feugiat, auctor tellus sit amet,
accumsan neque. Quisque porttitor lectus quis elit fermentum, a facilisis est suscipit. Integer consectetur dapibus
nisi, ut lacinia enim vulputate vitae. Curabitur id diam mauris. Duis dictum, dolor at porttitor aliquet, justo libero
mattis magna, eu pellentesque augue mauris eget erat. Pellentesque lacinia velit nec ullamcorper mollis. Pellentesque
lacus tortor, maximus eget tincidunt non, luctus scelerisque odio. Suspendisse potenti. Etiam vel augue blandit, auctor
sem sit amet, imperdiet dolor. Ut a quam laoreet, feugiat orci sed, feugiat nulla. Nulla gravida nisi eu ex egestas
dapibus.`;

const cities = [
    console.log(files),
    {
        title: 'Berlin, Germany',
        imageUrl: 'https://s3.amazonaws.com/aaron-cdn/react-image-timeline/berlin.jpg'
    },
    {
        title: 'Chicago, Illinois',
        imageUrl: 'https://s3.amazonaws.com/aaron-cdn/react-image-timeline/chicago.jpg'
    },
    {
        title: 'Cairo, Egypt',
        imageUrl: 'https://s3.amazonaws.com/aaron-cdn/react-image-timeline/egypt.jpg'
    },
    {
        title: 'London, England',
        imageUrl: 'https://s3.amazonaws.com/aaron-cdn/react-image-timeline/london.jpg'
    },
    {
        title: 'New York, New York',
        imageUrl: 'https://s3.amazonaws.com/aaron-cdn/react-image-timeline/ny.jpg'
    },
    {
        title: 'Paris, France',
        imageUrl: 'https://s3.amazonaws.com/aaron-cdn/react-image-timeline/paris.jpg'
    },
    {
        title: 'Rome, Italy',
        imageUrl: 'https://s3.amazonaws.com/aaron-cdn/react-image-timeline/rome.jpg'
    },
    {
        title: 'Seoul, South Korea',
        imageUrl: 'https://s3.amazonaws.com/aaron-cdn/react-image-timeline/seoul.jpg'
    },
    {
        title: 'Madrid, Spain',
        imageUrl: 'https://s3.amazonaws.com/aaron-cdn/react-image-timeline/spain.jpg'
    },
    {
        title: 'Tokyo, Japan',
        imageUrl: 'https://s3.amazonaws.com/aaron-cdn/react-image-timeline/tokyo.jpg'
    }
];

function shuffled(inputArray) {
    let j, x, i;
    let a = R.clone(inputArray);
    for (i = a.length; i; i -= 1) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
    return a;
}

function randomLengthText(){
    const minLength = 50;
    return ipsum.slice(0, Math.random() * (R.length(ipsum) - minLength) + minLength);
}

export function getSampleData(inOrder = true) {
    let offset = 0;
    const t = inOrder ? array => array : shuffled;
    let orderedCities = R.map(city => {
        offset += Math.random() * 100;
        return R.merge({
            date: moment('2013-02-08').add(offset, 'days'),
            text: randomLengthText(),
            buttonText: 'Read More',
            onClick: () => {},
            extras: {
                foo: '#Travel'
            }
        }, city);
    }, t(cities));
    return t(orderedCities);
}

