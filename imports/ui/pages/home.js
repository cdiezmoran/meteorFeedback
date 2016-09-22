import './home.html';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { News } from '../../api/news/news.js';

Template.HomeTemplate.onCreated(() => {
  Meteor.subscribe('news');
});

Template.HomeTemplate.helpers({
  newsAddedRecently() {
    return News.find({}, { limit: 3 });
  },
  isActive(index) {
    if (index === 0) {
      return 'active';
    }
  }
});
