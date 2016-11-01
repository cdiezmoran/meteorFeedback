import { Meteor } from 'meteor/meteor';

import { Forms } from '../forms.js';

Meteor.publish('forms.all', function formsAll() {
  return Forms.find({}, { fields: Forms.publicFields });
});
