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
	 * ClipCircle - half circle transition. need TweenMax, jQuery Library (TEST COMPLETE - Chrome, Firefox, Safari, mobile Safari. iphone4, ipad3, GalaxyS3. BAD EFFECT - IE9. UNSUPPORTED - IE7,8.
	 * @class ClipCircle
	 * @constructor
	 * @requires TweenMax
	 * @example
	<!-- DOM -->
	<div class="clipCircle">
		<div class="clipCircleMask">
			<div class="halfCircle"></div> <!-- half circle -->
			<div class="halfCircle"></div> <!-- half circle --> <!-- when 50%, addClass .fix180deg -->
		</div>
	</div>
	
	<!-- css -->
	com.dragmove.dragmove-api.css
	
	<!-- js -->
	var _clipCircle = new ClipCircle();
	var initOpt = {
		contents:$(".clipCircle").get(0)
	};
	_clipCircle.init(initOpt);
	
	var entranceOpt = {
		degree:250,
		delay:1,
		speed:2,
		ease:Quint.easeInOut
	};
	_clipCircle.entrance(entranceOpt);
	 */
	var ClipCircle = function() {
		var _this = this;
		
		var TRANSFORM_PROPERTY_ARR = ["transform", "MozTransform", "WebkitTransform", "msTransform", "OTransform"];
		var transformPropertyStr = "";
		
		var _contents;
		var _clipCircleMask;
		var _halfCircleLeft;
		var _halfCircleRight;
		
		var tweenObj;
		var flag_excess180deg = false;
		
		_this.init = function(_object) {
			transformPropertyStr = getSupportedCss3Property(TRANSFORM_PROPERTY_ARR);
			if(transformPropertyStr == "") return; //can't css3 transform
			
			_contents = _object.contents;
			_clipCircleMask = $(".clipCircleMask", _contents).get(0);
			
			var halfCircleArr = $(".halfCircle", _contents);
			_halfCircleLeft = halfCircleArr.get(0);
			_halfCircleRight = halfCircleArr.get(1);
		};
		
		_this.entrance = function(_object) {
			var degree = _object.degree;
			if(degree <= 0) return;
			
			var delay = (_object.delay) ? _object.delay : 0;
			var speed = _object.speed;
			var easeStr = _object.ease;
			
			tweenObj = {};
			tweenObj.degree = 0;
			TweenMax.killTweensOf(tweenObj);
			TweenMax.to(tweenObj, speed, {delay:delay, degree:degree, ease:easeStr, onUpdate:updateDegree});
		};
		
		_this.destroy = function() {
		};
		
		function updateDegree() {
			var degree = tweenObj.degree.toFixed(3);
			_halfCircleLeft.style[transformPropertyStr] = "rotate(" + degree + "deg)"
			
			if(flag_excess180deg) return;
			_halfCircleRight.style[transformPropertyStr] = "rotate(" + degree + "deg)"
			
			if(degree >= 180) {
				$(_clipCircleMask).addClass("when50percent");
				$(_halfCircleRight).addClass("fix180deg");
				flag_excess180deg = true;
			}
		}
		
		function getSupportedCss3Property(propertyStrArr) {
			var root = document.documentElement;
			for(var i=0, max=propertyStrArr.length; i<max; i++) {
				if(typeof root.style[propertyStrArr[i]] == "string") {
					return propertyStrArr[i];
				}
			}
			return "";
		}
		
		return _this;
	};
	
	return ClipCircle;
});
