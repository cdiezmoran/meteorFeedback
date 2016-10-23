import { Meteor } from 'meteor/meteor';

import { ClassRooms } from '../class-rooms.js';

Meteor.publish('classRooms.all', function classRoomsAll() {
  return ClassRooms.find({}, { fields: ClassRooms.publicFields });
});
