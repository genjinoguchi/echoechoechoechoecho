import { Meteor } from 'meteor/meteor';

// API configuration
Meteor.startup(() => {
    // startup stuff here

})

// Server Methods
Meteor.methods({
    create_post: function (user, post_content) {
        // Takes in username and post_content, returns the id of the new post.
        return "secretpostid"
    },
    get_post: function(post_id) {
        // Takes in post id and returns the post content.
        return {
            "title" : "FILLER TITLE",
            "description" : "Short description of my opinion",
            "content" : "Some brilliant description here.",
            "user" : "not jenji"
        }
    },
    add_comment: function(user, post_id, comment_content) {
        // Takes in username, post id, and comment content, and returns the comment id.
        return "commentid1"
    },
    get_post_comments: function(post_id) {
        // takes in post id, and returns all the comments for the post.
        return {
            'comments' : [
                {
                    "title" : "Comment Title",
                    "content" : "This is what I have to say about this ridiculous post",
                    "user" : "dolly",
                    "id" : "commentid1"
                },
                {
                    "title" : "Comment Title",
                    "content" : "This is what I have to say about this ridiculous post",
                    "user" : "not jenji",
                    "id" : "commentid2"
                },
                {
                    "title" : "Comment Title",
                    "content" : "This is what I have to say about this ridiculous post",
                    "user" : "gemma",
                    "id" : "commentid3"
                },
                {
                    "title" : "Comment Title",
                    "content" : "This is what I have to say about this ridiculous post",
                    "user" : "takara",
                    "id" : "commentid4"
                }
            ]
        }
    },
    get_comment: function(post_id, comment_id) {
        // takes in post id and comment id, and returns the comment content.
        return {
            "title" : "Comment Title",
            "content" : "This is what I have to say about this ridiculous post",
            "user" : "takara",
            "id" : "commentid4"
        }
    }
})

/*
// Server methods

Meteor.methods({
  query: function (q, opts) {

    // debugging queries
    console.log("server:", q, opts)

    // sync version of our API async func
    var syncT = Meteor.wrapAsync(T.get, T)

    // call sync fn with params
    var result = syncT(q, opts)
    return result

  },
})
*/
