function getPlaylist(access_token, user_id) {
    console.log('getPlaylist');
    $.ajax({ url: "https://api.spotify.com/v1/users/" + user_id + "/playlists", headers: { "Authorization": 'Bearer ' + access_token }, method: 'GET' }).then(function(res, err) {
        console.log('res: ', res);
        console.log('err: ', err);
        console.log('res.href: ', res.items[0].href);
        if (res) {
            // var playlists = JSON.parse(res.body);
            var playlist_url = res.items[0].href
            $.ajax({ url: playlist_url, headers: { "Authorization": 'Bearer ' + access_token } }).then(function(res, err) {
                if (res) {
                    console.log(res.tracks.items);
                    res.tracks.items.forEach(function(track) {
                        console.log(track.track.name);
                        let trackEl = `
                        <div class="track-el">
                        <p id="${track.track.name}">${track.track.name}</p>
                        <iframe src="https://open.spotify.com/embed/track/${track.track.id}" width="200" height="280" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
                        </div>`
                        $('#track-div').append(trackEl);
                    });
                    $('#track-div').show();
                }

            })

        }
    })
}

(function() {
    var stateKey = 'spotify_auth_state';
    /**
     * Obtains parameters from the hash of the URL
     * @return Object
     */
    function getHashParams() {
        var hashParams = {};
        var e, r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1);
        while (e = r.exec(q)) {
            hashParams[e[1]] = decodeURIComponent(e[2]);
        }
        return hashParams;
    }
    /**
     * Generates a random string containing numbers and letters
     * @param  {number} length The length of the string
     * @return {string} The generated string
     */
    function generateRandomString(length) {
        var text = '';
        var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    };
    var userProfileSource = document.getElementById('user-profile-template').innerHTML,
        userProfileTemplate = Handlebars.compile(userProfileSource),
        userProfilePlaceholder = document.getElementById('user-profile');
    oauthSource = document.getElementById('oauth-template').innerHTML,
        oauthTemplate = Handlebars.compile(oauthSource),
        oauthPlaceholder = document.getElementById('oauth');
    var params = getHashParams();
    var access_token = params.access_token,
        state = params.state,
        storedState = localStorage.getItem(stateKey);
    if (access_token && (state == null || state !== storedState)) {
        console.log('There was an error during the authentication');
    } else {
        localStorage.removeItem(stateKey);
        if (access_token) {
            $.ajax({
                url: 'https://api.spotify.com/v1/me',
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function(response) {
                    userProfilePlaceholder.innerHTML = userProfileTemplate(response);
                    console.log(response);
                    console.log(access_token);
                    $('#login').hide();
                    $('#loggedin').show();
                    getPlaylist(access_token, response.display_name);
                    localStorage.setItem(stateKey, state);
                }
            });
        } else {
            $('#login').show();
            $('#loggedin').hide();
        }
        document.getElementById('login-button').addEventListener('click', function() {
            var client_id = 'bdda5a905c86440392f593d9019ac9f1'; // Your client id
            var redirect_uri = 'https://tacticalloli.github.io/spotify.html'; // Your redirect uri

            //var redirect_uri = 'http://127.0.0.1:5500/spotify.html'; // Your redirect uri
            var state = generateRandomString(16);
            localStorage.setItem(stateKey, state);
            var scope = 'user-read-private user-read-email';
            var url = 'https://accounts.spotify.com/authorize';
            url += '?response_type=token';
            url += '&client_id=' + encodeURIComponent(client_id);
            url += '&scope=' + encodeURIComponent(scope);
            url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
            url += '&state=' + encodeURIComponent(state);
            window.location = url;
        }, false);
    }
})();