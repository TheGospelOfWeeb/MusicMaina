function searchBandsInTown(artist) {
    
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "?app_id=codingbootcamp";
    $.ajax({
      url:queryURL,
      method:"GET"
    }).done(function(response){
      console.log(response);
      var artistName = $("#artist-name").text(response.name);
      var artistImage = $("#artist-image").attr("src", response.thumb_url);
      var trackerCount = $("#tracker-num").text(response.tracker_count + " fans tracking");
      var upcomingEvents = $("#num-of-tour-dates").text(response.upcoming_event_count + " upcoming events");
    });
  }
  
  $("#select-artist").on("click", function(event) {
    event.preventDefault();
    var artist = $("#artist-input").val().trim();

    searchBandsInTown(artist);
  });