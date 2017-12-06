$(document).ready(function(){
    setTimeout(function() {
        console.log("hello there")

        var pickedSide = false;
        var counter = 0;

        $(".sub-reply").hide();
        $(".left-blocked").hide();
        $(".right-blocked").hide();
        $(".left-input").hide();
        $(".right-input").hide();

        $("#agree-button").click(function(event) {
            $(".sub-reply").hide();
            $(".left-blocked").hide();
            $(".right-blocked").hide();
            $(".left-input").hide();
            $(".right-input").hide();

            $(".blur").toggleClass('blur');
            $(".hidden-content").hide();
            $(".left-input").show();
            $(".right-blocked").show();
            $(".pro-score").html("score hidden");

            $(".agreement-card").hide('slow/400/fast', function() {

            });
        });

        $("#disagree-button").click(function(event) {
            $(".sub-reply").hide();
            $(".left-blocked").hide();
            $(".right-blocked").hide();
            $(".left-input").hide();
            $(".right-input").hide();

            $(".blur").toggleClass('blur');
            $(".hidden-content").hide();
            $(".right-input").show();
            $(".left-blocked").show();

            $(".con-score").html("score hidden");
            $(".agreement-card").hide('slow/400/fast', function() {

            });
        });

        $(".reply").click(function(event) {
            /* Act on the event */
            console.log("hello");
            var cls = $(event.target).attr('class').split(" ")[1];
            console.log(cls);

            $("#" + cls.toString()).toggle();

        // console.log($(this).attr('id'));
    });

        $(".score").click(function(event) {
            var curContent = $(this).html();
            var upvoteCount = parseInt(curContent.split(" ")[1]) + 1;
            console.log(curContent);
            console.log(upvoteCount);
            $( this ).text("score: " + upvoteCount);

        });

        $(document).on('click', '.username-button', function() {
            var username = $("#username-input").val();
            console.log(username);
            $("#username-input").remove();
            $(".username-button").replaceWith("<div class='jenji'> Hi " + username + " <div class='change'>(change)</div></div>");
            $(".change").toggle();
        });

        $(document).on('click', '.reply-button', function() {
            var username = $("#username-input").val();
            $(".sub-reply").hide();
        });

        $(".change").click(function(event) {
            /* Act on the event */
            $(".jenji").replaceWith("<input id='username-input' type='text' name='' placeholder='type your name'> <button class='username-button' >change</button>");
            $(".change").toggle();
        });

        $(".username-button").click(function(event) {
            /* Act on the event */
            console.log("asdfasdfsd");

        });

        $(".upvote").click(function(event) {
            console.log('click...');
            $(this).remove();
        });

    }, 1000)
})
