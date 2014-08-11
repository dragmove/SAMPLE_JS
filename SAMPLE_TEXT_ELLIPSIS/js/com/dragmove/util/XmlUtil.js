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
	 * XmlUtil
	 * @class XmlUtil
	 * @constructor
	 */
	var XmlUtil = exports;
	var CheckUtil = require('com/dragmove/util/CheckUtil');

	/**
	 * xml2json.js로 xml을 object type으로 parsing한 object 내부의 특정 Object인 _xml2jsonDataObj내에서
	 * _attributeNameStr의 속성명을 가진 노드를 전부 Array에 담아 반환합니다. 
	 *
	 * @static
	 * @method getNodesValueArrayByAttributeName
	 * @param {Object} _xml2jsonDataObj
	 * @param {String} _attributeNameStr
	 * @return {Array} Returns array
	 * @example
	 */
	XmlUtil.getNodesValueArrayByAttributeName = function(_xml2jsonDataObj, _attributeNameStr) {
		var nodesValueArr;
		var dataObj = _xml2jsonDataObj;
		
		if(!CheckUtil.available(dataObj)) {
			//console.log("param _xml2jsonDataObj is undefined or null. return null");
			return null;
		}
		nodesValueArr = new Array();
		
		var attributeValue;
		var _object;
		for(var i=0, max=dataObj.length; i<max; i++) {
			_object = dataObj[i];
			attributeValue = _object["@"+_attributeNameStr];
			nodesValueArr.push(attributeValue);
		}
		return nodesValueArr;
	};
	
	/**
	 * xml2json.js로 xml을 object type으로 parsing한 object 내부의 특정 Object인 _xml2jsonDataObj내에서
	 * _attributeNameStr의 속성명을 가진 노드가 _attributeValueStr 값을 가졌다면, 이를 모두 Array에 담아 반환합니다.
	 *
	 * @static
	 * @method getNodesArrayByAttribute
	 * @param {Object} _xml2jsonDataObj
	 * @param {String} _attributeNameStr
	 * @param {String} _attributeValueStr
	 * @return {Array} Returns array
	 * @example
	 */
	XmlUtil.getNodesArrayByAttribute = function(_xml2jsonDataObj, _attributeNameStr, _attributeValueStr) {
		var dataObj = _xml2jsonDataObj;
		if(!CheckUtil.available(dataObj)) {
			//console.log("param _xml2jsonDataObj is undefined or null. return null");
			return null;
		}
		
		var nodesValueArr = new Array();
		var _object;
		for(var i=0, max=dataObj.length; i<max; i++) {
			_object = dataObj[i];
			if(_object["@"+_attributeNameStr] == _attributeValueStr) {
				nodesValueArr.push(_object);
			}
		}
		return nodesValueArr;
	};
	
	/**
	 * xml 내의 특정한 속성명과 속성값을 가지는 Node들을 담은 Array 반환.
	 * xml2json.js로 xml을 object type으로 parsing한 object 내부의 특정 Object인 _xml2jsonDataObjArr 내에서
	 * _attributeObj에 설정된 복수의 속성명과 속성값에 일치하는 object data가 존재할 경우,
	 * 이를 모두 Array에 담아 반환합니다.
	 *
	 * @static
	 * @method getNodesArrayByAttributeObj
	 * @param {Array} _xml2jsonDataObjArr
	 * @param {Object} _attributeObj
	 * @return {Array} Returns array
	 * @example
	var listObjArr = XmlUtil.getNodesArrayByAttributeObj(jsonData.data.list, {voltage:2, ampere:1}); //refer to SK INNOVATION SIMULATION project
	 */
	XmlUtil.getNodesArrayByAttributeObj = function(_xml2jsonDataObjArr, _attributeObj) {
		var dataObjArr = _xml2jsonDataObjArr;
		if(!CheckUtil.available(dataObjArr)) {
			//console.log("param _xml2jsonDataObjArr is undefined or null. return null");
			return null;
		}
		
		var attributeNameArr = new Array();
		var attributeValueArr = new Array();
		for(var i in _attributeObj) {
			attributeNameArr.push(i);
			attributeValueArr.push(_attributeObj[i]);
		}
		
		var searchFlowNum = 0;
		var searchObjArr;
		while(searchFlowNum < attributeNameArr.length) {
			searchAttributeNameStr = attributeNameArr[searchFlowNum];
			searchAttributeValueStr = attributeValueArr[searchFlowNum];
			searchFlowNum++;
			
			searchObjArr = new Array();
			for(var i=0,max=dataObjArr.length; i<max; i++) {
				if(dataObjArr[i]["@" + searchAttributeNameStr] == searchAttributeValueStr) {
					searchObjArr.push(dataObjArr[i]);
				}
			}
			if(searchObjArr.length > 0) {
				dataObjArr = searchObjArr;
			}else{
				//console.log("attributeNameArr parameter 중 " + searchAttributeNameStr + " 속성에 해당하는 " + searchAttributeValueStr + " 값이 존재하지 않습니다. return null");
				return null;
			}
		}
		return dataObjArr;
	};
	
	return ArrayUtil;
});