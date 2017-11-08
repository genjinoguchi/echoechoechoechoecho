import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';

import './main.html';

Template.home.onRendered(function() {
    console.log("Rendered!")
})

Template.home.helpers({
    userID() {
        return "notjenji"
    },
    posts() {
        Meteor.call("get_all_posts", function (err, result) {
            if (err) console.warn(err)
            Session.set("posts", result)
        });
        return Session.get("posts")
    }
})


Template.new_post.onRendered(function() {
    console.log("Rendered!")
})

Template.new_post.helpers({
    userID() {
        return "notjenji"
    }
})

Template.new_post.events({
    'click submit'(event, instance) {
        
    }
})

/*
Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});

Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});
*/
