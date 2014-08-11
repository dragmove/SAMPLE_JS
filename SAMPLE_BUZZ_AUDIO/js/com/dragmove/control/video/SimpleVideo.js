/*
 * The MIT License
 *
 * Copyright (c) 2013 dragmove
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

define(function(require, exports, module) {
	/**
	 * SimpleVideo
	 * @class SimpleVideo
	 * @constructor
	 * 
	 * @example
	<!-- DOM -->
	<video id="thevideo"> <!-- use 'poster="img/videoPoster.png"' create error -_-); can view video playing --> 
		<source src="data/video/video_1.webm" type='video/webm' />
		<source src="data/video/video_1.mp4" type='video/mp4' />
		<source src="data/video/video_1.ogv" type='video/ogg' />
		don't support html5 video
	</video>
	
	<!-- JS -->
	var _simpleVideo;
		
	$(document).ready(function() {
		init();
	});
	
	function init() {
		var _video = $("#thevideo").get(0);
		
		_simpleVideo = new SimpleVideo();
		$(_simpleVideo).bind(_simpleVideo.CAN_PLAY_VIDEO, videoEventHandler);
		$(_simpleVideo).bind(_simpleVideo.CAN_PLAYTHROUGH_VIDEO, videoEventHandler);
		
		$(_simpleVideo).bind(_simpleVideo.PROGRESS_LOAD_VIDEO, videoEventHandler);
		$(_simpleVideo).bind(_simpleVideo.COMPLETE_LOAD_VIDEO, videoEventHandler);
		$(_simpleVideo).bind(_simpleVideo.ALERT_DISABLE_SEEK_TIME, videoEventHandler);
		
		_simpleVideo.init({
			video:_video
		});
		
		_simpleVideo.play();
	}
	
	function videoEventHandler($evt) {
		switch($evt.type) {
			case _simpleVideo.CAN_PLAY_VIDEO :
				console.log("CAN_PLAY_VIDEO");
			break;
			
			case _simpleVideo.CAN_PLAYTHROUGH_VIDEO :
				console.log("CAN_PLAYTHROUGH_VIDEO");
				_simpleVideo.play();
				
				TweenMax.delayedCall(2, function() {
					_simpleVideo.setVolume(0.2);
				});
			break;
			
			case _simpleVideo.PROGRESS_LOAD_VIDEO :
				console.log("$evt.percentage :", $evt.percentage);
			break;
			
			case _simpleVideo.COMPLETE_LOAD_VIDEO :
				console.log("COMPLETE_LOAD_VIDEO");
			break;
			
			case _simpleVideo.ALERT_DISABLE_SEEK_TIME :
				console.log("ALERT_DISABLE_SEEK_TIME");
			break;
		}
	}
	 */
	var SimpleVideo = function() {
		var _this = this;
		
		/*
		 * Event
		 */
		_this.CAN_PLAY_VIDEO = "SimpleVideo_CAN_PLAY_VIDEO";
		_this.CAN_PLAYTHROUGH_VIDEO = "SimpleVideo_CAN_PLAYTHROUGH_VIDEO";
		_this.PROGRESS_LOAD_VIDEO = "SimpleVideo_PROGRESS_LOAD_VIDEO";
		_this.COMPLETE_LOAD_VIDEO = "SimpleVideo_COMPLETE_LOAD_VIDEO";
		_this.DISABLE_SEEK_TIME = "SimpleVideo_DISABLE_SEEK_TIME";
		_this.ABORT = "SimpleVideo_ABORT";
		_this.ERROR = "SimpleVideo_ERROR";
		_this.WAITING = "SimpleVideo_WAITING";
		_this.PLAYING = "SimpleVideo_PLAYING";
		_this.ENDED = "SimpleVideo_ENDED";
		
		/**
		 * get video DOM
		 *
		 * @method getVideo
		 * @return {DOM} Returns Video DOM
		 */
		_this.getVideo = function() {
			return _video;
		}
		
		/**
		 * get download percentage(0 ~ 1)
		 *
		 * @method getDownloadPercentage
		 * @return {Number} Returns Number(0 ~ 1)
		 */
		_this.getDownloadPercentage = function() {
			var _downloadPercentage = parseInt( _video.buffered.end(0) / _video.duration );
			return _downloadPercentage;
		};
		
		/**
		 * get video duration
		 *
		 * @method getDuration
		 * @return {Number} Returns Number
		 */
		_this.getDuration = function() {
			return _video.duration;
		};
		
		/**
		 * get video currentTime
		 *
		 * @method getCurrentTime
		 * @return {Number} Returns Number
		 */
		_this.getCurrentTime = function() {
			return _video.currentTime;
		};
		
		/**
		 * get video ended
		 *
		 * @method getEnded
		 * @return {Boolean} Returns true or false
		 */
		_this.getEnded = function() {
			return _video.ended;
		};
		
		/**
		 * get video muted
		 *
		 * @method getMuted
		 * @return {Boolean} Returns true or false
		 */
		_this.getMuted = function() {
			return _video.muted;
		};
		
		/**
		 * get video paused
		 *
		 * @method getPaused
		 * @return {Boolean} Returns true or false
		 */
		_this.getPaused = function() {
			return _video.paused;
		};
		
		/**
		 * get video volume (0 ~ 1)
		 *
		 * @method getVolume
		 * @return {Number} Returns Number(0 ~ 1)
		 */
		_this.getVolume = function() {
			return _video.volume;
		};
		
		/**
		 * pause video
		 *
		 * @method pause
		 * @return {Void}
		 */
		_this.pause = function() {
			_video.pause();
		};
		
		/**
		 * play video
		 *
		 * @method play
		 * @return {Void}
		 */
		_this.play = function() {
			/*
			if(!flag_canPlayVideo) {
				console.log("1. play cant");
				return;
			}
			if(!flag_canPlayThrough) {
				console.log("2. play cant");
				return;
			} 
			*/
			if(_video) _video.play();
		};
		
		/**
		 * stop video
		 *
		 * @method stop
		 * @return {Void}
		 */
		_this.stop = function() {
			_video.pause();
			_video.currentTime = 0;
		};
		
		/**
		 * seek video
		 *
		 * @method seekTime
		 * @param {Number} seekTime 
		 * @return {Void}
		 */
		_this.seekTime = function(seekTime) {
			try {
				if(seekTime <= 0) seekTime = 0;
				if(seekTime >= _video.duration) seekTime = _video.duration;
				_video.currentTime = seekTime;
			} catch(error) {
				//require devolop
				$(_this).trigger({
					type:_this.DISABLE_SEEK_TIME
				});
			}
		};
		
		/**
		 * mute video
		 *
		 * @method setMute
		 * @param {Boolean} flag true or false 
		 * @return {Void}
		 */
		_this.setMute = function(flag) {
			_video.muted = flag;
		};
		
		/**
		 * set video volume
		 *
		 * @method setVolume
		 * @param {Number} volume video volume(0 ~ 1) 
		 * @return {Void}
		 */
		_this.setVolume = function(volume) {
			if(volume <= 0) volume = 0;
			if(volume >= 1) volume = 1;
			_video.volume = volume;
		};
		
		/*
		 * private variables
		 */
		//var flag_canPlayThrough = false;
		//var flag_canPlayVideo = false;
		var _video = null;
		var downloadPercentage = 0;
		
		/**
		 * init SimpleVideo instance. {video:video DOM}
		 *
		 * @method init
		 * @param {Object} object Objecct include video argument 
		 * @return {Void}
		 */
		_this.init = function(object) {
			_video = object.video;
			if(!_video) {
				throw new Error("init() method parameter object.video is undefined.");
				return;
			}
			
			//loadStart, progress, suspend, abort, error, emptied, stalled, loadedmetadata,
			//loadeddata, canplay, canplaythrough, playing, waiting, seeking, seeked, ended, 
			//durationchange, timeupdate, play, pause, ratechange, volumechange
			$(_video).bind("progress", progressStatusCheckHandler);
			$(_video).bind("canplay", canPlayHandler);
			$(_video).bind("canplaythrough", canPlayThroughCheckHandler); //chrome don't trigger this event
			$(_video).bind("abort", videoEventHandler);
			$(_video).bind("error", videoEventHandler);
			$(_video).bind("waiting", videoEventHandler);
			$(_video).bind("playing", videoEventHandler);
			$(_video).bind("ended", videoEventHandler);
		};
		
		/**
		 * destroy SimpleVideo instance
		 *
		 * @method init
		 * @return {Void}
		 */
		_this.destroy = function() {
			if(_video) {
				$(_video).unbind("progress", progressStatusCheckHandler);
				$(_video).unbind("canplay", canPlayHandler);
				$(_video).unbind("canplaythrough", canPlayThroughCheckHandler); //chrome don't trigger this event
				_video = null;
			}
			//flag_canPlayThrough = false;
			//flag_canPlayVideo = false;
			downloadPercentage = 0;
		};
		
		function progressStatusCheckHandler() {
			downloadPercentage = parseInt( _video.buffered.end(0) / _video.duration );
			$(_this).trigger({
				type:_this.PROGRESS_LOAD_VIDEO,
				percentage:downloadPercentage
			});
			
			if(downloadPercentage >= 1) {
				$(_this).trigger({
					type:_this.COMPLETE_LOAD_VIDEO
				});
			}
		}
		
		function canPlayHandler() {
			//if(flag_canPlayVideo) return;
			//flag_canPlayVideo = true;
			
			$(_this).trigger({
				type:_this.CAN_PLAY_VIDEO
			});
		}
		
		function canPlayThroughCheckHandler() {
			//chrome don't trigger this event
			
			//if(flag_canPlayThrough) return;
			//flag_canPlayThrough = true; 
			
			$(_this).trigger({
				type:_this.CAN_PLAYTHROUGH_VIDEO
			});
		}
		
		function videoEventHandler(evt) {
			switch(evt.type) {
				case "abort" :
					$(_this).trigger({
						type:_this.ABORT
					});
				break;
				
				case "error" :
					$(_this).trigger({
						type:_this.ERROR
					});
				break;
				
				case "waiting" :
					$(_this).trigger({
						type:_this.WAITING
					});
				break;
				
				case "playing" :
					$(_this).trigger({
						type:_this.PLAYING
					});
				break;
				
				case "ended" :
					$(_this).trigger({
						type:_this.ENDED
					});
				break;
			}
		}
		
		return _this;
	};
	
	return SimpleVideo;
});
