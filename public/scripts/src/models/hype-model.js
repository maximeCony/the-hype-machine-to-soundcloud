module.exports = Backbone.Model.extend({
    urlRoot: function(){ 
        return 'http://hypem.com/playlist/loved/' + HYPE_USERNAME + '/json/1/data.js';
    },
});