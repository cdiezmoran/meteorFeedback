import './Register_student.html';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Session } from 'meteor/session';

//import partials
import '../partials/Student_join.html';
import '../partials/Student_signup.html';
import '../partials/Student_login.html';

//import server side functions
import { signup, signin } from '../../api/users/methods.js';

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
    const classCode = $('#class_code').val().trim();
    const errorLabel = $('#error-label-join');

    if (!classCode) {
      errorLabel.text('Please add a class code and try again.');
      return;
    }

    if (classCode === "0001") {
      Session.set('routeIndexString', 'SIGNUP')
    }
    //else throw error
  },
  'click #signup-submit': (event) => {
    //get values from textfields
    const email = $('[name=email]').val().trim();
    const password = $('[name=password]').val();
    const errorLabel = $('#error-label-signup');

    if (!email) {
      errorLabel.text('Email field is required.');
      return;
    }

    if(!password) {
      errorLabel.text('Password field is required.');
      return;
    }

    //create a new user
    signup.call({ email, password });
  },
  'click #go-to-login': (event) => {
    event.preventDefault();
    Session.set('routeIndexString', 'LOGIN');
  },
  'click #login-submit': (event) => {
    //Get values from fields
    const email = $('[name=email]').val().trim();
    const password = $('[name=password]').val();
    const errorLabel = $('#error-label-login');

    if (!email) {
      errorLabel.text('Email field is required.');
      return;
    }

    if(!password) {
      errorLabel.text('Password field is required.');
      return;
    }

    Meteor.loginWithPassword(email, password, (error) => {
      if (error) {
        errorLabel.text('Invalid credentials, please try again.');
      }
      else {
        FlowRouter.go('/')
      }
    });
  }
});
