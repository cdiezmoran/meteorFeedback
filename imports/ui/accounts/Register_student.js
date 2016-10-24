import './Register_student.html';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Session } from 'meteor/session';

import { ClassRooms } from '../../api/class-rooms/class-rooms.js';

//import partials
import '../partials/Student_join.html';
import '../partials/Student_signup.html';
import '../partials/Student_login.html';

//import server side functions
import { signup } from '../../api/users/methods.js';

Template.Register_student.onCreated(() => {
  Meteor.subscribe('classRooms.all');
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
  'click .student_code-submit'(event) {
    event.preventDefault();

    handleJoinSubmit();
  },
  'submit .form-join'(event) {
    event.preventDefault()

    handleJoinSubmit()
  },
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

    Session.set('routeIndexString', 'LOGIN');
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
  const firstName = $('[name=fname]').val().trim();
  const lastName = $('[name=lname]').val().trim();
  const errorLabel = $('#error-label-signup');

  //Check if fields are empty
  if(!firstName) {
    errorLabel.text('First name field is required.');
    return;
  }

  if(!lastName) {
    errorLabel.text('Last name field is required.');
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
    firstName,
    lastName
  }

  //create a new user
  signup.call({ email, password, profile, type: "student" }, (error) => {
    if (error) {
      console.log(error);
    }
    else {
      Meteor.loginWithPassword(email, password)
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
      FlowRouter.go('/')
    }
  });
}

function handleJoinSubmit() {
  //if classcode exists render signup template
  //temporary logic below
  const classCode = $('[name=classCode]').val().trim().toLowerCase();
  const errorLabel = $('#error-label-join');

  if (!classCode) {
    errorLabel.text('Please add a class code and try again.');
    return;
  }

  if (classCode.length < 6 || classCode.length > 6) {
    errorLabel.text('Invalid class code');
    return;
  }

  classRoom = ClassRooms.findOne({ classCode });

  if (classRoom) {
    Session.set('routeIndexString', 'SIGNUP')
  }
  else {
    errorlabel.text('No class room found for that class code.');
  }
}
