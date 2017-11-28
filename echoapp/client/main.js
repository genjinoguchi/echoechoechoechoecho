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
        var post_content = $("#description-id").val();
        console.log(title.toString() + id.toString() + post_content.toString());
        Meteor.call("create_post", id, title, post_content, function(err, result) {
            if (err) console.warn(err);
            // FlowRouter.go("/post/" + result); TODO uncomment this
            FlowRouter.go("/")
        });
    }
})

Template.post.onRendered(function() {
    console.log("Rendered!")
    /*
    Tracker.autorun(() => {
        Meteor.subscribe('post', { 'post': Session.get('post') }),
        Meteor.subscribe('comments', { 'comments': Session.get('comments')}
    });
    */
    var post_id = parseInt(FlowRouter.current().params._pid);
    Meteor.call("get_post", post_id, function(err, result) {
        if (err) console.warn(err);
        console.log(result)
        Session.set("post", result);
    })
    Meteor.call("get_post_comments", post_id, function(err, result) {
        if (err) console.warn(err);
        Session.set("comments", result);
    })
})

Template.post.helpers({
    userID() {
        return "notjenji"
    },
    post() {
        return Session.get("post")
    },
    comments() {
        return Session.get("comments")
    }
})

Template.post.events({
    'click .submit-reply-button'(event, instance) {
        var id = "you"
        var post_id = parseInt(FlowRouter.current().params._pid);
        var comment_content = $(".post-input").val();
        Meteor.call("add_comment", id, post_id, comment_content, function(err, result) {
            if (err) console.warn(err);
            // FlowRouter.go("/post/" + result); TODO uncomment this
            //FlowRouter.go("/")
            var post_id = parseInt(FlowRouter.current().params._pid);
            Meteor.call("get_post_comments", post_id, function(err, result) {
                if (err) console.warn(err);
                console.log(result);
                Session.set("comments", result);
            })
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
