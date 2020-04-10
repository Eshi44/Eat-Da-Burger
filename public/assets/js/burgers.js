$(function() {
    $(".change-devoured").on("click", function(event) {
      var id = $(this).data("id");
      console.log(id);
      var newlyDevoured = $(this).data("newlydevoured");
  
      var newlyDevouredBurger = {
        devoured: newlyDevoured
      };
  
      // send the PUT request
      $.ajax("/api/burgers/" + id, {
        type: "PUT",
        data: newlyDevouredBurger
      }).then(
        function() {
          console.log("changed devoured to", newlyDevoured);
          // reload the page to get the updated list
          location.reload();
        }
      );
    });
  
    $(".create-form").on("submit", function(event) {
      // make sure to preventDefault on a submit event
      event.preventDefault();
  
      var newBurger = {
        burger_name: $("#burger").val().trim(),
        devoured: false
        // $("[burger_name=devoured]:checked").val().trim()
      };
  
      // send the POST request
      $.ajax("/api/burgers", {
        type: "POST",
        data: newBurger
      }).then(
        function() {
          console.log("created new burger");
          // reload the page to get the updated list
          location.reload();
        }
      );
    });
  });