import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Roles } from 'meteor/alanning:roles';

class QuestionCollection extends Mongo.Collection {
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

export const Questions = new QuestionCollection('Questions');

Questions.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});

Questions.schema = new SimpleSchema({
    topic: {
        type: String
    },
    question: {
        type: String
    },
    answerType: {
        type: String
    },
    possibleAnswers: {
        type: [String]
    }
});
