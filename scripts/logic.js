/*Instructions/Pseudou Code


1. Before you can make any part of our site work, 
   you need to create an array of strings, each one 
   related to a topic that interests you. Save it to a variable called `topics`.

   * We chose animals for our theme, but you can make a list to your own liking.


2. Your app should take the topics in this array and create buttons in your HTML.

   * Try using a loop that appends a button for each string in the array.


3. When the user clicks on a button, the page should grab 10 static, 
   non-animated gif images from the GIPHY API and place them on the page.


4. When the user clicks one of the still GIPHY images, the gif should animate. 
   If the user clicks the gif again, it should stop playing.


5. Under every gif, display its rating (PG, G, so on).

   * This data is provided by the GIPHY API.

   * Only once you get images displaying with button presses 
     should you move on to the next step.


6. Add a form to your page takes the value from a user input box 
and adds it into your `topics` array. Then make a function call 
that takes each topic in the array remakes the buttons on the page.

*/
$(document).ready(function(){
    var topics= ["Dogs", "Cats", "Frogs"]

    topics.forEach(function(topic) {
        $('#animalsbuttons').append(
            $('<button></button>')
                .addClass('btn accent animal')
                .attr('data-name', topic)
                .text(topic)
        )
    })

    $('#animalsbuttons').on('click', 'button', function() {
        var animal = $(this).data('name');
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=FVHvQ189qRgSQExgFwam0ptBLhcd9KVC&limit=10";

        $.ajax({
            url: queryURL,
            method: 'GET'
        })
        .done(function(response) {
            response.data
                .forEach(function(result) {
                    var p = '<p>'+result.rating+'<p/>'
                    var animalImage = $('<img/>')
                        .addClass('anImg')
                        .attr('data-src', result.images.fixed_height.url)
                        .attr('data-still', result.images.fixed_height_still.url)
                        .attr('data-animate', result.images.fixed_height.url)
                        .attr('src', result.images.fixed_height_still.url)
                        .attr('data-state', 'still')

                    $('#gifs')
                        .prepend(p)
                        .prepend(animalImage[0]);
                })
        });
    });

    $('#gifs').on('click', '.anImg', function() {
        var state = $(this).attr('data-state'); 

        if (state == 'still') {
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }      
    });

    $('#theButton').on('click', function() {
        var inputVal = $('#gif-input').val()
        $('#animalsbuttons').append(
            $('<button></button>')
                .addClass('btn accent animal')
                .attr('data-name', inputVal)
                .text(inputVal)
        )
    })
})