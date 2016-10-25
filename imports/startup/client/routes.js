import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

//Import templates js
import '../../ui/layouts/App_body.js';
import '../../ui/pages/Landing_page.js';
import '../../ui/accounts/Register_student.js';

FlowRouter.route('/', {
  name: 'App.home',
  action() {
    BlazeLayout.render('App_body', { main: 'Landing_page' });
    }
});

FlowRouter.route('/register/student', {
    name: 'register_student',
    action() {
        Session.set('routeIndexString', 'JOIN');
        BlazeLayout.render('App_body', { main: 'Register_student' });
    }
});

FlowRouter.route('/register/teacher', {
    name: 'register_teacher',
    action() {
        Session.set('route_index_string', 'JOIN');
        BlazeLayout.render('App_body', { main: 'Register_teacher' });
    }
});

// Sub Routes for Register_student

FlowRouter.notFound = {
  action() {
      // TODO: UPDATE ME TO 404 PAGE PLS CARLOS :-[
    BlazeLayout.render('App_body', { main: 'Landing_page' });
  }
};
