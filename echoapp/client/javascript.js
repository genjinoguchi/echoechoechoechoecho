$(document).ready(function(){
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

    $(".change").click(function(event) {
        /* Act on the event */
        $(".jenji").replaceWith("<input class='username-input' type='text' name='' placeholder='type your name'> <button class='username-button' >change</button>");
    });



})