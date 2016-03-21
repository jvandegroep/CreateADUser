/////////////////////////////////////////////////////////////////////////////////////
//
// Execute funtions based on user key-events
//
$(document).ready(function(){
    //execute function on keyup in form so user sees while typing.
    $("input").change(function(){
        PreviewUserInput();

        //if initials element has a value check the username.
        if (document.getElementById('initials').value) {
          checkUserName();

          //if element is checked check eu account.
          if (document.getElementById('CreateEUaccount').checked) {
            checkEUAccount();
          }
        }
    });

    $(window).scroll(function() {
      $(".slideanim").each(function(){
        var pos = $(this).offset().top;

        var winTop = $(window).scrollTop();
        if (pos < winTop + 600) {
          $(this).addClass("slide");
        }
      });
    });

    //Show previewfield when the 'initials' input field is pressed.
    $("#initials").change(function(){
        $("#previewField").fadeIn("slow");
    });

    //Show statusrequestCon when submit button is clicked.
    $("#button1").click(function(){
        $("#requestStatusCon").fadeIn("slow");
    });
});
