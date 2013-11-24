var hype = require('../models/hype-model')

module.exports = Backbone.Collection.extend({
	model: hype,
    url: function(){
        return 'http://hypem.com/playlist/loved/' + HYPE_USERNAME + '/json/1/data.js';
    },
    parse: function(response) {

    	var hypes = [];
    	_.each(response, function(hype){
    		if(hype.title) hypes.push(hype);
    	});
		return hypes;
	}
});