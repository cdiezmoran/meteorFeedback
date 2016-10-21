import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

export const signup = new ValidatedMethod({
  name: 'users.signup',
  validate: new SimpleSchema({
    email: { type: String },
    password: { type: String }
  }).validator(),
  run({ email, password }) {
    const user = {
      email: email,
      password: password
    }

    Accounts.createUser(user)
  }
})
