module.exports = Backbone.Model.extend({
	defaults:{
        soundcloud_id: false,
        soundcloud_permalink_url: false,
        status: 'searching',
        soundcloud_like: null,
        soundcloud_follow: null,
        soundcloud_user_permalink_url: false,
    },
    idAttribute : 'mediaid',
    urlRoot: function(){ 
        return 'http://hypem.com/playlist/loved/' + HYPE_USERNAME + '/json/1/data.js';
    },
});