import './Register_student.html';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { Session } from 'meteor/session';

//import partials
import '../partials/Student_join.html';
import '../partials/Student_signup.html';
import '../partials/Student_login.html';

//Session.set('routeIndexString', 'JOIN');

Template.Register_student.onCreated(() => {

});

Template.Register_student.helpers({
  isJoin() {
    if (Session.get('routeIndexString') === 'JOIN') {
      return true
    }
    return false
  },
  isSignup() {
    if (Session.get('routeIndexString') === 'SIGNUP') {
      return true
    }
    return false
  },
  isLogin() {
    if (Session.get('routeIndexString') === 'LOGIN') {
      return true
    }
    return false
  }
});

Template.Register_student.events({
  'click #student_code-submit': (event) => {
    //if classcode exists render signup template
    //temporary logic below
    var classCode = $('#class_code').val().trim();
    if (classCode == 0001) {
      Session.set('routeIndexString', 'SIGNUP')
    }
    //else throw error
  },
  'click #signup-submit': (event) => {
    //get values from textfields
    var email = $('#emailField').val().trim();
    var password = $('#passwordField').val();
    //create a new user
    Accounts.createUser({
      email,
      password
    }, (error) => {
      console.log(error.reason)
    })
  }
});
