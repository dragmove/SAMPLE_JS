//global variables
var project = {};
( function() {
	requirejs.config({
		//By default load any module IDs from js/lib
		baseUrl : 'js',
		//except, if the module ID starts with "app",
		//load it from the js/app directory. paths
		//config is relative to the baseUrl, and
		//never includes a ".js" extension since
		//the paths config could be for a directory.
		paths : {
			com : './com',
			vendor : './vendor'
		}
	});

	// Start the main app logic.
	var importFileArr = new Array();
	importFileArr.push('jquery');
	requirejs(importFileArr, initialize);

	//variables
	var _this = this;

	function initialize($) {
		var _container;

		$(document).ready(function() {
			init();
		});
		function init() {
			_container = $(".container").get(0);
			console.log(window.twttr);

			twttr.ready(function(twttr) {
				twttr.widgets.createShareButton('http://benward.me', document.getElementById('shareButtonCreatedByJS'), function(el) {
					console.log("Button created.")
					console.log(el);
				}, {
					count : 'none',
					text : 'Sharing a URL using the Tweet Button'
				});

				twttr.widgets.createShareButton('endform', document.getElementById('tweetUserButtonCreatedByJS'), function(el) {
					console.log("Follow button created.")
					console.log(el);
				}, {
					size : 'large'
				});

				//check tweet event
				twttr.events.bind('tweet', function(event) {
					console.log("event.type :", event.type);
					console.log("event.target :", event.target);
					console.log("event.region :", event.region);
					console.log("event.data :", event.data);
				});

				twttr.events.bind('follow', function(event) {
					console.log("event.type :", event.type);
					console.log("event.target :", event.target);
					console.log("event.region :", event.region);
					console.log("event.data :", event.data);

					var followed_user_id = event.data.user_id;
					var followed_screen_name = event.data.screen_name;
					console.log("followed_user_id :", followed_user_id);
					console.log("followed_screen_name :", followed_screen_name);
				});

				twttr.events.bind('retweet', function(event) {
					var retweeted_tweet_id = event.data.source_tweet_id;
					console.log("retweeted_tweet_id :", retweeted_tweet_id);
				});

				twttr.events.bind('favorite', function(event) {
					var favorited_tweet_id = event.data.tweet_id;
					console.log("favorited_tweet_id :", favorited_tweet_id);
				});
			});
		}
	}
}());
