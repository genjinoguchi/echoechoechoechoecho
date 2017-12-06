import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';
import { FlowRouter } from 'meteor/kadira:flow-router';

import './main.html';

// Template.new_home.onRendered(function() {
//     console.log("Rendered!")
// })
//
// Template.new_home.helpers({
//     current_post() {
//         Meteor.call("get_current_post", function(err, result) {
//             if (err) console.warn(err)
//             console.log("current post")
//             console.log(result)
//             Session.set("current_post", result)
//         })
//         return Session.get("current_post")
//     },
//     old_posts() {
//         Meteor.call("get_old_posts", function (err, result) {
//             if (err) console.warn(err)
//             console.log(result)
//             Session.set("old_posts", result)
//         });
//         return Session.get("old_posts")
//     }
// })
//
//
// Template.new_post.onRendered(function() {
//     console.log("Rendered!")
// })
//
// Template.new_post.helpers({
//     userID() {
//         return "dollythesheep"
//     }
// })

Template.home.onRendered(function() {
    Meteor.call("get_current_post", function(err, result) {
        if (err) console.warn(err);
        Session.set("post", result);
    })
    Meteor.call("get_comments_pro", 0, function(err, result) {
        if (err) console.warn(err);
        Session.set("comments_pro", result);
    })
    Meteor.call("get_comments_con", 0, function(err, result) {
        if (err) console.warn(err);
        Session.set("comments_con", result);
    })

/*
    setTimeout(function() {
        console.log("rendered JS")
        var script = document.createElement('script');
        script.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js";
        document.getElementsByTagName('head')[0].appendChild(script);
    }, 2000)
    */
})

Template.home.helpers({
    testing() {
        //console.log("hello")
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

Template.comments.onRendered(function() {
    //console.log("Rendered!")
    /*
    Tracker.autorun(() => {
        Meteor.subscribe('post', { 'post': Session.get('post') }),
        Meteor.subscribe('comments', { 'comments': Session.get('comments')}
    });
    */
    // Meteor.call("get_current_post", function(err, result) {
    //     if (err) console.warn(err);
    //     console.log(result)
    //     Session.set("post", result);
    // })
    // Meteor.call("get_comments_pro", Session.get("post").pid, function(err, result) {
    //     if (err) console.warn(err);
    //     console.log("comments_pro")
    //     console.log(result)
    //     Session.set("comments_pro", result);
    // })
    // Meteor.call("get_comments_pro", Session.get("post").pid, function(err, result) {
    //     if (err) console.warn(err);
    //     console.log("comments_pro")
    //     console.log(result)
    //     Session.set("comments_pro", result);
    // })
})

Template.comments.helpers({
    testing() {
        //console.log("testing")
    },
    post() {
        Meteor.call("get_current_post", function(err, result) {
            if (err) console.warn(err);
            Session.set("post", result)
        })
        return Session.get("post")
    },
    comments_con() {
        var result = Session.get("comments_con")
        if (result) {
            for (var i=0; i<result.length; i++) {
                var element = result[i]
                element.format_date = (new Date(element.time)).toLocaleString()
            }
            return result
        }
    },
    comments_pro() {
        var result = Session.get("comments_pro")
        if (result) {
            for (var i=0; i<result.length; i++) {
                var element = result[i]
                element.format_date = (new Date(element.time)).toLocaleString()
            }
            return result
        }
    }
})

function format_date(timestamp) {
    var date = new Date(timestamp)
    return date.getDay() + " " + date.getMonth() + " " + date.getDate() + ", " + (date.getYear() + 1900);
}

///// PRO /////////////////
Template.left_input.events({
    'click #left_input_button'(event, instance) {
        var post_id = 0
        var user_id = Session.get("username")
        user_id = user_id ? user_id : "Anonymous";
        var comment_content = $("#left_input_area").val();
        var timestamp = Date.now();
        //console.log(comment_content)
        //console.log(post_id + user_id + comment_content)
        Meteor.call("add_comment", user_id, post_id, "pro", comment_content, timestamp, function(err, result) {
            if (err) console.warn(err);
            // FlowRouter.go("/post/" + result); TODO uncomment this
            //FlowRouter.go("/")
            var post_id = 0
            Meteor.call("get_comments_pro", post_id, function(err, result) {
                if (err) console.warn(err);
                result.forEach(function(element) {
                    element.format_date = format_date(element.time)
                })
                Session.set("comments_pro", result);
            })
        });
        $("#left_input_area").val("");
    }
})

Template.comment_pro.onRendered(function() {
    console.log("cid")
    console.log(this.data.cid)
    Meteor.call("get_replies", 0, this.data.cid, function(err, result) {
        if (err) console.warn(err)

        var sesh_id = "";
        if (result.length > 0) {
            console.log(result)
            var sesh_id = "replies_" + result[0].cid
            for (element in result) {
                element.format_date = format_date(element.time)
            }
            Session.set(sesh_id, result)
        }
    })
})

Template.comment_pro.events({
    'click #reply-button'(event, instance) {
        var post_id = 0
        var user_id = Session.get("username");
        user_id = user_id ? user_id : "Anonymous";
        var comment_id = this.cid;
        var reply_content = $("#reply-input-" + this.cid).val();
        console.log(reply_content)
        // TODO: assert comment_content is not empty
        var timestamp = Date.now();
        console.log("this.cid")
        console.log(this.cid)
        console.log("Reply content")
        console.log(reply_content)
        Meteor.call("add_reply", user_id, post_id, comment_id, reply_content, timestamp, function(err, result) {
            if (err) console.warn(err)

            var post_id = 0
            console.log("result")
            console.log(result)
            Meteor.call("get_replies", 0, result, function(err, result) {
                if (err) console.warn(err)

                var sesh_id = "";
                if (result.length > 0) {
                    var sesh_id = "replies_" + result[0].cid
                    for (element in result) {
                        element.format_date = format_date(element.time)
                    }
                    Session.set(sesh_id, result)
                }
            })

            // Meteor.call("get_comments_pro", post_id, function(err, result) {
            //     if (err) console.warn(err);
            //
            //     for (element in result) {
            //         element.format_date = format_date(element.time)
            //     }
            //     Session.set("comments", result);
            // })
        })
        $(".reply-input").val("");
    },
    "click #upvote"(event, instance) {
        var post_id = 0
        var user_id = Session.get("username");
        user_id = user_id ? user_id : "Anonymous";
        var comment_id = this.cid;
        var reply_content = $("#reply-input-" + this.cid).val();
        console.log(reply_content)
        // TODO: assert comment_content is not empty
        var timestamp = Date.now();

        $("#upvote").remove();
        Meteor.call("upvote_comment", post_id, comment_id, function(err, result) {
            if (err) console.warn(err)

            Meteor.call("get_comments_pro", post_id, function(err, result) {
                if (err) console.warn(err);
                result.forEach(function(element) {
                    element.format_date = format_date(element.time)
                })
                Session.set("comments_pro", result);
            })
        })
    }
})

Template.comment_pro.helpers({
    replies() {
        var sesh_id = "replies_" + this.cid
        if (Session.get(sesh_id)) {
            return Session.get(sesh_id)
        } else {
            return [];
        }
    }
})



///// CON /////////////////
Template.right_input.events({
    'click #right_input_button'(event, instance) {
        var post_id = 0
        var user_id = Session.get("username")
        user_id = user_id ? user_id : "Anonymous";
        var comment_content = $("#right_input_area").val();
        var timestamp = Date.now();
        //console.log(comment_content)
        //console.log(post_id + user_id + comment_content)
        Meteor.call("add_comment", user_id, post_id, "con", comment_content, timestamp, function(err, result) {
            if (err) console.warn(err);
            // FlowRouter.go("/post/" + result); TODO uncomment this
            //FlowRouter.go("/")
            var post_id = 0
            Meteor.call("get_comments_con", post_id, function(err, result) {
                if (err) console.warn(err);
                result.forEach(function(element) {
                    element.format_date = format_date(element.time)
                })
                Session.set("comments_con", result);
            })
        });
        $("#right_input_area").val("");
    }
})

Template.comment_con.onRendered(function() {
    console.log("cid")
    console.log(this.data.cid)
    Meteor.call("get_replies", 0, this.data.cid, function(err, result) {
        if (err) console.warn(err)

        var sesh_id = "";
        if (result.length > 0) {
            console.log(result)
            var sesh_id = "replies_" + result[0].cid
            for (element in result) {
                element.format_date = format_date(element.time)
            }
            Session.set(sesh_id, result)
        }
    })
})

Template.comment_con.events({
    'click #reply-button'(event, instance) {
        var post_id = 0
        var user_id = Session.get("username");
        user_id = user_id ? user_id : "Anonymous";
        var comment_id = this.cid;
        // TODO: assert comment_content is not empty
        var timestamp = Date.now();
        console.log("this.cid")
        console.log(this.cid)
        console.log("Reply content")
        console.log(reply_content)
        Meteor.call("add_reply", user_id, post_id, comment_id, reply_content, timestamp, function(err, result) {
            if (err) console.warn(err)

            var post_id = 0
            console.log("result")
            console.log(result)
            Meteor.call("get_replies", 0, result, function(err, result) {
                if (err) console.warn(err)

                var sesh_id = "";
                if (result.length > 0) {
                    var sesh_id = "replies_" + result[0].cid
                    for (element in result) {
                        element.format_date = format_date(element.time)
                    }
                    Session.set(sesh_id, result)
                }
            })

            // Meteor.call("get_comments_pro", post_id, function(err, result) {
            //     if (err) console.warn(err);
            //
            //     for (element in result) {
            //         element.format_date = format_date(element.time)
            //     }
            //     Session.set("comments", result);
            // })
        })
        $(".reply-input").val("");
    },
    "click #upvote"(event, instance) {
        $("#upvote").remove();
        $("#upvote").remove();
        $("#upvote").remove();
        $("#upvote").remove();
        $("#upvote").remove();
        $("#upvote").remove();
        $("#upvote").remove();
        $("#upvote").remove();

        console.log("hello")
        var post_id = 0
        var user_id = Session.get("username");
        user_id = user_id ? user_id : "Anonymous";
        var comment_id = this.cid;
        // TODO: assert comment_content is not empty
        var timestamp = Date.now();

        Meteor.call("upvote_comment", post_id, comment_id, function(err, result) {
            if (err) console.warn(err)

            Meteor.call("get_comments_con", post_id, function(err, result) {
                if (err) console.warn(err);
                result.forEach(function(element) {
                    element.format_date = format_date(element.time)
                })
                Session.set("comments_con", result);
            })
        })

    }
})

Template.comment_con.helpers({
    replies() {
        var sesh_id = "replies_" + this.cid
        if (Session.get(sesh_id)) {
            return Session.get(sesh_id)
        } else {
            return [];
        }
    }
})

Template.reply_comment_con.events({
    "click #upvote-reply"(event, instance) {
        $("#upvote-reply").remove();
        $("#upvote-reply").remove();
        var post_id = 0
        var user_id = Session.get("username");
        user_id = user_id ? user_id : "Anonymous";
        var comment_id = this.cid;
        var timestamp = Date.now();

        Meteor.call("upvote_reply", post_id, comment_id, this.rid, function(err, result) {
            if (err) console.warn(err)

            Meteor.call("get_replies", 0, result, function(err, result) {
                if (err) console.warn(err)

                var sesh_id = "";
                if (result.length > 0) {
                    var sesh_id = "replies_" + result[0].cid
                    for (element in result) {
                        element.format_date = format_date(element.time)
                    }
                    Session.set(sesh_id, result)
                }
            })
        })
    }
})

Template.reply_comment_pro.events({
    "click #upvote-reply"(event, instance) {
        $("#upvote-reply").remove();
        $("#upvote-reply").remove();
        var post_id = 0
        var user_id = Session.get("username");
        user_id = user_id ? user_id : "Anonymous";
        var comment_id = this.cid;
        var timestamp = Date.now();

        Meteor.call("upvote_reply", post_id, comment_id, this.rid, function(err, result) {
            if (err) console.warn(err)

            Meteor.call("get_replies", 0, result, function(err, result) {
                if (err) console.warn(err)

                var sesh_id = "";
                if (result.length > 0) {
                    var sesh_id = "replies_" + result[0].cid
                    for (element in result) {
                        element.format_date = format_date(element.time)
                    }
                    Session.set(sesh_id, result)
                }
            })
        })
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

Template.navbar.events({
    'click #username-button'(event, instance) {
        var username = $("#username-input").val();
        Session.set("username", username);
    }

});
