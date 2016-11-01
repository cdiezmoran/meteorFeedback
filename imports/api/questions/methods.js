import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Roles } from 'meteor/alanning:roles';

import { Questions } from './questions.js';

export const createQuestion = new ValidatedMethod({
  name: 'questions.newQuestion',
  validate: new SimpleSchema({
      topic: { type: String },
      question: { type: String },
      answerType: { type: String },
      possibleAnswers: { type: [String] }
  }).validator(),
  run({ question, answerType, possibleAnswers }) {
    //Make sure question is unique
    // do {
    //   // Loop through current questions and check new one doesnt exist
    //   // Break if it does and don't create question, return error
    // } while();


    const newQuestion = {
      topic,
      question,
      answerType,
      possibleAnswers
    }

    Questions.insert(newQuestion);
  }
});
