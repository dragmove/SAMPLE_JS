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
	 * NodeUtil
	 * @class NodeUtil
	 * @constructor
	 */
	var NodeUtil = exports;
	
	/**
	 * 최저 devicePixelRatio를 만족하는 device에서 high dpi image를 표기하기 위해
	 * <img> node의 src 속성을 가공한다.
	 *
	 * @static
	 * @method replaceImageToHighDpiImage
	 * @param {Number} _min_devicePixelRatio
	 * @param {String} _targetClassNameStr
	 * @param {String} _addStr
	 * @return {Void}
	 * @example
	when min-device-pixel-ratio , replace example.png to example@2x.png.
	
	+ html
	<img src="img/cardIndex.png" width="218" height="392" alt="" class="replace2x" />
	
	+ javascript
	var minDevicePixelRatio = 2; //retianDisplay
	var replaceTargetClassNameStr = "replace2x";
	var replaceImageAddStr = "@2x"
	NodeUtil.replaceImageToHighDpiImage(minDevicePixelRatio, replaceTargetClassNameStr, replaceImageAddStr); //require set "replace2x" class to replace target high dpi image node.
	 */
	NodeUtil.replaceImageToHighDpiImage = function(_min_devicePixelRatio, _targetClassNameStr, _addStr) {
		if(window.devicePixelRatio < _min_devicePixelRatio) return;
		
		var targetImageArr = $("img." + _targetClassNameStr);
		var imgSrcStr, prevPartStr, finalPartStr, fileExtensionStr, img;
		for(var i=0, max=targetImageArr.length; i<max; i++) {
			_img = targetImageArr[i];
			if(_img) {
				imgSrcStr = _img.src;
				prevPartStr = imgSrcStr.substr(0, imgSrcStr.lastIndexOf("."));
				finalPartStr = imgSrcStr.substring(imgSrcStr.lastIndexOf("/"));
				fileExtensionStr = finalPartStr.substring(finalPartStr.lastIndexOf(".") + 1).toLowerCase();
				_img.src = prevPartStr + "@2x" + "." + fileExtensionStr;
			}
		}
	};

	/**
	 * DOM Node 객체를 전달받아, 이 노드가 HTML 태그를 표현하는지 검사한다. 즉, 이 노드가 Element 객체인지 검사한다.
	 * 트리를 순회하면서 만나는 총 Element 객체의 수를 반환한다. 
	 *
	 * @static
	 * @method countTags
	 * @param {DOM} _elementNode
	 * @return {Number} Returns uint
	 * @example
	 */
	NodeUtil.countTags = function(_elementNode) {
		var numTags = 0;
		if(_elementNode.nodeType == 1 /*Node.ELEMENT_NODE*/) numTags++;
		var children = _elementNode.childNodes;
		for(var i=0, max=children.length; i<max; i++) {
			numTags += NodeUtil.countTags(children[i]);
		}
		return numTags;
	};
	
	/**
	 * DOM element에 css class가 적용되어 있는지 확인하여 true, false 반환
	 *
	 * @static
	 * @method hasClass
	 * @param {DOM} _elementNode
	 * @param {String} _cssClassNameStr
	 * @return {Number} Returns uint
	 * @example
	 */
	NodeUtil.hasClass = function(_elementNode, _cssClassNameStr) {
		var classes = _elementNode.className;
		if(classes == _cssClassNameStr) return true;
		return String(classes).search("\\b"+_cssClassNameStr+"\\b") != -1;
	};
	
	/**
	 * DOM element에 css class 추가
	 *
	 * @static
	 * @method addClass
	 * @param {DOM} _elementNode
	 * @param {String} _cssClassNameStr
	 * @return {Void}
	 * @example
	 */
	NodeUtil.addClass = function(_elementNode, _cssClassNameStr) {
		if (NodeUtil.hasClass(_elementNode, _cssClassNameStr)) return;
		var classesStr = String(_elementNode.className);
		if(classesStr) _cssClassNameStr = " " + _cssClassNameStr;
		_elementNode.className += _cssClassNameStr;
	};
	
	/**
	 * DOM element의 css class 삭제
	 *
	 * @static
	 * @method removeClass
	 * @param {DOM} _elementNode
	 * @param {String} _cssClassNameStr
	 * @return {Void}
	 * @example
	 */
	NodeUtil.removeClass = function(_elementNode, _cssClassNameStr) {
		_elementNode.className = _elementNode.className.replace(new RegExp("\\b" + _cssClassNameStr + "\\b\\s*", "g"), "");
	};
	
	/**
	 * DOM element의 removeChild 기능에 parentNode null 상황시 처리
	 *
	 * @static
	 * @method removeChild
	 * @param {DOM} _elementNode
	 * @return {Void}
	 * @example
	 */
	NodeUtil.removeChild = function(_elementNode){
		if(!_elementNode) return;
		if(_elementNode.parentNode) _elementNode.parentNode.removeChild(_elementNode);
	};
	
	/**
	 * DOM element 내부의 모든 DOM element를 removeChild
	 *
	 * @static
	 * @method removeAllChildren
	 * @param {DOM} _elementNode
	 * @return {Void}
	 * @example
	 */
	NodeUtil.removeAllChildren = function(_elementNode) {
		if(!_elementNode) return;
		while(_elementNode.firstChild) _elementNode.removeChild(_elementNode.firstChild);
	};
	
	/**
	 * DOM element의 CSS Style property String 반환. (현재, backgroundPosition 속성 탐색시, IE7, IE8 오류 발생)
	 *
	 * @static
	 * @method getElementStyle
	 * @param {DOM} _elementNode
	 * @param {String} _cssCamelPropertyStr
	 * @param {String} _cssHyphenPropertyStr
	 * @return {String} Returns string
	 * @example
	_cssCamelPropertyStr : 카멜 표기법 style name
	_cssHyphenPropertyStr : 하이픈 표기법 style name
	
	var _targetElement = document.getElementById("navigation");
	var backgroundPositionStr = NodeUtil.getElementStyle(_targetElement, "backgroundPosition", "background-position");
	console.log("backgroundPositionStr : " + backgroundPositionStr);
	 */
	NodeUtil.getElementStyle = function(_elementNode, _cssCamelPropertyStr, _cssHyphenPropertyStr) {
		if(_elementNode.currentStyle) {
			return _elementNode.currentStyle[_cssCamelPropertyStr];
		}else if(document.defaultView && document.defaultView.getComputedStyle) {
			return document.defaultView.getComputedStyle(_elementNode, null).getPropertyValue(_cssHyphenPropertyStr);
		}else{
			return null;
		}
	};
	
	/**
	 * DOM element의 inline css style 삭제
	 *
	 * @static
	 * @method removeElementInlineStyle
	 * @param {DOM} _elementNode
	 * @return {Void}
	 * @example
	<div id="targetElement" style="opacity:0.7;"></div>
	var _targetElement = document.getElementById("targetElement");
	NodeUtil.removeElementInlineStyle(_targetElement);
	 */
	NodeUtil.removeElementInlineStyle = function(_elementNode){
		if(!_elementNode) return;
		_elementNode.removeAttribute("style");
	};
	
	/**
	 * DOM element의 document Global X 좌표 반환.
	 *
	 * @static
	 * @method getElementGlobalPositionX
	 * @param {DOM} _elementNode
	 * @return {Number} Returns number
	 * @example
	var _targetElement = document.getElementById("container");
	var globalPosX = NodeUtil.getElementGlobalPositionX(_targetElement);
	console.log(globalPosX);
	 */
	NodeUtil.getElementGlobalPositionX = function(_elementNode) {
		var borderLeft = 0;
		var positionX = 0;
		while(_elementNode.offsetParent) {
			if(borderLeft || borderLeft >= 0) {
				positionX += _elementNode.offsetLeft + borderLeft;
			}else{
				positionX += _elementNode.offsetLeft;
			}
			_elementNode = _elementNode.offsetParent;
			borderLeft = parseFloat(Util.NodeUtil.getElementStyle(_elementNode, "borderLeftWidth", "border-left-width"));
		}
		return positionX;
	};
	
	/**
	 * DOM element의 document Global Y 좌표 반환.
	 *
	 * @static
	 * @method getElementGlobalPositionY
	 * @param {DOM} _elementNode
	 * @return {Number} Returns number
	 * @example
	var _targetElement = document.getElementById("container");
	var globalPosY = NodeUtil.getElementGlobalPositionY(_targetElement);
	console.log(globalPosY);
	 */
	NodeUtil.getElementGlobalPositionY = function(_elementNode) {
		var borderTop = 0;
		var positionY = 0;
		while(_elementNode.offsetParent) {
			if(borderTop || borderTop >= 0) {
				positionY += _elementNode.offsetTop + borderTop;
			}else{
				positionY += _elementNode.offsetTop;
			}
			_elementNode = _elementNode.offsetParent;
			borderTop = parseFloat(Util.NodeUtil.getElementStyle(_elementNode, "borderTopWidth", "border-top-width"));
		}
		return positionY;
	};
	
	/**
	 * DOM element의 parentNode 내부 X 좌표 반환. Javascript나 CSS로 style을 지정하지 않은 element의 X 위치를 얻어야 할 경우, 사용.
	 *
	 * @static
	 * @method getElementOffsetLeft
	 * @param {DOM} _elementNode
	 * @return {Number} Returns number
	 * @example
	var _targetElement = document.getElementById("container");
	var posX = NodeUtil.getElementOffsetLeft(_targetElement);
	console.log(posX);
	 */
	NodeUtil.getElementOffsetLeft = function(_elementNode) {
		return _elementNode.parentNode == _elementNode.offsetParent ? _elementNode.offsetLeft : NodeUtil.getElementGlobalPositionX(_elementNode) - NodeUtil.getElementGlobalPositionX(_elementNode.parentNode);
	};
	
	/**
	 * DOM element의 parentNode 내부 Y 좌표 반환. Javascript나 CSS로 style을 지정하지 않은 element의 Y 위치를 얻어야 할 경우, 사용.
	 *
	 * @static
	 * @method getElementOffsetTop
	 * @param {DOM} _elementNode
	 * @return {Number} Returns number
	 * @example
	var _targetElement = document.getElementById("container");
	var posY = NodeUtil.getElementOffsetTop(_targetElement);
	console.log(posY);
	 */
	NodeUtil.getElementOffsetTop = function(_elementNode) {
		return _elementNode.parentNode == _elementNode.offsetParent ? _elementNode.offsetTop : NodeUtil.getElementGlobalPositionY(_elementNode) - NodeUtil.getElementGlobalPositionY(_elementNode.parentNode);
	};
	
	/**
	 * HTML Document 반환
	 *
	 * @static
	 * @method getDocumentBody
	 * @param {DOM} _elementNode
	 * @return {DOM} Returns Body
	 * @example
	var _documentBody = NodeUtil.getDocumentBody();
	_documentBody.scrollTop = 100;
	 */
	NodeUtil.getDocumentBody = function() {
		var _body = null;
		if(document.documentElement) {
			_body = document.documentElement;
		}else{
			_body = document.body;
		}
		return _body;
	};
	
	/**
	 * DOM element의 모든 parentNode 반환
	 *
	 * @static
	 * @method getParentNodeArr
	 * @param {DOM} _elementNode
	 * @return {Array} Returns array
	 * @example
	var _targetElement = document.getElementById("container");
	var parentNodeArr = NodeUtil.getParentNodeArr(_targetElement);
	console.log(parentNodeArr);
	 */
	NodeUtil.getParentNodeArr = function(_elementNode) {
		var parentNodeArr = [];
		accumulateParentNode(_target);
		return parentNodeArr;
		
		//private function
		function accumulateParentNode(_target) {
			if(_target.parentNode) {
				parentNodeArr.push(_target.parentNode);
				accumulateParentNode(_target.parentNode);
			}
		}
	};
	
	/**
	 * 외부 javascript를 현재 페이지에 추가. 해당 js file에 부여할 임의의 id 지정 필요
	 *
	 * @static
	 * @method setExternalJavascriptFile
	 * @param {String} $jsFileUrlStr
	 * @param {String} $jsFileIdStr
	 * @param {Function} $jsFileLoadCompleteEventHandler
	 * @param {Object} $scope
	 * @return {Void}
	 * @example
	var externalJsUrlStr = "./js/project/main.js";
	var externalJsFileId = "main-js"
	NodeUtil.setExternalJavascriptFile(externalJsUrlStr, externalJsFileId, completeLoadExternalJavascriptFile);
	
	function completeLoadExternalJavascriptFile() {
		console.log("external js file load complete")
	}
	 */
	NodeUtil.setExternalJavascriptFile = function($jsFileUrlStr, $jsFileIdStr, $jsFileLoadCompleteEventHandler, $scope) {
		var scriptElementArr = document.getElementsByTagName("script");
		var firstJsElement = scriptElementArr[0];
		if(document.getElementById($jsFileIdStr)) {
			console.log("already some javascript file have this id");
			$jsFileLoadCompleteEventHandler.call($scope);
			return;
		}
		
		var jsElement = document.createElement("script");
		jsElement.id = $jsFileIdStr;
		jsElement.src = $jsFileUrlStr;
		jsElement.type = "text/javascript";
		jsElement.onload = $jsFileLoadCompleteEventHandler;
		if(firstJsElement.parentNode) {
			firstJsElement.parentNode.insertBefore(jsElement, firstJsElement);
		}
	};
	
	/**
	 * javascript text-overflow:ellipsis 구현. 반드시, 정의된 ellipsis, multiline css와 함께 사용해야 한다.
	 *
	 * @static
	 * @method setCustomOverflowEllipsis
	 * @param {jQuery object array} $containers
	 * @param {String} ellipsisStr
	 * @return {Void}
	 * @example
	<!-- DOM -->
	<body>
		<!-- this is a one line ellipsis -->
		<div class="ellipsis" style="width: 100px; border: 1px solid black; margin-bottom: 50px">
			Lorem ipsum dolor sit amet, consectetur adipisicing elit
		</div>
		
		<!-- this is a multiline ellipsis -->
		<div class="ellipsis multiline" style="width: 100px; height: 40px; border: 1px solid black; margin-bottom: 50px">
			Lorem ipsum dolor sit amet, consectetur adipisicing elit
		</div>
	</body>
	
	<!-- CSS -->
	.ellipsis {
		white-space: nowrap;
		overflow: hidden;
	}
	.ellipsis.multiline {
		white-space: normal;
	}
	
	<!-- JS -->
	NodeUtil.setCustomOverflowEllipsis($(".ellipsis"), "...");
	 */
	NodeUtil.setCustomOverflowEllipsis = function($containers, ellipsisStr) {
		$containers.each(function() {
			var el = $(this);
			if(el.css("overflow") == "hidden") {
				var text = el.html();
				var multiline = el.hasClass('multiline');
				var t = $(this.cloneNode(true)).hide().css('position', 'absolute').css('overflow', 'visible').width( multiline ? el.width() : 'auto').height( multiline ? 'auto' : el.height());
				el.after(t);

				function height() {
					return t.height() > el.height();
				};
				function width() {
					return t.width() > el.width();
				};

				var func = multiline ? height : width;
				while(text.length > 0 && func()) {
					text = text.substr(0, text.length - 1);
					t.html(text + ellipsisStr);
				}

				el.html(t.html());
				t.remove();
			}
		});
	}
	
	return NodeUtil;
});