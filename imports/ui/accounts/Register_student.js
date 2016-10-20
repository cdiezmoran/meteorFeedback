import './Register_student.html';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

//import partials
import '../partials/Student_join.html';

Template.Register_student.onCreated(() => {
  BlazeLayout.render('Register_student', { content: 'Student_join' });
});

Template.Register_student.helpers({

});

Template.Register_student.events({
  'click #code-submit': (event) => {
    //if classcode exists render signup template
    BlazeLayout.render('Register_student', { content: 'Student_signup' });
    //else throw error
  },
  'click #signup-submit': (event) => {
    //get values from textfields
    //create a new user
    Accounts.create()
  }
});
