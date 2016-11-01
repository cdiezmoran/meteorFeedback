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
        // Created User
        newUserId = Accounts.createUser(user);

        // Adding top level fields to each user for custom data
      if (type === "student") {
        Meteor.users.update(newUserId, {
            $set: {
                firstName: profile.firstName,
                lastName: profile.lastName,
                pendingForms: []
            }
        });
        Roles.addUsersToRoles(newUserId, ['student'], 'student-group');
      }
      else if (type === "teacher") {
        Meteor.users.update(newUserId, {
            $set: {
                preferedName: profile.firstName,
                sentForms: []
            }
        });
        Roles.addUsersToRoles(newUserId, ['teacher'], 'teacher-group');
      }
    }
  }
});

// TODO: COMPLETE PART 2 OF SUBMITTING A FORM
// export const saveStudentAssesment = new ValidatedMethod({
//
// });
