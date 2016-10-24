import { Meteor } from 'meteor/meteor';

import { ClassRooms } from '../../api/class-rooms/class-rooms.js';

Meteor.startup(() => {
  if (ClassRooms.find().count() === 0) {
    const classRoomData = [
      {
        name: 'Leadership I',
        creatorId: 'fakeId',
        studentIds: [],
        teacherIds: ['fakeId']
      }
    ];

    classRoomData.forEach((classRoom) => {
      var classCode = Math.random().toString(36).slice(-6);
      console.log(classCode)

      ClassRooms.insert({
        name: classRoom.name,
        creatorId: classRoom.creatorId,
        studentIds: classRoom.studentIds,
        teacherIds: classRoom.teacherIds,
        classCode
      });
    });
  }
});
