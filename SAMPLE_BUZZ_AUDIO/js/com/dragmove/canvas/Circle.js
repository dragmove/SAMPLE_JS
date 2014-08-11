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
	 * Circle
	 * @class Circle
	 * @constructor
	 */
	
	var Circle = exports;
	var Vec2 = require('com/dragmove/canvas/Vec2');
	
	//_positionObj is {x:Number, y:Number}
	Circle = function(_positionObj, _radius, _fillStyleColorStr){
		var _this = this;
		
		//public variables
		_this.position = (new Vec2()).mutableSet(_positionObj);
		_this.lastPosition = (new Vec2()).mutableSet(_positionObj);
		_this.radius = _radius; //100;
		_this.fillStyleColor = _fillStyleColorStr; //"#f00";
		
		return _this;
	};
	
	Circle.prototype.draw = function(_context) {
		_context.beginPath();
		_context.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI, false);
		_context.fillStyle = this.fillStyleColor;
		_context.fill();
	};
	
	return Circle;
});