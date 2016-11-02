import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './Teacher_header.html';

Template.Teacher_header.onCreated(() => {
    console.log("TEACHER HEADER LOADED");
});

Template.Teacher_header.onRendered(() => {
});

Template.Teacher_header.events({
    'click .logout' (event) {
        console.log("LOGGED OUT");
        FlowRouter.go('/');
        Meteor.logout();
    }
});
