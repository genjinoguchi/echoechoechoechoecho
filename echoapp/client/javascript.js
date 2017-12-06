$(document).ready(function(){
    var counter = 0;

    $(".sub-reply").hide();

    $("#agree-button").click(function(event) {
        /* Act on the event */
        $(".blur").toggleClass('blur');
        $(".hidden-content").hide();
        console.log(counter);
        counter = counter + 1;
    });

    $("#disagree-button").click(function(event) {
        /* Act on the event */
        $(".blur").toggleClass('blur');
        $(".hidden-content").hide();
    });


    $(".reply").click(function(event) {
        /* Act on the event */
        console.log("hello");
        console.log(event.target.id);
        var id = event.target.id;
        $("." + id.toString()).toggle();
        $("#" + id.toString()).toggleClass('reply-active');
        // console.log($(this).attr('id'));
    });

})