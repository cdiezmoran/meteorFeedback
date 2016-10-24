import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Roles } from 'meteor/alanning:roles';

import { ClassRooms } from './class-rooms.js';

export const createClassRoom = new ValidatedMethod({
  name: 'classRooms.insert',
  validate: new SimpleSchema({
    name: { type: String },
    creatorId: { type: String },
    studentIds: { type: [String] },
    teacherIds: { type: [String] }
  }).validator(),
  run({ name, creatorId, studentIds, teacherIds }) {
    //Make sure classCode is unique
    do {
      //Generate class code string by getting a random number
      //convert it to base-36 and cut off the last 6 characters
      var classCode = Math.random().toString(36).slice(-6);

      var existingClassRoom = ClassRooms.findOne({ classCode });

    } while(existingClassRoom);


    const classRoom = {
      name,
      classCode,
      creatorId,
      studentIds,
      teacherIds,
      createdAt: new Date()
    }

    ClassRooms.insert(classRoom);
  }
});

export const addUserToClassRoom = new ValidatedMethod({
  name: 'classRooms.newUser',
  validate: new SimpleSchema({
    classRoomId: { type: String },
    userId: { type: String }
  }).validator(),
  run({ classRoomId, userId }) {

    if(Roles.userIsInRole(userId, ['students'], 'students-group')) {
      ClassRooms.update(classRoomId, { $push: { studentIds: userId } });
    }
    else if (Roles.userIsInRole(userId, ['teachers'], 'teachers-group')) {
      ClassRooms.update(classRoomId, { $push: { teacherIds: userId } });
    }
  }
});

export const removeUserFromClassRoom = new ValidatedMethod({
  name: 'classRooms.removeUser',
  validate: new SimpleSchema({
    classRoomId: { type: String },
    userId: { type: String }
  }).validator(),
  run({ classRoomId, userId }) {

    if(Roles.userIsInRole(userId, ['students'], 'students-group')) {
      ClassRooms.update(classRoomId, { $pull: { studentIds: userId } });
    }
    else if (Roles.userIsInRole(userId, ['teachers'], 'teachers-group')) {
      ClassRooms.update(classRoomId, { $pull: { teacherIds: userId } });
    }
  }
});

export const removeClassRoom = new ValidatedMethod({
  name: 'classRooms.remove',
  validate: new SimpleSchema({
    classRoomId: { type: String }
  }).validator(),
  run({ classRoomId }) {
    const classRoom = ClassRooms.findOne(classRoomId);

    if (!classRoom.editableBy(this.userId)) {
      throw new Meteor.Error('api.classRooms.remove.accessDenied',
        'You don\'t have permission to remove this class room.');
    }

    ClassRooms.remove(classRoomId)
  }
})

/*export const addStudentToClassRoom = new ValidatedMethod({
  name: 'classRooms.newStudent',
  validate: new SimpleSchema({
    classRoomId: { type: String, regEx: SimpleSchema.RegEx.Id },
    studentId: { type: String, regEx: SimpleSchema.RegEx.Id }
  }).validator(),
  run({ classRoomId, studentId }) {

    ClassRooms.update(classRoomId, { $push: { studentIds: studentId } });
  }
});

export const addTeacherToClassRoom = new ValidatedMethod({
  name: 'classRooms.newTeacher',
  validate: new SimpleSchema({
    classRoomId: { type: String, regEx: SimpleSchema.RegEx.Id },
    teacherId: { type: String, regEx: SimpleSchema.RegEx.Id }
  }).validator(),
  run({ classRoomId, teacherId }) {

    ClassRooms.update(classRoomId, { $push: { teacherIds: teacherId } });
  }
});

export const removeStudentFromClassRoom = new ValidatedMethod({
  name: 'classRooms.removeStudent',
  validate: new SimpleSchema({
    classRoomId: { type: String, regEx: SimpleSchema.RegEx.Id },
    studentId: { type: String, regEx: SimpleSchema.RegEx.Id }
  }).validator(),
  run({ classRoomId, studentId }) {

    ClassRooms.update(classRoomId, { $pull: { studentIds: studentId } });
  }
});

export const removeTeacherFromClassRoom = new ValidatedMethod({
  name: 'classRooms.removeStudent',
  validate: new SimpleSchema({
    classRoomId: { type: String, regEx: SimpleSchema.RegEx.Id },
    teacherId: { type: String, regEx: SimpleSchema.RegEx.Id }
  }).validator(),
  run({ classRoomId, teacherId }) {

    ClassRooms.update(classRoomId, { $pull: { teacherIds: teacherId } });
  }
});*/
