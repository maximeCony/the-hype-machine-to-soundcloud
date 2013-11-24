 /* jshint globalstrict: true, node: true, unused:false */
"use strict";

var SoundCloudStrategy = require('passport-soundcloud').Strategy
, env = require('require-env')
, redis = require('redis')
, client = redis.createClient()
, SERVER_URL = env.require('SERVER_URL')
, SOUNDCLOUD_CLIENT_ID = env.require('SOUNDCLOUD_CLIENT_ID')
, SOUNDCLOUD_CLIENT_SECRET = env.require('SOUNDCLOUD_CLIENT_SECRET');

module.exports = function(passport){

    passport.use(new SoundCloudStrategy({
        clientID: SOUNDCLOUD_CLIENT_ID,
        clientSecret: SOUNDCLOUD_CLIENT_SECRET,
        callbackURL: SERVER_URL + "/auth/soundcloud/callback",
        scope: ['non-expiring'],
    },
    function(accessToken, refreshToken, profile, callback) {

        var user = {
            soundcloud_id: profile._json.id,
            username: profile._json.username,
            avatar_url: profile._json.avatar_url,
        }
        client.set(profile._json.id, JSON.stringify(user));
        callback(null, user);
    }
    ));

    passport.serializeUser(function(user, callback) {
        callback(null, user.soundcloud_id);
    });

    passport.deserializeUser(function(id, callback) {
        
        client.get(id, function(err, str){
            callback(null, JSON.parse(str));
        });
    });

    return passport;
};