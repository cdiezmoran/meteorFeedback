import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

const profileSchema = new SimpleSchema({
  firstName: { type: String },
  lastName: { type: String }
});

export const signup = new ValidatedMethod({
  name: 'users.signup',
  validate: new SimpleSchema({
    email: { type: String },
    password: { type: String },
    profile: { type: profileSchema }
  }).validator(),
  run({ email, password, profile }) {

    const user = {
      email,
      password,
      profile
    }

    Accounts.createUser(user);
  }
})
