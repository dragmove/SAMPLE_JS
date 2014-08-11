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
	 * BrowserUtil
	 * @class BrowserUtil
	 * @constructor
	 */
	var BrowserUtil = exports;
	var CheckUtil = require('com/dragmove/util/CheckUtil');
	var ArrayUtil = require('com/dragmove/util/ArrayUtil');

	/**
	 * get Location Anchor String
	 *
	 * @static
	 * @method getLocationAnchor
	 * @return {String} Returns empty String or String
	 * @example
	 */
	BrowserUtil.getLocationAnchor = function() {
		var locationStr = unescape(document.location.href);
		var anchorIndex = locationStr.indexOf("#");
		if(anchorIndex < 0) return "";
		return locationStr.substr(anchorIndex + 1);
	};
	
	/**
	 * get browser support Canvas
	 *
	 * @static
	 * @method getFlagSupportCanvas
	 * @return {Boolean} Returns true or false
	 * @example
	 */
	BrowserUtil.getFlagSupportCanvas = function() {
		return !!document.createElement('canvas').getContext;
	};
	
	/**
	* open window 
	*
	* @method openWindow
	* @param {String} _url window url
	* @param {String} _windowName window name
	* @param {Number} _width window width
	* @param {Number} _height window height
	* @param {Number} _left window left
	* @param {Number} _top window top
	* @param {String} _scrollbars [extra=no] set scrollBar, optional work. yes or no
	* @param {String} _resizable [extra=no] set window resizable, optional work. yes or no
	* @param {String} _status [extra=no] display status, optional work. yes or no
	* @param {String} _location [extra=no] display location, optional work. yes or no
	* @param {String} _toolbars [extra=no] display toolbar, optional work. yes or no
	* @param {String} _menubar [extra=no] display menubar, optional work. yes or no
	* @param {String} _fullscreen [extra=no] set fullscreen, optional work. yes or no
	* @param {String} _channelmode [extra=no] set channelmode, optional work. yes or no
	* @return {Window} Returns window object
	*/
	BrowserUtil.openWindow = function(_url, _windowName, _width, _height, _left, _top, _scrollbars, _resizable, _status, _location, _toolbar, _menubar, _fullscreen, _channelmode) {
		if(!_scrollbars) _scrollbars = "no";
		if(!_resizable) _resizable = "no";
		if(!_status) _status = "no";
		if(!_location) _location = "no";
		if(!_toolbar) _toolbar = "no";
		if(!_menubar) _menubar = "no";
		if(!_fullscreen) _fullscreen = "no";
		if(!_channelmode) _channelmode = "no";
		var paramStr = 'width='+_width+',height='+_height+',left='+_left+',top='+_top+',scrollbars='+_scrollbars+',resizable='+_resizable+',status='+_status+',location='+_location+',toolbar='+_toolbar+',menubar='+_menubar+',fullscreen='+_fullscreen+',channelmode='+_channelmode;
		var _window = window.open(_url, _windowName, paramStr);
		//_window.window.focus();
		return _window;
		
		/*
		url : string
		windowName : string
		width : number
		height : number
		left : number
		top : number
		scrollbars : yes, no
		resizable : yes, no
		status : yes, no
		location : yes, no
		toolbar : yes, no
		menubar : yes, no
		fullscreen : yes, no
		channelmode : yes, no
		*/
	};
	
	/**
	 * get Browser window.screenX or window.screenLeft
	 *
	 * @static
	 * @method getBrowserX
	 * @return {Number} Returns screenX or screenLeft
	 * @example
	 */
	BrowserUtil.getBrowserX = function() {
		if(CheckUtil.available(window.screenX)) {
			return window.screenX;
		} else {
			return window.screenLeft;
		}
	};
	
	/**
	 * get Browser window.screenY or window.screenTop
	 *
	 * @static
	 * @method getBrowserY
	 * @return {Number} Returns screenY or screenTop
	 * @example
	 */
	BrowserUtil.getBrowserY = function() {
		if(CheckUtil.available(window.screenY)) {
			return window.screenY;
		}else{
			return window.screenTop;
		}
	};
	
	/**
	 * get Browser width except menubar, toolbar, scrollbar and etc. (get Browser width includes scrollbar on IE)
	 *
	 * @static
	 * @method getBrowserInnerWidth
	 * @return {Number} Returns browser width except menubar, toolbar, scrollbar and etc.
	 * @example
	 */
	BrowserUtil.getBrowserInnerWidth = function() {
		var resultArr = [];
		if(window.innerWidth) resultArr.push(window.innerWidth);
		if(document.documentElement && document.documentElement.clientWidth) resultArr.push(document.documentElement.clientWidth);
		if(document.body && document.body.clientWidth) resultArr.push(document.body.clientWidth);
		if(resultArr.length <= 0) return -1;
		return(ArrayUtil.getMinNumberByArr(resultArr));
		/* if(window.innerWidth) {
			return window.innerWidth;
		}else if(document.documentElement && document.documentElement.clientWidth) {
			return document.documentElement.clientWidth;
		}else if(document.body && document.body.clientWidth) {
			return document.body.clientWidth;
		} */
	};
	
	/**
	 * get Browser height except menubar, toolbar, scrollbar and etc. (get Browser height includes scrollbar on IE)
	 *
	 * @static
	 * @method getBrowserInnerHeight
	 * @return {Number} Returns browser height except menubar, toolbar, scrollbar and etc.
	 * @example
	 */
	BrowserUtil.getBrowserInnerHeight = function() {
		var resultArr = [];
		if(window.innerHeight) resultArr.push(window.innerHeight);
		if(document.documentElement && document.documentElement.clientHeight) resultArr.push(document.documentElement.clientHeight);
		if(document.body && document.body.clientHeight) resultArr.push(document.body.clientHeight);
		if(resultArr.length <= 0) return -1;
		return(ArrayUtil.getMinNumberByArr(resultArr));
		/* if(window.innerHeight) {
			return window.innerHeight;
		}else if(document.documentElement && document.documentElement.clientHeight) {
			return document.documentElement.clientHeight;
		}else if(document.body && document.body.clientHeight) {
			return document.body.clientHeight;
		} */
	};
	
	/**
	 * get Document scrollWidth
	 *
	 * @static
	 * @method getDocumentScrollWidth
	 * @return {Number} Returns document scrollWidth
	 * @example
	 */
	BrowserUtil.getDocumentScrollWidth = function() {
		if(document.documentElement && document.documentElement.scrollWidth) {
			return document.documentElement.scrollWidth;
		}else if(document.body && document.body.scrollWidth) {
			return document.body.scrollWidth;
		}
	};
	
	/**
	 * get Document scrollHeight
	 *
	 * @static
	 * @method getDocumentScrollHeight
	 * @return {Number} Returns document scrollHeight
	 * @example
	 */
	BrowserUtil.getDocumentScrollHeight = function() {
		if(document.documentElement && document.documentElement.scrollHeight) {
			return document.documentElement.scrollHeight;
		}else if(document.body && document.body.scrollHeight) {
			return document.body.scrollHeight;
		}
	};
	
	/**
	 * get Document pageXOffset or scrollLeft
	 *
	 * @static
	 * @method getBrowserScrollX
	 * @return {Number} Returns document pageXOffset or scrollLeft
	 * @example
	 */
	BrowserUtil.getBrowserScrollX = function() {
		if(window.innerWidth) {
			return window.pageXOffset;
		}else if(document.documentElement && document.documentElement.clientWidth) {
			return document.documentElement.scrollLeft;
		}else if(document.body && document.body.clientWidth) {
			return document.body.scrollLeft;
		}
	};
	
	/**
	 * get Document pageYOffset or scrollTop
	 *
	 * @static
	 * @method getBrowserScrollY
	 * @return {Number} Returns document pageYOffset or scrollTop
	 * @example
	 */
	BrowserUtil.getBrowserScrollY = function() {
		if(window.innerHeight) {
			return window.pageYOffset;
		}else if(document.documentElement && document.documentElement.clientHeight) {
			return document.documentElement.scrollTop;
		}else if(document.body && document.body.clientHeight) {
			return document.body.scrollTop;
		}
	};
	
	/**
	 * get Document innerWidth or offsetWidth
	 *
	 * @static
	 * @method getBrowserOffsetWidth
	 * @return {Number} Returns document innerWidth or offsetWidth
	 * @example
	 */
	BrowserUtil.getBrowserOffsetWidth = function() {
		if(window.innerWidth) {
			return window.innerWidth;
		}else if(document.documentElement && document.documentElement.offsetWidth) {
			return document.documentElement.offsetWidth;
		}else if(document.body && document.body.offsetWidth) {
			return document.body.offsetWidth;
		}
	};
	
	/**
	 * get Document innerHeight or offsetHeight
	 *
	 * @static
	 * @method getBrowserOffsetHeight
	 * @return {Number} Returns document innerHeight or offsetHeight
	 * @example
	 */
	BrowserUtil.getBrowserOffsetHeight = function() {
		if(window.innerHeight) {
			return window.innerHeight;
		}else if(document.documentElement && document.documentElement.offsetHeight) {
			return document.documentElement.offsetHeight;
		}else if(document.body && document.body.offsetHeight) {
			return document.body.offsetHeight;
		}
	};
	
	/**
	 * get Browser is IE
	 *
	 * @static
	 * @method getFlagBrowserIsIE
	 * @return {Boolean} Returns true or false
	 * @example
	 */
	BrowserUtil.getFlagBrowserIsIE = function() {
		return navigator.userAgent.toUpperCase().indexOf("MSIE") != -1;
	};
	
	/**
	 * get IE Browser version no. if browser is not IE, return -1.
	 *
	 * @static
	 * @method getBrowserIEVersion
	 * @return {Number} Returns -1 or 6,7,8,9
	 * @example
	 */
	BrowserUtil.getBrowserIEVersion = function() {
		if(BrowserUtil.getFlagBrowserIsIE()) {
			if(navigator.userAgent.toUpperCase().indexOf("MSIE 6") != -1) return 6;
			if(navigator.userAgent.toUpperCase().indexOf("MSIE 7") != -1) return 7;
			if(navigator.userAgent.toUpperCase().indexOf("MSIE 8") != -1) return 8;
			if(navigator.userAgent.toUpperCase().indexOf("MSIE 9") != -1) return 9;
		}else{
			return -1;
		}
	};
	
	/**
	 * get browser is IE6
	 *
	 * @static
	 * @method getFlagBrowserIE6
	 * @return {Boolean} Returns true or false
	 * @example
	 */
	BrowserUtil.getFlagBrowserIE6 = function() {
		if(BrowserUtil.getBrowserIEVersion() != 6) return false;
		return true;
	};
	
	/**
	 * get browser is IE7
	 *
	 * @static
	 * @method getFlagBrowserIE7
	 * @return {Boolean} Returns true or false
	 * @example
	 */
	BrowserUtil.getFlagBrowserIE7 = function() {
		if(BrowserUtil.getBrowserIEVersion() != 7) return false;
		return true;
	};
	
	/**
	 * get browser is IE8
	 *
	 * @static
	 * @method getFlagBrowserIE8
	 * @return {Boolean} Returns true or false
	 * @example
	 */
	BrowserUtil.getFlagBrowserIE8 = function() {
		if(BrowserUtil.getBrowserIEVersion() != 8) return false;
		return true;
	};
	
	/**
	 * get browser is IE9
	 *
	 * @static
	 * @method getFlagBrowserIE9
	 * @return {Boolean} Returns true or false
	 * @example
	 */
	BrowserUtil.getFlagBrowserIE9 = function() {
		if(BrowserUtil.getBrowserIEVersion() != 9) return false;
		return true;
	};
	
	/**
	 * get browser is Firefox
	 *
	 * @static
	 * @method getFlagBrowserIsFirefox
	 * @return {Boolean} Returns true or false
	 * @example
	 */
	BrowserUtil.getFlagBrowserIsFirefox = function() { 
		return navigator.userAgent.toUpperCase().indexOf("FIREFOX") != -1;
	};
	
	
	/**
	 * get browser is Opera
	 *
	 * @static
	 * @method getFlagBrowserIsOpera
	 * @return {Boolean} Returns true or false
	 * @example
	 */
	BrowserUtil.getFlagBrowserIsOpera = function() { 
		return navigator.userAgent.toUpperCase().indexOf("OPERA") != -1;
	};
	
	/**
	 * get browser is Chrome
	 *
	 * @static
	 * @method getFlagBrowserIsChrome
	 * @return {Boolean} Returns true or false
	 * @example
	 */
	BrowserUtil.getFlagBrowserIsChrome = function() {
		return navigator.userAgent.toUpperCase().indexOf("CHROME") != -1;
	};
	
	/**
	 * get browser is Safari
	 *
	 * @static
	 * @method getFlagBrowserIsSafari
	 * @return {Boolean} Returns true or false
	 * @example
	 */
	BrowserUtil.getFlagBrowserIsSafari = function() {
		//return navigator.userAgent.toUpperCase().indexOf("SAFARI") != -1;
		var userAgentInfoUpperCaseStr = navigator.userAgent.toUpperCase();
		if(userAgentInfoUpperCaseStr.indexOf("SAFARI") != -1 && userAgentInfoUpperCaseStr.indexOf("CHROME") == -1) {
			return true;
		}else{
			return false;
		}
	};

	/**
	 * get browser is Mobile browser
	 *
	 * @static
	 * @method getFlagBrowserIsMobile
	 * @return {Boolean} Returns true or false
	 * @example
	 */
	BrowserUtil.getFlagBrowserIsMobile = function() {
		return navigator.userAgent.toUpperCase().indexOf("MOBILE") != -1;
	};
	
	/**
	 * get browser is MobileSafari
	 *
	 * @static
	 * @method getFlagBrowserIsMobileSafari
	 * @return {Boolean} Returns true or false
	 * @example
	 */
	BrowserUtil.getFlagBrowserIsMobileSafari = function() {
		return /APPLE.*MOBILE.*SAFARI/.test(navigator.userAgent.toUpperCase());
	};
	
	/**
	 * get Device is iPad
	 *
	 * @static
	 * @method getFlagDeviceIsiPad
	 * @return {Boolean} Returns true or false
	 * @example
	 */
	BrowserUtil.getFlagDeviceIsiPad = function() {
		return navigator.userAgent.toUpperCase().indexOf("IPAD") != -1;
	};
	
	/**
	 * get Device is iPhone
	 *
	 * @static
	 * @method getFlagDeviceIsiPhone
	 * @return {Boolean} Returns true or false
	 * @example
	 */
	BrowserUtil.getFlagDeviceIsiPhone = function() {
		return navigator.userAgent.toUpperCase().indexOf("IPHONE") != -1;
	};
	
	/**
	 * get Device is iPod
	 *
	 * @static
	 * @method getFlagDeviceIsiPod
	 * @return {Boolean} Returns true or false
	 * @example
	 */
	BrowserUtil.getFlagDeviceIsiPod = function() {
		return navigator.userAgent.toUpperCase().indexOf("IPOD") != -1;
	};

	/**
	 * get Device is Android
	 *
	 * @static
	 * @method getFlagDeviceIsAndroid
	 * @return {Boolean} Returns true or false
	 * @example
	 */
	BrowserUtil.getFlagDeviceIsAndroid = function() {
		return /.*ANDROID.*/.test(navigator.userAgent.toUpperCase());
	};
	
	return BrowserUtil;
});
