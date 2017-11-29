import { Meteor } from 'meteor/meteor';
import '/lib/routing.js'

PostData = new Mongo.Collection('postdata')
// API configuration
Meteor.startup(() => {
    // testing stuff, uncomment to test
    // note: meteor reset to clear out the database (otherwise things will persist)

    // console.log("HELLO");
    // var pid = Meteor.call('create_post', 'jenji', 'blah blah blah blah');
    // console.log(pid);
    //
    // var pid2 = Meteor.call('create_post', 'jenga', 'bleh bleh bleh bleh');
    // console.log(pid2);
    //
    // console.log(Meteor.call('add_comment', 'dolly', 0, 'i disagree'));
    // console.log(Meteor.call('add_comment', 'takara', 0, 'i agree'));
    //
    // console.log("======= ALL COMMENTS FOR GENJI =======");
    // console.log(Meteor.call('get_post_comments', 0));
    // console.log("======= TAKARA'S COMMENT =======");
    // console.log(Meteor.call('get_comment', 0, 1));
    //
    // console.log("DATABASE DUMP WOOHOO");
    // console.log(PostData.find().fetch());
})

// Server Methods
Meteor.methods({
    create_post: function (headline, description, a1_title, a1_url, a2_title, a2_url, a3_title, a3_url, discussion_question, date) {
        // Takes in username and post_content, returns the id of the new post.
        if (PostData.find({ type : "global ids" }).count() == 0) {
            PostData.insert({ type: "global ids", global_pid : 0, global_cid : 0 });
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
            date : date
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
        return PostData.find({ type : "post", post_type : "previous" }, { sort : { date : -1 }}).fetch();
    },
    add_comment: function(user, post_id, comment_content) {
        // Takes in username, post id, and comment content, and returns the comment id.
        var temp = PostData.find({ type: "global ids" }).fetch()[0].global_cid;

        PostData.update({ type : "global ids" }, { $inc : { global_cid : 1 } });

        PostData.insert({
            nickname : user,
            pid : post_id,
            cid : temp,
            type : "comment",
            content : comment_content
        });

        return temp;
    },
    get_post_comments: function(post_id) {
        // takes in post id, and returns all the comments for the post.
        return PostData.find({ pid : post_id, type : "comment" }).fetch();
    },
    get_comment: function(post_id, comment_id) {
        // takes in post id and comment id, and returns the comment content.
        return PostData.find({ pid : post_id, cid : comment_id, type : "comment"}).fetch()[0];
    }
})
