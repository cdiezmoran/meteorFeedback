import './Home_page.html';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { createClassRoom } from '../../api/class-rooms/methods.js';

Template.Home_page.onCreated(() => {

});

Template.Home_page.helpers({
  emailLocalPart() {
    const email = Meteor.user().emails[0].address;
    return email.substring(0, email.indexOf('@'));
  }
});

Template.Home_page.events({
  'click .logout'(event) {
    event.preventDefault();

    Meteor.logout();
  },
  'click .create-class-room'(event) {
    event.preventDefault();

    const name = "default class";
    const creatorId = "8nG5ZxasACJDYRKSP";
    const studentIds = [];
    const teacherIds = ["8nG5ZxasACJDYRKSP"];

    createClassRoom.call({ name, creatorId, studentIds, teacherIds }, (error) => {
      if (error) {
        console.log(error);
      }
      else {
        console.log("created defaul class!");
      }
    });
  }
});
