import './Home_page.html';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

Template.Home_page.onCreated(() => {

});

Template.Home_page.helpers({
  emailLocalPart() {
    const email = Meteor.user().emails[0].address;
    return email.substring(0, email.indexOf('@'));
  }
});
