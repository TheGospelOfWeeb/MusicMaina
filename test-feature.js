// function testFeature() {
//     console.log('Hello World!');
// }


// var request = require("request");
var user_id = "Akmal";
var token = "Bearer BQBk--ubooAMPnqYBfP0Xn830wcaUal2MrQk3tMhwVnrMT25oDk9caYPMMxtA9KZ53NlOXjh3d2wbIxYBfqmzrZIVzAYGUJTeL5-msvtcKi9hstJcoItrtL6ptVxW9cmTCO1aDonWW0XWsaxN-zX7yfWmvAzg_uhX1qL";
var playlist_url = "https://api.spotify.com/v1/users/" + user_id + "/playlists";

$.ajax({ url: playlist_url, headers: { "Authorization": token }, method: 'GET' }).then( function (err, res) {
    console.log(res.body);
    if (res) {
        var playlists = JSON.parse(res.body);
        var playlist_url = playlists.items[0].href
        $.ajax({ url: playlist_url, headers: { "Authorization": token } }).then( function (err, res) {
            if (res) {
                var playlist = JSON.parse(res.body);
                console.log("plaulist" + playlist.name);
                playlist.tracks.items.forEach(function (track){
                    console.log(track.track.name);
                    $('#track-div').append(`<p id="${track.track.name}>${track.track.name}</p>`);
                });
            }

        })

    }
})



//   https://accounts.spotify.com/authorize