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
	 * ClipRectMask
	 * @class ClipRectMask
	 * @constructor
	 * 
	 * @example
	<!-- DOM -->
	<div class="container">
		<img class="clipRectImage" src="img/seq_1.png" alt="" width="112" height="112" />
	</div>
	
	<!-- CSS -->
	.container {
		position:absolute; //position property must set "absolute"
		width:112px;
		height:112px;
	}
	.clipRectImage {
		position:relative;
	}
	
	<!-- JS -->
	var _container;
	var _clipRectMask;
	
	$(document).ready(function() {
		init();
	});
	
	function init() {
		_container = $(".container").get(0);
		
		_clipRectMask = new ClipRectMask();
		$(_clipRectMask).bind(_clipRectMask.COMPLETE, completeClipRectMaskMotion);
		
		_clipRectMask.init({
			target:_container,
			type:ClipRectMask.CENTER_TO_EDGE
		});
		
		_clipRectMask.start({
			delay:0,
			speed:1,
			easeStr:"Quint.easeOut"
		});
	}
	
	function completeClipRectMaskMotion($evt) {
		switch($evt.type) {
			case _clipRectMask.COMPLETE :
				console.log("completeClipRectMaskMotion");
			break;
		}
	}
	 */
	var ClipRectMask = function() {
		var _this = this;
		
		/**
		* ClipRectMask instance motion complete event
		* 
		* @property COMPLETE
		* @type {String}
		* @default "ClipRectMask_COMPLETE"
		*/
		_this.COMPLETE = "ClipRectMask_COMPLETE";
		
		/**
		 * start ClipRectMask motion
		 *
		 * @method start
		 * @param {Object} object Object include delay, speed, TweenMax easeStr. ex) {delay:0, speed:1, easeStr:"Quint.easeOut"}
		 * @return {Void}
		 */
		_this.start = function(object) {
			var delay = (object.delay) ? object.delay : 0;
			var speed = object.speed;
			var easeStr = object.ease;
			
			TweenMax.killTweensOf(topRightBottomLeftObj);
			switch(typeStr) {
				case ClipRectMask.LEFT_TO_RIGHT :
					topRightBottomLeftObj = {top:0, right:0, bottom:_height, left:0};
					TweenMax.to(topRightBottomLeftObj, speed, {delay:delay, top:0, right:_width, bottom:_height, left:0, ease:easeStr, onUpdate:_update, onUpdateParams:[topRightBottomLeftObj], onComplete:_complete});
				break;
				
				case ClipRectMask.RIGHT_TO_LEFT :
					topRightBottomLeftObj = {top:0, right:_width, bottom:_height, left:_width};
					TweenMax.to(topRightBottomLeftObj, speed, {delay:delay, top:0, right:_width, bottom:_height, left:0, ease:easeStr, onUpdate:_update, onUpdateParams:[topRightBottomLeftObj], onComplete:_complete});
				break;
				
				case ClipRectMask.TOP_TO_BOTTOM :
					topRightBottomLeftObj = {top:0, right:_width, bottom:0, left:0};
					TweenMax.to(topRightBottomLeftObj, speed, {delay:delay, top:0, right:_width, bottom:_height, left:0, ease:easeStr, onUpdate:_update, onUpdateParams:[topRightBottomLeftObj], onComplete:_complete});
				break;
				
				case ClipRectMask.BOTTOM_TO_TOP :
					topRightBottomLeftObj = {top:_height, right:_width, bottom:_height, left:0};
					TweenMax.to(topRightBottomLeftObj, speed, {delay:delay, top:0, right:_width, bottom:_height, left:0, ease:easeStr, onUpdate:_update, onUpdateParams:[topRightBottomLeftObj], onComplete:_complete});
				break;
				
				case ClipRectMask.CENTER_TO_EDGE :
					topRightBottomLeftObj = {top:_height/2, right:_width/2, bottom:_height/2, left:_width/2};
					TweenMax.to(topRightBottomLeftObj, speed, {delay:delay, top:0, right:_width, bottom:_height, left:0, ease:easeStr, onUpdate:_update, onUpdateParams:[topRightBottomLeftObj], onComplete:_complete});
				break;
				
				case ClipRectMask.EDGE_TO_CENTER :
					topRightBottomLeftObj = {top:0, right:_width, bottom:_height, left:0};
					TweenMax.to(topRightBottomLeftObj, speed, {delay:delay, top:_height/2, right:_width/2, bottom:_height/2, left:_width/2, ease:easeStr, onUpdate:_update, onUpdateParams:[topRightBottomLeftObj], onComplete:_complete});
				break;
			}
		};
		
		var _target = null;
		var typeStr;
		
		var _width = 0;
		var _height = 0;
		var topRightBottomLeftObj = {top:0, right:0, bottom:0, left:0};
		
		/**
		 * init ClipRectMask instance
		 *
		 * @method init
		 * @param {Object} object Object include target, type. ex) {target:DOM, type:ClipRectMask.CENTER_TO_EDGE}
		 * @return {Void}
		 */
		_this.init = function(object) {
			_target = object.target;
			typeStr = object.type;
			
			_width = parseInt($(_target).css("width"));
			_height = parseInt($(_target).css("height"));
			
			TweenMax.killTweensOf(topRightBottomLeftObj);
			switch(typeStr) {
				case ClipRectMask.LEFT_TO_RIGHT :
					topRightBottomLeftObj = {top:0, right:0, bottom:_height, left:0};
				break;
				
				case ClipRectMask.RIGHT_TO_LEFT :
					topRightBottomLeftObj = {top:0, right:_width, bottom:_height, left:_width};
				break;
				
				case ClipRectMask.TOP_TO_BOTTOM :
					topRightBottomLeftObj = {top:0, right:_width, bottom:0, left:0};
				break;
				
				case ClipRectMask.BOTTOM_TO_TOP :
					topRightBottomLeftObj = {top:_height, right:_width, bottom:_height, left:0};
				break;
				
				case ClipRectMask.CENTER_TO_EDGE :
					topRightBottomLeftObj = {top:_height/2, right:_width/2, bottom:_height/2, left:_width/2};
				break;
				
				case ClipRectMask.EDGE_TO_CENTER :
					topRightBottomLeftObj = {top:0, right:_width, bottom:_height, left:0};
				break;
			}
			
			_update(topRightBottomLeftObj);
		};
		
		/**
		 * destroy ClipRectMask instance
		 *
		 * @method destroy
		 * @return {Void}
		 */
		_this.destroy = function() {
			if(topRightBottomLeftObj) TweenMax.killTweensOf(topRightBottomLeftObj);
			if(_target) _target = null;
		};
		
		function _update(_topRightBottomLeftObj) {
			if(_target) _target.style.clip = _getClipStr(_topRightBottomLeftObj);
		}
		
		function _complete() {
			$(_this).trigger( {type:_this.COMPLETE} );
		}
		
		function _getClipStr(_topRightBottomLeftObj) {
			return "rect(" + _topRightBottomLeftObj.top + "px," + _topRightBottomLeftObj.right + "px," + _topRightBottomLeftObj.bottom + "px," + _topRightBottomLeftObj.left + "px)";
		}
		
		return _this;
	};
	
	/**
	 * ClipRectMask motion direction type
	 * 
	 * @static
	 * @property ClipRectMask.LEFT_TO_RIGHT
	 * @type {String}
	 * @default "ClipRectMask_LEFT_TO_RIGHT"
	 */
	ClipRectMask.LEFT_TO_RIGHT = "ClipRectMask_LEFT_TO_RIGHT";
	
	/**
	 * ClipRectMask motion direction type
	 * 
	 * @static
	 * @property ClipRectMask.RIGHT_TO_LEFT
	 * @type {String}
	 * @default "ClipRectMask_RIGHT_TO_LEFT"
	 */
	ClipRectMask.RIGHT_TO_LEFT = "ClipRectMask_RIGHT_TO_LEFT";
	
	/**
	 * ClipRectMask motion direction type
	 * 
	 * @static
	 * @property ClipRectMask.TOP_TO_BOTTOM
	 * @type {String}
	 * @default "ClipRectMask_TOP_TO_BOTTOM"
	 */
	ClipRectMask.TOP_TO_BOTTOM = "ClipRectMask_TOP_TO_BOTTOM";
	
	/**
	 * ClipRectMask motion direction type
	 * 
	 * @static
	 * @property ClipRectMask.BOTTOM_TO_TOP
	 * @type {String}
	 * @default "ClipRectMask_BOTTOM_TO_TOP"
	 */
	ClipRectMask.BOTTOM_TO_TOP = "ClipRectMask_BOTTOM_TO_TOP";
	
	/**
	* ClipRectMask motion direction type
	* 
	* @static
	* @property ClipRectMask.CENTER_TO_EDGE
	* @type {String}
	* @default "ClipRectMask_CENTER_TO_EDGE"
	*/
	ClipRectMask.CENTER_TO_EDGE = "ClipRectMask_CENTER_TO_EDGE";
	
	/**
	 * ClipRectMask motion direction type
	 * 
	 * @static
	 * @property ClipRectMask.EDGE_TO_CENTER
	 * @type {String}
	 * @default "ClipRectMask_EDGE_TO_CENTER"
	 */
	ClipRectMask.EDGE_TO_CENTER = "ClipRectMask_EDGE_TO_CENTER";
	
	return ClipRectMask;
});
