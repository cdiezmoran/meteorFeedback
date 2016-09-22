import { Meteor } from 'meteor/meteor';

import { News } from '../news.js';

Meteor.publish('news', () => {
  return News.find({}, { sort: { featured: -1, createdAt: -1 } });
});
