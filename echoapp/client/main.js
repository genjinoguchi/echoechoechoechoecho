import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';
import { FlowRouter } from 'meteor/kadira:flow-router';

import './main.html';

Template.homer_simpson.onRendered(function() {
    console.log("Rendered!")
})

Template.homer_simpson.helpers({
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
    'click .new-post-submit'(event, instance) {
        var title = $("#new-title-id").val();
        var id = $("#username-id").val();
        var post_content = $("#description-id")
        alert(post_content)
        Meteor.call("create_post", id, title, post_content, function(err, result) {
            alert("poop")
            if (err) console.warn(err);
            FlowRouter.go("/post/" + result);
        });
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
