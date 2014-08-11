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
	 * Line
	 * @class Line
	 * @constructor
	 */
	
	var Line = exports;
	var Vec2 = require('com/dragmove/canvas/Vec2');
	
	Line = function(_connectObj_1, _connectObj_2, _strokeStyleStr, _lineWidth){
		var _this = this;
		
		//public variables
		this.connectObj_1 = _connectObj_1; //circle etc
		this.connectObj_2 = _connectObj_2; //circle etc
		this.strokeStyle = _strokeStyleStr;
		this.lineWidth = _lineWidth;
		
		return _this;
	};
	
	Line.prototype.draw = function(_context) {
		_context.strokeStyle = this.strokeStyle;
		_context.lineWidth = this.lineWidth;
		_context.beginPath();
		_context.moveTo(this.connectObj_1.position.x, this.connectObj_1.position.y);
		_context.lineTo(this.connectObj_2.position.x, this.connectObj_2.position.y);
		_context.stroke(); 
	};
	
	return Line;
});