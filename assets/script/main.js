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
      var upcomingEventsNumber = $("#num-of-tour-dates").text(response.upcoming_event_count + " upcoming events");
    });

    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    $.ajax({
      url:queryURL,
      method:"GET"
    }).done(function(response){
      console.log(response);

      for (const event in response) {
        if (response.hasOwnProperty(event)) {
          const element = response[event];
          console.log(element.venue.name);
          
        }
      }
      
      $("#go-to-tour-dates").append("<div>" + event + "</div>");
    });
  }
  
  $("#select-artist").on("click", function(event) {
    event.preventDefault();
    var artist = $("#artist-input").val().trim();

    searchBandsInTown(artist);
  });

  function searchLastFM(artist) {
    var queryURLLastFM = "http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=" + artist +"&api_key=be77dd88db13854a4b6bcbd5d6a75bee&format=json";
    
    $.ajax({
      url:queryURLLastFM,
      method:"GET"
    }).done(function(response){
      console.log(response);
      var songsArray = response.toptracks.track;
      var songs = [];
      $("#top-five-songs").text('');
      

      for (var i = 0; i < 5; i++) {
        console.log("*" + songsArray[i].name);
        var song = songsArray[i].name;
        songs.push(song);
        $("#top-five-songs").append("<div>" + song + "</div>");
    }
    });

    var queryURLLastFMBio = "http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist="+ artist +"&api_key=be77dd88db13854a4b6bcbd5d6a75bee&format=json"

    $.ajax({
      url:queryURLLastFMBio,
      method:"GET"
    }).done(function(response){
      console.log(response);
      var artistBio = $("#bio").text(response.artist.bio.summary);
    }); 

    var queryURLLastFMRelated = "http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=" + artist + "&api_key=be77dd88db13854a4b6bcbd5d6a75bee&format=json";
    
    $.ajax({
      url:queryURLLastFMRelated,
      method:"GET"
    }).done(function(response){
      console.log(response);
      var relatedArray = response.similarartists.artist;
      var relatedArrayEmpty = [];
      $("#related-artist").text('');
      
      for (var i = 0; i < 5; i++) {
        console.log("*" + relatedArray[i].name);
        var relatedArtist = relatedArray[i].name;
        relatedArrayEmpty.push(relatedArtist);
        $("#related-artist").append("<div>" + relatedArtist + "</div>");
    }
      
    });

  }
  
  $("#select-artist").on("click", function(event) {
    event.preventDefault();
    var artist = $("#artist-input").val().trim();

    searchLastFM(artist);
  });