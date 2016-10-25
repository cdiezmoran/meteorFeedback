import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Roles } from 'meteor/alanning:roles';

const profileSchema = new SimpleSchema({
  firstName: { type: String },
  lastName: { type: String }
});

export const signup = new ValidatedMethod({
  name: 'users.signup',
  validate: new SimpleSchema({
    email: { type: String },
    password: { type: String },
    profile: { type: profileSchema },
    type: { type: String }
  }).validator(),
  run({ email, password, profile, type }) {

    const user = {
      email,
      password
    }

    if (Meteor.isServer) {
      newUserId = Accounts.createUser(user);

      if (type === "student") {
        Meteor.users.update(newUserId, { $set: { firstName: profile.firstName, lastName: profile.lastName } })
        Roles.addUsersToRoles(newUserId, ['student'], 'student-group');
      }
      else if (type === "teacher") {
        Meteor.users.update(newUserId, { $set: { preferedName: profile.firstName } })
        Roles.addUsersToRoles(newUserId, ['teacher'], 'teacher-group');

      }
    }
  }
})
