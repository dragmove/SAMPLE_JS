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
	 * MovieClip - set display property none, block to added node. (TEST COMPLETE - IE7,8,9,10, Chrome, Firefox, Safari, mobile Safari. iphone4, ipad3, galaxyS3, galaxyTab2 7.0) 
	 * @class MovieClip
	 * @constructor
	 * 
	 * @example
	<!-- DOM -->
	<div class="container">
		<img class="sequence_1" src="img/seq_1.png" alt="" />
		<img class="sequence_2" src="img/seq_2.png" alt="" />
		<img class="sequence_3" src="img/seq_3.png" alt="" />
		<img class="sequence_4" src="img/seq_4.png" alt="" />
		<img class="sequence_5" src="img/seq_5.png" alt="" />
		<img class="sequence_6" src="img/seq_6.png" alt="" />
		<img class="sequence_7" src="img/seq_7.png" alt="" />
		<img class="sequence_8" src="img/seq_8.png" alt="" />
		<img class="sequence_9" src="img/seq_9.png" alt="" />
		<img class="sequence_10" src="img/seq_10.png" alt="" />
	</div>
	<div id="movieClipContainer">
	</div>
	
	// init -> setDisplayPropertyValue -> addFrameNode -> gotoAndStop(1) -> use instance method
	
	var _imageLoader;
	var _$container;
	var _movieClip;
	
	$(document).ready(function() {
		init();
	});
	
	function init() {
		_$container = $(".container");
		
		_imageLoader = new ImageLoader();
		$(_imageLoader).bind(_imageLoader.LOAD_COMPLETE, imageLoaderHandler);
		$(_imageLoader).bind(_imageLoader.LOAD_PER_COMPLETE, imageLoaderHandler);
		$(_imageLoader).bind(_imageLoader.LOAD_ERROR, imageLoaderHandler);
		_imageLoader.init();
		
		var imgArr = $("img", _$container);
		var _img;
		for(var i=0, max=imgArr.length; i<max; i++) {
			_img = imgArr[i];
			_imageLoader.addURL(_img.src);
		}
		_imageLoader.start();
	}
	
	function imageLoaderHandler($evt) {
		switch($evt.type) {
			case _imageLoader.LOAD_COMPLETE :
				Debug.log("LOAD_COMPLETE")
				setMovieClip();
			break;
			
			case _imageLoader.LOAD_PER_COMPLETE :
			break;
			
			case _imageLoader.LOAD_ERROR :
			break;
		}
	}
	
	function setMovieClip() {
		_movieClip = new MovieClip();
		_movieClip.init();
		_movieClip.setDisplayPropertyValue("inline");
		
		var _movieClipContainer = $("#movieClipContainer").get(0);
		var imageArr = _imageLoader.getLoadedImageArr();
		var _image;
		for(var i=0, max=imageArr.length; i<max; i++) {
			_image = imageArr[i];
			_image.style.display = "none";
			_movieClipContainer.appendChild(_image);
			
			_movieClip.addFrameNode(_image);
		}
		_movieClip.gotoAndStop(1);
		
		TweenMax.delayedCall(3, function() {
			_movieClip.play();
		});
		
		TweenMax.delayedCall(4, function() {
			_movieClip.rewind();
		});
	}
	 */
	var MovieClip = function() {
		var _this = this;
		
		var SimpleTimer = function(_gapTime, _callbackScope, _callbackFunc, _callbackFuncArgumentsArr) {
			var _this = this;
	
			//variables
			var gapTime = _gapTime;
			var callbackScope = _callbackScope;
			var callbackFunc = _callbackFunc;
			var callbackFuncArgumentsArr = _callbackFuncArgumentsArr;
			var _timer;
			
			//setTimeout
			var flag_protectRepeatTimeout = false;
	
			//public function
			_this.destroy = function() {
				destroyInternalTimer();
				gapTime = null;
				callbackScope = null;
				callbackFunc = null;
				callbackFuncArgumentsArr = null;
				_timer = null;
				flag_protectRepeatTimeout = false;
			};
	
			_this.start = function() {
				destroyInternalTimer();
				_timer = setTimeout(performTimeout, gapTime);
				flag_protectRepeatTimeout = true;
			};
	
			_this.stop = function() {
				flag_protectRepeatTimeout = false;
				destroyInternalTimer();
			};
			
			//private function
			function performTimeout() {
				if(!callbackFuncArgumentsArr) {
					_callbackFunc.call(callbackScope);
				} else {
					_callbackFunc.apply(callbackScope, callbackFuncArgumentsArr);
				}
				repeatTimeout();
			}
	
			function repeatTimeout() {
				if(!flag_protectRepeatTimeout)
					return;
				destroyInternalTimer();
				_timer = setTimeout(performTimeout, gapTime);
			}
	
			function destroyInternalTimer() {
				if(_timer) {
					clearTimeout(_timer);
					_timer = null;
				}
			}
			
			return _this;
		};
		
		/**
		 * get totalFrame
		 *
		 * @method getTotalFrames
		 */
		_this.getTotalFrames = function() {
			return frameNodeArr.length;
		};
		
		/**
		 * get currentFrame
		 *
		 * @method getCurrentFrame
		 */
		_this.getCurrentFrame = function() {
			return currentFrame;
		};
		
		var DEFAULT_FRAMERATE = 30;
		var DEFAULT_DISPLAY_PROPERTY_VALUE = "block";
		
		var frameNodeArr;
		var framerate = DEFAULT_FRAMERATE;
		var currentFrame = 1;
		var displayPropertyStr = DEFAULT_DISPLAY_PROPERTY_VALUE;
		var _timer;
		
		/**
		 * destroy instance 
		 *
		 * @method destroy
		 */
		_this.destroy = function() {
			_removeTimer();
			frameNodeArr = null;
			framerate = DEFAULT_FRAMERATE;
			currentFrame = 1;
		};
		
		/**
		 * initialize instance 
		 *
		 * @method init
		 */
		_this.init = function() {
			frameNodeArr = [];
		};
		
		/**
		 * set display property value opposite to "none" value 
		 *
		 * @method setDisplayPropertyValue
		 * @param {String} _displayValueStr display property - set "block", "inline", "inline-block", "inherit". except "none" property
		 */
		_this.setDisplayPropertyValue = function(_displayValueStr) {
			displayPropertyStr = _displayValueStr;
		}
		
		/**
		 * set frameRate 
		 *
		 * @method setFramerate
		 * @param {Number} _framerate frameRate number
		 */
		_this.setFramerate = function(_framerate) {
			framerate = _framerate;
		};
		
		/**
		 * add frame DOM element 
		 *
		 * @method addFrameNode
		 * @param {DOM} _frameNode DOM element to add
		 */
		_this.addFrameNode = function(_frameNode) {
			frameNodeArr.push(_frameNode);
		}
		
		/**
		 * gotoAndStop 
		 *
		 * @method gotoAndStop
		 * @param {Number} _frame frame number
		 */
		_this.gotoAndStop = function(_frame) {
			_gotoAndStop(_frame);
		};
		
		/**
		 * nextFrame 
		 *
		 * @method nextFrame
		 */
		_this.nextFrame = function() {
			_nextFrame();
		};
		
		/**
		 * prevFrame 
		 *
		 * @method prevFrame
		 */
		_this.prevFrame = function() {
			_prevFrame();
		};
		
		/**
		 * gotoAndPlay 
		 *
		 * @method gotoAndPlay
		 * @param {Number} _frame frame number
		 */
		_this.gotoAndPlay = function(_frame) {
			_gotoAndStop(_frame);
			_removeTimer();
			_timer = new SimpleTimer(framerate, _this, _nextFrame, [true]);
			if(_timer) _timer.start();
		};
		
		/**
		 * play 
		 *
		 * @method play
		 */
		_this.play = function() {
			_removeTimer();
			_timer = new SimpleTimer(framerate, _this, _nextFrame, [true]);
			if(_timer) _timer.start();
		};
		
		/**
		 * stop 
		 *
		 * @method stop
		 */
		_this.stop = function() {
			if(_timer) _timer.stop();
		};
		
		/**
		 * rewind 
		 *
		 * @method rewind
		 */
		_this.rewind = function() {
			_removeTimer();
			_timer = new SimpleTimer(framerate, _this, _prevFrame, [true]);
			if(_timer) _timer.start();
		};
		
		/**
		 * loop 
		 *
		 * @method loop
		 */
		_this.loop = function() {
			_removeTimer();
			_timer = new SimpleTimer(framerate, _this, _loop, [true]);
			if(_timer) _timer.start();
		};
		
		function _loop() {
			currentFrame++;
			if(currentFrame > frameNodeArr.length) {
				currentFrame = 1;
			}
			_displayFrame(currentFrame);
		}
		
		function _gotoAndStop(frame) {
			currentFrame = frame;
			if(currentFrame <= 0) currentFrame = 1;
			if(currentFrame >= frameNodeArr.length) currentFrame = frameNodeArr.length;
			_displayFrame(currentFrame);
		}
		
		function _prevFrame(flag_stopTimerOnFirstFrame) {
			currentFrame--;
			if(currentFrame <= 0) {
				currentFrame = 1;
				if(flag_stopTimerOnFirstFrame) {
					if(_timer) _timer.stop();
				}
			}
			_displayFrame(currentFrame);
		}
		
		function _nextFrame(flag_stopTimerOnLastFrame) {
			currentFrame++;
			if(currentFrame >= frameNodeArr.length) {
				currentFrame = frameNodeArr.length;
				if(flag_stopTimerOnLastFrame) {
					if(_timer) _timer.stop();
				}
			}
			_displayFrame(currentFrame);
		}
		
		function _displayFrame(frame) {
			var _node;
			for(var i=0, max=frameNodeArr.length; i<max; i++) {
				_node = frameNodeArr[i];
				_node.style.display = "none";
			}
			_node = frameNodeArr[frame - 1];
			_node.style.display = displayPropertyStr;
		}
		
		function _removeTimer() {
			if(_timer) {
				_timer.destroy();
				_timer = null;
			}
		}
		
		return _this;
	};
	
	return MovieClip;
});
