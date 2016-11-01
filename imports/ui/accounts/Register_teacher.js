import './Register_teacher.html';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Session } from 'meteor/session';

//import partials
import '../partials/Teacher_login.html';
import '../partials/Teacher_signup.html';

//import server side functions for Users
import { signup } from '../../api/users/methods.js';


Template.Register_teacher.onCreated(() => {
});


Template.Register_teacher.helpers({
  isSignup() {
    if (Session.get('route_index_string') === 'SIGNUP') {
      return true
    }
    return false
  },
  isLogin() {
      console.log("I AM HERE FUCKER!");
    if (Session.get('route_index_string') === 'LOGIN') {
      return true
    }
    return false
  }
});

Template.Register_teacher.events({
    'click .signup-submit'(event) {
        event.preventDefault();

        handleSignupSubmit();
    },

    'submit .form-signup'(event) {
        event.preventDefault();

        handleSignupSubmit();
    },

    'click .go-to-login'(event) {
        event.preventDefault();

        Session.set('route_index_string', 'LOGIN');
    },

    'click .go-to-join'(event) {
        event.preventDefault();

        Session.set('route_index_string', 'SIGNUP');
    },

    'click .signin-submit'(event) {
        event.preventDefault();

        handleSigninSubmit();
    },

    'submit .form-signin'(event) {
        event.preventDefault();

        handleSigninSubmit();
    }
});

function handleSignupSubmit() {
  //get values from textfields
  const email = $('[name=email]').val().trim();
  const password = $('[name=password]').val();
  const prefName = $('[name=prefName]').val();
  const errorLabel = $('#error-label-signup');

  //Check if fields are empty
  if(!prefName) {
    errorLabel.text('Preffered Name field is required.');
    return;
  }

  if (!email) {
    errorLabel.text('Email field is required.');
    return;
  }

  if(!password) {
    errorLabel.text('Password field is required.');
    return;
  }

  //create profile object
  const profile = {
    firstName: prefName,
    lastName: ""
  }

  //create a new user
  signup.call({ email, password, profile, type: "teacher" }, (error) => {
    if (error) {
      console.log(error);
    }
    else {
      Meteor.loginWithPassword(email, password);
      // Change me to route to home after logging in user to respective home page
      FlowRouter.go('/');
    }
  });
}

function handleSigninSubmit() {
  //Get values from fields
  const email = $('[name=email]').val().trim();
  const password = $('[name=password]').val();
  const errorLabel = $('#error-label-login');

  //Check if fields are empty
  if (!email) {
    errorLabel.text('Email field is required.');
    return;
  }

  if(!password) {
    errorLabel.text('Password field is required.');
    return;
  }

  //Login the user
  Meteor.loginWithPassword(email, password, (error) => {
    if (error) {
      errorLabel.text('Invalid credentials, please try again.');
    }
    else {
        // Session.set('route_index_string', 'SIGNUP');
        FlowRouter.go('/teacher/home')
    }
  });
}
