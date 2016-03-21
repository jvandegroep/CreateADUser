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

    //Show previewfield when the 'initials' input field is pressed.
    $("#initials").change(function(){
        $("#previewField").show("slow");
    });

    //Show statusrequestCon when submit button is clicked.
    $("#button1").click(function(){
        $("#requestStatusCon").show("slow");
    });
});
