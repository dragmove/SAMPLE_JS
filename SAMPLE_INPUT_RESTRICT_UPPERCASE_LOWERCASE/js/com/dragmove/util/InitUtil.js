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
	 * InitUtil
	 * @class InitUtil
	 * @constructor
	 */

	var InitUtil = exports;

	/**
	 * IE7,8 png image의 opacity 변경시, 주변부의 black noise가 생기는 현상을 처리합니다.
	 * 이 method를 사용하기 위해서는 반드시 jQuery Library와 blank.gif가 필요합니다.
	 *
	 * @static
	 * @method setImageNodeForProtectIE78TransitionOpacityBug
	 * @param {String} _imageContainerAttributeNameStr
	 * @param {String} _blankGifPath blank.gif image path
	 * @param {DOM} _scopeContainer apply DOM container
	 * @return {Void}
	 * @example
	 */
	InitUtil.setImageNodeForProtectIE78TransitionOpacityBug = function(_imageContainerAttributeNameStr, _blankGifPath, _scopeContainer) {
		function getFlagBrowserIsIE() {
			return navigator.userAgent.toUpperCase().indexOf("MSIE") != -1;
		}

		function getBrowserIEVersion() {
			if(getFlagBrowserIsIE()) {
				if(navigator.userAgent.toUpperCase().indexOf("MSIE 6") != -1)
					return 6;
				if(navigator.userAgent.toUpperCase().indexOf("MSIE 7") != -1)
					return 7;
				if(navigator.userAgent.toUpperCase().indexOf("MSIE 8") != -1)
					return 8;
				if(navigator.userAgent.toUpperCase().indexOf("MSIE 9") != -1)
					return 9;
			} else {
				return -1;
			}
		}

		function getFileExtension(_fileURLStr) {
			var searchStr = _fileURLStr.indexOf("?") > -1 ? _fileURLStr.substring(0, _fileURLStr.indexOf("?")) : _fileURLStr;
			var finalPartStr = searchStr.substring(searchStr.lastIndexOf("/"));
			var fileExtensionStr = finalPartStr.substring(finalPartStr.lastIndexOf(".") + 1).toLowerCase();
			return fileExtensionStr;
		};

		var browserIEVersion = getBrowserIEVersion();
		if(browserIEVersion) {
			switch(browserIEVersion) {
				case 7 :
					break;

				case 8 :
					break;

				default :
					return;
					break;
			}
		}

		var $imgArr = $("img", _scopeContainer);
		var _$img;
		var srcStr;

		var _imgContainerNode;
		var _img;
		for(var i = 0, max = $imgArr.size(); i < max; i++) {
			_$img = $imgArr.eq(i);

			var _imgContainerNode = _$img.parent().get(0);
			if(_imgContainerNode) {
				var attributeNameStr = $(_imgContainerNode).attr(_imageContainerAttributeNameStr);
				if(!attributeNameStr)
					continue;
				if(attributeNameStr != "true")
					continue;
				srcStr = _$img.attr("src");
				if(!srcStr)
					continue;
				var fileExtension = getFileExtension(srcStr);

				if(fileExtension == "png") {
					_img = _$img.get(0);
					_img.src = _blankGifPath;
					_img.style.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled="true", sizingMethod="crop", src="' + srcStr + '");';
				}
			}
		}
	};
	
	return InitUtil;
});
