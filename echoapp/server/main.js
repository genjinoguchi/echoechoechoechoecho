import { Meteor } from 'meteor/meteor';
import '/lib/routing.js'

PostData = new Mongo.Collection('postdata')
// API configuration
Meteor.startup(() => {

    //createreply
    //getreplies

    // testing stuff, uncomment to test
    // note: meteor reset to clear out the database (otherwise things will persist)

    // console.log("HELLO");
    //var pid = Meteor.call('create_post', 'headline', 'adfsadf', "a1", "a1", "a2", "a2", "a3", "a3", "q");
    // console.log(pid);
    //
    //var pid2 = Meteor.call('create_post', 'jenga', 'bleh bleh bleh bleh', "a1", "a1", "a2", "a2", "a3", "a3", "q");
    // console.log(pid2);
    //
    //console.log(Meteor.call('add_comment', 'dolly', 0, 'i disagree'));
    //console.log(Meteor.call('add_comment', 'takara', 0, 'i agree'));
    //console.log(Meteor.call('add_comment', 'jenji', 1, 'no'));
    //
    console.log("======= ALL COMMENTS =======");
    console.log(Meteor.call('get_post_comments', 0));
    // console.log("======= TAKARA'S COMMENT =======");
    // console.log(Meteor.call('get_comment', 0, 1));
    //
    // console.log("DATABASE DUMP WOOHOO");
    console.log(PostData.find().fetch());
})

// Server Methods
Meteor.methods({
    create_post: function (headline, description, a1_title, a1_url, a2_title, a2_url, a3_title, a3_url, discussion_question) {
        // Takes in username and post_content, returns the id of the new post.
        if (PostData.find({ type : "global ids" }).count() == 0) {
            PostData.insert({ type: "global ids", global_pid : 0, global_cid : 0, global_rid : 0 });
        }

        var temp = PostData.find({ type: "global ids" }).fetch()[0].global_pid;

        //increments the global post id
        PostData.update({ type : "global ids" }, { $inc : { global_pid : 1 } });

        if (PostData.find({ type : "post", post_type : "current" }).count() > 0) {
            //archives the current post
            PostData.update({ type : "post", post_type : "current"}, { $set : { post_type : "previous" }});
        }

        PostData.insert({
            headline : headline,
            pid : temp,
            type : "post",
            post_type : "current",
            description : description,
            a1_title : a1_title,
            a1_url : a1_url,
            a2_title : a2_title,
            a2_url : a2_url,
            a3_title : a3_title,
            a3_url : a3_url,
            question : discussion_question,
        });

        return temp;
    },
    // get_all_posts: function() {
    //     return PostData.find({ type: "post" }).fetch();
    // },
    get_post: function(post_id) {
        // Takes in post id and returns the post content.
        return PostData.find({ pid : post_id, type : "post" }).fetch()[0];
    },
    get_current_post: function() {
        //returns the current post
        return PostData.find({ type : "post", post_type : "current" }).fetch()[0];
    },
    get_old_posts: function() {
        //returns all old/archived posts
        return PostData.find({ type : "post", post_type : "previous" }, { sort : { pid : -1 }}).fetch();
    },
    add_comment: function(user, post_id, side, comment_content, time) {
        // Takes in username, post id, and comment content, and returns the comment id.
        var temp = PostData.find({ type: "global ids" }).fetch()[0].global_cid;

        PostData.update({ type : "global ids" }, { $inc : { global_cid : 1 } });

        PostData.insert({
            nickname : user,
            pid : post_id,
            side : side,
            cid : temp,
            type : "comment",
            content : comment_content,
            rating : 0,
            time : time
        });

        return temp;
    },
    get_post_comments: function(post_id, prompt_id) {
        // takes in post id, and returns all the comments for the post.
        return PostData.find({ pid : post_id, prid : prompt_id, type : "comment" }).fetch();
    },
    get_comment: function(post_id, comment_id) {
        // takes in post id and comment id, and returns the comment content.
        return PostData.find({ pid : post_id, cid : comment_id, type : "comment"}).fetch()[0];
    },
    upvote: function(post_id, comment_id) {
        PostData.update({ pid : post_id, cid : comment_id }, { $inc : { rating : 1 } })
    },
    get_rating: function(post_id, comment_id) {
        return PostData.find({ pid : post_id, cid : comment_id }).fetch()[0].rating;
    },
    get_pro_comments: function(post_id) {
        return PostData.find({ pid : post_id, type : "comment", side : "pro"}, { sort : { rating : -1 }}).fetch();
    },
    get_con_comments: function(post_id) {
        return PostData.find({ pid : post_id, type : "comment", side : "con"}, { sort : { rating : -1 }}).fetch();
    },
    add_reply: function(user, post_id, comment_id, reply_content, time) {
        // Takes in username, post id, and comment content, and returns the comment id.
        var temp = PostData.find({ type: "global ids" }).fetch()[0].global_rid;

        PostData.update({ type : "global ids" }, { $inc : { global_rid : 1 } });

        PostData.insert({
            nickname : user,
            pid : post_id,
            cid : comment_id,
            rid : temp,
            type : "reply",
            content : reply_content,
            time : time
        });

        return temp;
    },
    get_replies: function(post_id, comment_id) {
        return PostData.find({ pid : post_id, cid : comment_id, type : "reply" }, {sort : {rid : -1} }).fetch();
    }
})
