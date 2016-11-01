import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Roles } from 'meteor/alanning:roles';

class FormCollection extends Mongo.Collection {
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

export const Forms = new FormCollection('Forms');

Forms.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});

Forms.schema = new SimpleSchema({
    name: {
        type: String
    },
    formdata: {
        type: [Object]
    },
    "formData.$.topic": {
        type: String
    },
    "formData.$.question": {
        type: String
    },
    "formData.$.answerType": {
        type: String
    },
    "formData.$.possibleAnswers": {
        type: [String]
    },
    intentType: {
        type: String
    }
});
