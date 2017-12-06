$(document).ready(function(){
    var counter = 0;

    $(".sub-reply").hide();
    $(".left-blocked").hide();
    $(".right-blocked").hide();
    $(".left-input").hide();
    $(".right-input").hide();

    $("#agree-button").click(function(event) {
        /* Act on the event */
        $(".blur").toggleClass('blur');
        $(".hidden-content").hide();
        $(".left-input").show();
        $(".right-blocked").show();
    });

    $("#disagree-button").click(function(event) {
        /* Act on the event */
        $(".blur").toggleClass('blur');
        $(".hidden-content").hide();
        $(".right-input").show();
        $(".left-blocked").show();
    });

    $(".reply").click(function(event) {
        /* Act on the event */
        console.log("hello");
        var cls = $(event.target).attr('class').split(" ")[1];
        console.log(cls);
        // $(".reply").hide();
        $("#" + cls.toString()).toggle();

        // console.log($(this).attr('id'));
    });

})