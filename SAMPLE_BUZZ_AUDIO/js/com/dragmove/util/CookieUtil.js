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
	 * CookieUtil
	 * @class CookieUtil
	 * @constructor
	 */

	var CookieUtil = exports;
	
	/**
	* 1 Minute to Sec unit - 60 Sec
	* 
	* @property CookieUtil.MIN_TO_SEC
	* @type {Number}
	* @default 60
	*/
	CookieUtil.MIN_TO_SEC = 60;
	
	/**
	* 1 Hour to Sec unit - 360 Sec 
	* 
	* @property CookieUtil.HOUR_TO_SEC
	* @type {Number}
	* @default 86400 (60 * 60)
	*/
	CookieUtil.HOUR_TO_SEC = 3600; //60 * 60
	
	/**
	* 1 Day to Sec unit - 8640 Sec
	* 
	* @property CookieUtil.DAY_TO_SEC
	* @type {Number}
	* @default 86400 (60 * 60 * 24)
	*/
	CookieUtil.DAY_TO_SEC = 86400; //60 * 60 * 24
	
	/**
	 * set cookie key, value, expire second
	 *
	 * @static
	 * @method setCookie
	 * @param {String} _key
	 * @param {Object} _value 
	 * @param {Number} _expireSecond 
	 * @return {Void}
	 * @example
	 */
	CookieUtil.setCookie = function(_key, _value, _expireSecond) {
		var expires = "";
		if(_expireSecond) {
			expires = "; max-age=" + _expireSecond;
			//=old version=
			//var date = new Date();
			//date.setTime(date.getTime() + (_expireSecond * 1000));
			//expires = "; expires=" + date.toGMTString();
		}
		document.cookie = _key + "=" + _value + expires + "; path=/"; //path, domain, secure
	};
	
	/**
	 * get flag exist cookie value of key
	 *
	 * @static
	 * @method getFlagExistCookie
	 * @param {String} _key
	 * @return {Boolean} Returns true or false
	 * @example
	 */
	CookieUtil.getFlagExistCookie = function(_key) {
		var cookieArr = document.cookie.split(";");
		var splitArr;
		var keyStr ="";
		var valueStr = "";
		for(var i=0, max=cookieArr.length; i<max; i++) {
			splitArr =  cookieArr[i].split("=");
			keyStr = splitArr[0];
			valueStr = decodeURIComponent(splitArr[1]);
			if(keyStr == _key) return true;
		}
		return false;
	};
	
	/**
	 * get cookie value of key
	 *
	 * @static
	 * @method getCookie
	 * @param {String} _key
	 * @return {String} Returns string cookie value
	 * @example
	 */
	CookieUtil.getCookie = function(_key) {
		var cookieArr = document.cookie.split(";");
		var splitArr;
		var keyStr ="";
		var valueStr = "";
		for(var i=0, max=cookieArr.length; i<max; i++) {
			splitArr =  cookieArr[i].split("=");
			keyStr = splitArr[0];
			valueStr = decodeURIComponent(splitArr[1]);
			if(keyStr == _key) {
				return valueStr;
			}
		}
		return null;
	}
	
	/**
	 * remove cookie value of key
	 *
	 * @static
	 * @method removeCookie
	 * @param {String} _key
	 * @return {Void}
	 * @example
	 */
	CookieUtil.removeCookie = function(_key) {
		CookieUtil.setCookie(_key, "", -1)
	}
	
	return CookieUtil;
});
