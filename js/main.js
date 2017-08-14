/*global $, console, document*/

$(document).ready(function () {
    
    "use strict";
    
    // load the home page on page load:
    $(".container").load("./partials/home.html");
    
            
        // validate your form here...
        function handleSuccess(response) {
        
        // pass the data from server-side to <div class="container">
        $(".feedback").html(response);
        
        // clear your form:
        $("#full-name").val("");
        $("#email").val("");
        $("#subject").val("");
        $("#message").val("");
    }
    
    function handleError(jqXHR, textStatus, errorThrown) {
        console.log("textStatus = " + textStatus + "\n" +
                    "errorThrown = " + errorThrown);
    }
    
    
    
    function handleForm(event) {
        
        // Make sure form doesn't get submitted!
        // We are going to use ajax request instead.
        event.preventDefault();
        
        /*
        LEGEND:
        fn stands for full-name
        em stands for email 
        err stands for error (array)
        dt stands for data (object) */ 
        var fn, em, sb, ms, err, dt, regex;
        
        
        regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        
        $(".feedback").html("");
        
        
        err = [];
        
        dt = {};
        
        
        
        // collect the user input in variables
        fn = $("#full-name").val();
        em = $("#email").val();
        sb = $("#subject").val();
        ms = $("#message").val();
        
        
        
        
        // validate full name:
        if (fn === "") {
            
            err.push("<p>Full name?</p>");
            
        } else {
            
            dt.fullname = fn;
        }
        
        
        // validate email:
        if (em === "") {
            
            err.push("<p>Email?</p>");
            
        } else {
            
            // regex.test() returns true or false
            if (regex.test(em)) {
                
                dt.email = em;
                
            } else {
                
                err.push("<p>Invalid Email!");
                
                // remove invalid email from text-field
                $("#email").val("");
                em = "";
            }
        }
        
        // validate subject
        if (sb === "") {
            err.push("<p>Please enter a subject?</p>"); 
        } else {
            
            dt.subject = sb;
        }
        
        // validate message
        if (ms === "") {
            err.push("<p>Please enter a message?</p>");
            
        } else {
            dt.message = ms;
        }
        
        
        
        
        // create feedback
        if (err.length === 0) {
            
            // console.log("Data is ready to be sent", dt);
            
            $.ajax({
                type: "POST",
                url: "./web-services/script.php",
                data: dt,
                dataType: "html"
            }).done(handleSuccess).fail(handleError);
            
        } else {
            
            // console.log(err);
            // Reference: https://api.jquery.com/each/
            $.each(err, function (i, v) {
                
                // print the errors inside <div class="container">
                $(".feedback").append(v);
            });
        }
    }
            
        

    
    
    
    
    $("navbar button").on("click", function () {
          
        if ($(this).text() === "Home") {
            
            $(".container").load("./partials/home.html");
            
        } else {
            
            $(".container").load("./partials/contact.html", function () {
                
                $("form").on("submit", handleForm);
            });
        }
    }); 
});

