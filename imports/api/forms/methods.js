import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Roles } from 'meteor/alanning:roles';

import { Forms } from './forms.js';

export const addToAndCreateCustomForm = new ValidatedMethod({
  name: 'forms.create',
  validate: new SimpleSchema({
      name: { type: String },
      formdata: { type: [Object] },
      "formData.$.topic": { type: String },
      "formData.$.question": { type: String },
      "formData.$.answerType": { type: String },
      "formData.$.possibleAnswers": { type: [String] },
      intentType: { type: String }
  }).validator(),
  run({ name, formData, intentType }) {

      var customForm = {
          name,
          formData,
          intentType
      }

      if (Meteor.isServer) {
          // Created Custom Form
          Forms.insert(customForm);
      }
  }
});

// TODO: COMPLETE SUBMIT METHOD
// export const submitTeacherAssesment = new ValidatedMethod({
//     name: 'classRooms.submit',
//     validate: new SimpleSchema({
//         origin_id: { type: String },
//         selectedAnswers: { type: [] }
//     }).validator(),
//     run({ origin_id, selectedAnswers }) {
//
//         var answeredForm = {
//             origin_id,
//             selectedAnswers
//         }
//
//         if (Meteor.isServer) {
//             // Created Custom Form
//             Forms.insert(customForm);
//
//             // Add answered form to teacher role
//             if (type === "teacher") {
//                 Roles.addUsersToRoles(answeredForm, ['answeredTeacherAssesment'], 'teacher-assesments');
//             } else {
//                 Roles.addUsersToRoles(answeredForm, ['answeredStudentAssesment'], 'student-assesments');
//
//             }
//         }
//     }
// });
