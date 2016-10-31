import './Landing_page.html';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

Template.Landing_page.onCreated(() => {
});

Template.Landing_page.onRendered(() => {
});

Template.Landing_page.helpers({
  emailLocalPart() {
    const email = Meteor.user().emails[0].address;
    return email.substring(0, email.indexOf('@'));
  }
});

Template.Landing_page.events({
  'click .logout'(event) {
      event.preventDefault();

      Meteor.logout();
  },

  'click #student'(event) {
      event.preventDefault();

      // modal.hide();
      Session.set('routeIndexString', 'LOGIN');
  },

  'click #teacher'(event) {
      event.preventDefault();

      // modal.hide();
      Session.set('route_index_string', 'LOGIN');
  }
});
