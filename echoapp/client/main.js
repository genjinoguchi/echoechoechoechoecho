import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';
import { FlowRouter } from 'meteor/kadira:flow-router';

import './main.html';

Template.new_home.onRendered(function() {
    console.log("Rendered!")
})

Template.new_home.helpers({
    current_post() {
        Meteor.call("get_current_post", function(err, result) {
            if (err) console.warn(err)
                console.log("current post")
            console.log(result)
            Session.set("current_post", result)
        })
        return Session.get("current_post")
    },
    old_posts() {
        Meteor.call("get_old_posts", function (err, result) {
            if (err) console.warn(err)
                console.log(result)
            Session.set("old_posts", result)
        });
        return Session.get("old_posts")
    }
})


Template.new_post.onRendered(function() {
    console.log("Rendered!")
})

Template.new_post.helpers({
    userID() {
        return "dollythesheep"
    }
})

Template.new_post.events({
    'click .new-post-submit'(event, instance) {
        var headline = $("#headline-id").val();
        var description = $("#description-id").val();
        var a1_title = $("#a1-title-id").val();
        var a1_url = $("#a1-url-id").val();
        var a2_title = $("#a2-title-id").val();
        var a2_url = $("#a2-url-id").val();
        var a3_title = $("#a3-title-id").val();
        var a3_url = $("#a3-url-id").val();
        var question = $("#disc-q-id").val();
        Meteor.call("create_post", headline, description, a1_title, a1_url, a2_title, a2_url, a3_title, a3_url, question, function(err, result) {
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
    Meteor.call("get_post_comments", post_id, 1, function(err, result) {
        if (err) console.warn(err);
        console.log("comments1")
        console.log(result)
        Session.set("comments1", result);
    })
    Meteor.call("get_post_comments", post_id, 2, function(err, result) {
        if (err) console.warn(err);
        Session.set("comments2", result);
    })
    Meteor.call("get_post_comments", post_id, 3, function(err, result) {
        if (err) console.warn(err);
        Session.set("comments3", result);
    })
})

Template.post.helpers({
    post() {
        return Session.get("post")
    },
    comments1() {
        var result = Session.get("comments1")
        if (result) {
            for (var i=0; i<result.length; i++) {
                var element = result[i]
                element.format_date = (new Date(element.time)).toLocaleString()
            }
            console.log("result")
            console.log(result)
            return result
        }
    },
    comments2() {
        var result = Session.get("comments2")
        if (result) {
            for (var i=0; i<result.length; i++) {
                var element = result[i]
                element.format_date = (new Date(element.time)).toLocaleString()
            }
            return result
        }
    },
    comments3() {
        var result = Session.get("comments3")
        if (result) {
            for (var i=0; i<result.length; i++) {
                var element = result[i]
                element.format_date = (new Date(element.time)).toLocaleString()
            }
            return result
        }
    },
    post() {
        Meteor.call("get_current_post", function(err, result) {
            if (err) console.warn(err);
            Session.set("post", result);
        })
        return Session.get("post");
    }
})

function format_date(timestamp) {
    var date = new Date(timestamp)
    return date.getDay() + " " + date.getMonth() + " " + date.getDate() + ", " + (date.getYear() + 1900);
}

Template.post.events({
    'click #reply-button-1'(event, instance) {
        var post_id = parseInt(FlowRouter.current().params._pid);
        var user_id = $("#username-input1").val();
        user_id = user_id ? user_id : "Anonymous";
        var comment_content = $("#comment-input1").val();
        var prompt_id = 1;
        var timestamp = Date.now();
        console.log(comment_content)
        console.log(post_id + user_id + comment_content)
        Meteor.call("add_comment", user_id, post_id, prompt_id, comment_content, timestamp, function(err, result) {
            if (err) console.warn(err);
            // FlowRouter.go("/post/" + result); TODO uncomment this
            //FlowRouter.go("/")
            var post_id = parseInt(FlowRouter.current().params._pid);
            Meteor.call("get_post_comments", post_id, 1, function(err, result) {
                if (err) console.warn(err);
                console.log(result);
                result.forEach(function(element) {
                    element.format_date = format_date(element.time)
                })
                Session.set("comments1", result);
            })
        });
        $("#username-input1").val("");
        $("#comment-input1").val("");
    },
    'click #reply-button2'(event, instance) {
        var post_id = parseInt(FlowRouter.current().params._pid);
        var user_id = $("#username-input2").val();
        user_id = user_id ? user_id : "Anonymous";
        var comment_content = $("#comment-input2").val();
        var prompt_id = 2;
        var timestamp = Date.now();
        console.log(post_id + user_id + comment_content)
        Meteor.call("add_comment", user_id, post_id, prompt_id, comment_content, timestamp, function(err, result) {
            if (err) console.warn(err);
            // FlowRouter.go("/post/" + result); TODO uncomment this
            //FlowRouter.go("/")
            var post_id = parseInt(FlowRouter.current().params._pid);
            Meteor.call("get_post_comments", post_id, 2, function(err, result) {
                if (err) console.warn(err);
                console.log(result);
                result.forEach(function(element) {
                    element.format_date = format_date(element.time)
                })
                Session.set("comments2", result);
            })
        });
        $("#username-input2").val("");
        $("#comment-input2").val("");
    },
    'click #reply-button3'(event, instance) {
        var post_id = parseInt(FlowRouter.current().params._pid);
        var user_id = $("#username-input3").val();
        user_id = user_id ? user_id : "Anonymous";
        var comment_content = $("#comment-input3").val();
        var prompt_id = 3;
        var timestamp = Date.now();
        console.log(post_id + user_id + comment_content)
        Meteor.call("add_comment", user_id, post_id, prompt_id, comment_content, timestamp, function(err, result) {
            if (err) console.warn(err);
            // FlowRouter.go("/post/" + result); TODO uncomment this
            //FlowRouter.go("/")
            var post_id = parseInt(FlowRouter.current().params._pid);
            Meteor.call("get_post_comments", post_id, 3, function(err, result) {
                if (err) console.warn(err);
                console.log(result);
                result.forEach(function(element) {
                    element.format_date = format_date(element.time)
                })
                Session.set("comments3", result);
            })
        });
        $("#username-input3").val("");
        $("#comment-input3").val("");
    }
})

Template.opinion_of_the_day.helpers({});

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
