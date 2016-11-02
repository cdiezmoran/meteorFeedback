import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './Default_header.html';
import './Signin_modal.html';

var modal;

Template.Default_header.onCreated(() => {
});

Template.Default_header.onRendered(() => {
    // Get the modal
    modal = $('#signinModal');
});

Template.Default_header.events({
    // When the user clicks on the button, open the modal
    'click #openSigninModal' (event) {
        event.preventDefault()
        console.log("MODAL OPENED");
        modal.show();
    },

    // Get the <span> element that closes the modal
    'click .close' (event) {
        console.log("MODAL CLOSED VIA X");
        modal.hide();
    },

    'click .role-label'(event) {
        console.log("Closed via button");
        modal.hide();
    }
});
