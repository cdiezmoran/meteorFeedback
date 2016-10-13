import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { Meteor } from 'meteor/meteor';

//Import templates js
import '../../ui/layouts/app-body.js';
import '../../ui/pages/home.js';

FlowRouter.route('/', {
  name: 'App.home',
  action() {
    BlazeLayout.render('AppBody', { main: 'HomePage' });
  }
});

FlowRouter.notFound = {
  action() {
    BlazeLayout.render('AppBody', { main: 'HomePage' });
  }
};
