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
	 * Vec2
	 * @class Vec2
	 * @constructor
	 */
	var Vec2 = exports;

	Vec2 = function(_x, _y){
		var _this = this;
		
		_this.x = _x || 0;
		_this.y = _y || 0;
		
		return _this;
	};
	
	Vec2.prototype.add = function(_vec2) {
		return new Vec2(this.x + _vec2.x, this.y + _vec2.y);
	};
	
	Vec2.prototype.subtract = function(_vec2) {
		return new Vec2(this.x - _vec2.x, this.y - _vec2.y);
	};
	
	Vec2.prototype.multiply = function(_vec2) {
		return new Vec2(this.x * _vec2.x, this.y * _vec2.y);
	};
	
	Vec2.prototype.divide = function(_vec2) {
		return new Vec2(this.x / _vec2.x, this.y / _vec2.y);
	};
	
	Vec2.prototype.scale = function(coefficient) {
		return new Vec2(this.x * coefficient, this.y * coefficient);
	};
	
	Vec2.prototype.mutableSet = function(_vec2) {
		this.x = _vec2.x;
		this.y = _vec2.y;
		return this;
	};
	
	Vec2.prototype.mutableAdd = function(_vec2) {
		this.x += _vec2.x;
		this.y += _vec2.y;
		return this;
	};
	
	Vec2.prototype.mutableSubtract = function(_vec2) {
		this.x -= _vec2.x;
		this.y -= _vec2.y;
		return this;
	};
	
	Vec2.prototype.mutableMultiply = function(_vec2) {
		this.x *= _vec2.x;
		this.y *= _vec2.y;
		return this;
	};
	
	Vec2.prototype.mutableDivide = function(_vec2) {
		this.x /= _vec2.x;
		this.y /= _vec2.y;
		return this;
	};
	
	Vec2.prototype.mutableScale = function(coefficient) {
		this.x *= coefficient;
		this.y *= coefficient;
		return this;
	};
	
	Vec2.prototype.length = function() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	};
	
	Vec2.prototype.distance = function(_vec2) {
		var x = _vec2.x - this.x;
		var y = _vec2.y - this.y;
		return Math.sqrt(x * x + y * y);
	};
	
	Vec2.prototype.angle = function(_vec2) {
		return Math.atan2(this.x * _vec2.y - this.y * _vec2.x, this.x * _vec2.x + this.y * _vec2.y);
	};
	
	Vec2.prototype.rotate = function(_originVec2, _theta) {
		var x = this.x - origin.x;
		var y = this.y - origin.y;
		return new Vec2(x * Math.cos(_theta) - y * Math.sin(_theta) + _originVec2.x, x * Math.sin(_theta) + y * Math.cos(_theta) + _originVec2.y);
	};
	
	return Vec2;
});