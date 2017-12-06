import { FlowRouter } from 'meteor/kadira:flow-router';

FlowRouter.route("/", {
    name: "Home",
    action(params, queryParams) {
        BlazeLayout.render("home");
    }
})

FlowRouter.route("/new", {
    name: "New_Post",
    action(params, queryParams) {
        BlazeLayout.render("new_post");
    }
})

// FlowRouter.route("/post/:_pid", {
//     name: "Post_Feed",
//     action(params, queryParams) {
//         BlazeLayout.render("post");
//     }
// })
