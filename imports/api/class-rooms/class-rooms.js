import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Roles } from 'meteor/alanning:roles';

class ClassRoomCollection extends Mongo.Collection {
  insert(doc, callback) {
    return super.insert(doc, callback);
  }
  update(selector, modifier) {
    return super.update(selector, modifier);
  }
  remove(selector) {
    return super.remove(selector);
  }
}

export const ClassRooms = new ClassRoomCollection('ClassRooms');

ClassRooms.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});

ClassRooms.schema = new SimpleSchema({
  name: {
    type: String
  },
  classCode: {
    type: String
  },
  creatorId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id
  },
  studentIds: {
    type: [String],
    regEx: SimpleSchema.RegEx.Id
  },
  teacherIds: {
    type: [String],
    regEx: SimpleSchema.RegEx.Id
  }
});

ClassRooms.publicFields = {
  name: 1,
  classCode: 1,
  creatorId: 1,
  studentIds: 1,
  teacherIds: 1
}

ClassRooms.helpers({
  editableBy(userId) {
    if (Roles.userIsInRole(userId, ['admin'], Roles.GLOBAL_GROUP)) {
      return true;
    }

    return this.creatorId === userId;
  },
  //We can do the queries for students and teachers here
});
