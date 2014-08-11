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
	 * StringUtil
	 * @class StringUtil
	 * @constructor
	 */

	var StringUtil = exports;
	
	/**
	 * "transform" or "transition" String를 Browser에 따라 javascript 속성명으로 수정하여 반환.
	 *
	 * @static
	 * @method getPrefixedTransformTransitionPropertyStr
	 * @param {String} _transitionOrTransformStr
	 * @return {String} Returns prefixed string
	 * @example
	var transformStr = StringUtil.getPrefixedTransformTransitionPropertyStr("transform");
	console.log(transformStr);
	
	var valueStr = "rotateY(45deg)";
	_divInstance.style[transformStr] = valueStr;
	
	 */
	StringUtil.getPrefixedTransformTransitionPropertyStr = function(_transitionOrTransformStr) {
		var i, s = document.createElement('p').style, v = ['ms','O','Moz','Webkit'];
	    if( s[_transitionOrTransformStr] == '' ) return _transitionOrTransformStr;
	    _transitionOrTransformStr = _transitionOrTransformStr.charAt(0).toUpperCase() + _transitionOrTransformStr.slice(1);
	    for( i = v.length; i--; )
	        if( s[v[i] + _transitionOrTransformStr] == '' )
	            return (v[i] + _transitionOrTransformStr);
	}
	
	/**
	 * 파일의 확장자 string을 반환.
	 *
	 * @static
	 * @method getFileExtension
	 * @param {String} _fileURLStr
	 * @return {String} Returns file extension string
	 * @example
	 */
	StringUtil.getFileExtension = function(_fileURLStr) {
		var searchStr = _fileURLStr.indexOf("?") > -1 ? _fileURLStr.substring(0, _fileURLStr.indexOf("?")) : _fileURLStr;
		var finalPartStr = searchStr.substring(searchStr.lastIndexOf("/"));
		var fileExtensionStr = finalPartStr.substring(finalPartStr.lastIndexOf(".") + 1).toLowerCase();
		return fileExtensionStr;
	};
	
	/**
	 * 문장 내에 기본 영문자와 숫자, 기본 심볼 문자만이 존재하는지의 여부를 반환.
	 *
	 * @static
	 * @method getFlagEnglishStr
	 * @param {String} _string
	 * @return {Boolean} Returns true or false
	 * @example
	var englishStr = "dragmove!#$%&'\"()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\ ]^_`abcdefghijklmnopqrstuvwxyz{|}~"
	console.log(StringUtil.getFlagEnglishStr(englishStr));
	
	var koreanStr = "김현석 dragmove"
	console.log(StringUtil.getFlagEnglishStr(koreanStr));
	 */
	StringUtil.getFlagEnglishStr = function(_string) {
		var flag = true;
		var splitArr = _string.split("");
		var strArr = [];
		var _str;
		var unicode;
		for(var i=0, max=splitArr.length; i<max; ++i) {
			_str = splitArr[i];
			unicode = _str.charCodeAt();
			if(unicode < 32 || unicode > 126) { // !"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}~
				flag = false;
				break;
			} 
		}
		return flag;
	};
	
	/**
	 * 문장 내의 각 한글 character를 초,성,성으로 분해하여 담은 Array(character가 한글이 아닐 경우에는 Array에 바로 담습니다)들을 별도의 Array에 순차적으로 담아 2차원 배열(Array) 형태로 반환
	 *
	 * @static
	 * @method breakSetenceStr
	 * @param {String} _string
	 * @return {Array} Returns array include array
	 * @example
	var testStr = "김현석 dragmove";
	var returnArr = StringUtil.breakSetenceStr(testStr);
	console.log(returnArr); //[["ㄱ", "기", "김"], ["ㅎ", "혀", "현"], ["ㅅ", "서", "석"], [" "], ["d"], ["r"], ["a"], ["g"], ["m"], ["o"], ["v"], ["e"]]
	
	for (var i=0, max=returnArr.length; i<max; ++i) {
		console.log("returnArr[i] :", returnArr[i]);
	}
	 */
	StringUtil.breakSetenceStr = function(_string) {
		var splitArr = _string.split("");
		var strArr = [];
		var _str;
		for(var i=0, max=splitArr.length; i<max; ++i) {
			_str = splitArr[i];
			strArr.push(StringUtil.breakCharacterStr(_str));
		}
		return strArr;
	};
	
	/**
	 * 한글 character를 초,중,종성으로 분해하여 Array에 담아 반환(character가 한글이 아닐 경우 Array에 담아 단순 반환)
	 *
	 * @static
	 * @method breakCharacterStr
	 * @param {String} _oneCharacterStr
	 * @return {Array} Returns array
	 * @example
	link - http://en.wikipedia.org/wiki/Korean_language_and_computers#Hangul_Syllables_Area

	var testChaStr = "껌";
	console.log(StringUtil.breakCharacterStr(testChaStr)); //ㄲ, 꺼, 껌
	 */
	StringUtil.breakCharacterStr = function(_oneCharacterStr) {
		var valueArr = [];
		var unicode = _oneCharacterStr.charCodeAt();
		var initialValue; //Initial Jamo Number
		var MedialValue; //Initial Jamo Number + Medial Jamo Number
	
		if(unicode >= 44032 && unicode <= 55203) { //hangul (Unicode 44032 ~ 55203) 
			initialValue = Math.floor((unicode - 44032) / 588); //Initial Jamo index
			valueArr.push(String(dragmove.data.LanguageData.INITIAL_JAMO_KOR[initialValue]));
			
			var initialJamoUnicode = initialValue * 588 + 44032; // Initial Jamo + ㅏ(Medial Jamo[0]) + no Final Jamo
			MedialValue = Math.floor( (unicode - initialJamoUnicode) / 28 ) * 28 + initialJamoUnicode;
			
			var medialJamoUnicodeIndex = Math.floor( (unicode - initialJamoUnicode) / 28 );
			
			//ㅘ, ㅙ, ㅚ (9, 10, 11) -> add ㅗ (8)
			if(medialJamoUnicodeIndex >= 9 && medialJamoUnicodeIndex <= 11) valueArr.push(String.fromCharCode(initialJamoUnicode + 8 * 28)); //valueArr.push(dragmove.data.LanguageData.MEDIAL_JAMO_KOR[8]);
			
			//ㅝ, ㅞ, ㅟ (14, 15, 16) -> add ㅜ(13)
			if(medialJamoUnicodeIndex >= 14 && medialJamoUnicodeIndex <= 16) valueArr.push(String.fromCharCode(initialJamoUnicode + 13 * 28));//valueArr.push(dragmove.data.LanguageData.MEDIAL_JAMO_KOR[13]);
			
			//ㅢ (19) -> add ㅡ(18)
			if(medialJamoUnicodeIndex == 19) valueArr.push(String.fromCharCode(initialJamoUnicode + 18 * 28)); //valueArr.push(dragmove.data.LanguageData.MEDIAL_JAMO_KOR[18]);
			
			valueArr.push(String.fromCharCode(MedialValue));
			
			//add Final Jamo
			var finalJamoUnicodeIndex = unicode - MedialValue; //int
			if(finalJamoUnicodeIndex != 0) {
				//ㄲ, ㄳ (2, 3) -> add ㄱ(1)
				if(finalJamoUnicodeIndex >= 2 && finalJamoUnicodeIndex <= 3) valueArr.push(String.fromCharCode(MedialValue + 1));
				
				//ㄵ, ㄶ(5, 6) -> add ㄴ(4)
				if(finalJamoUnicodeIndex >= 5 && finalJamoUnicodeIndex <= 6) valueArr.push(String.fromCharCode(MedialValue + 4));
				
				//ㄺ, ㄻ, ㄼ, ㄽ, ㄾ, ㄿ, ㅀ (9, 10, 11, 12, 13, 14, 15) -> add ㄹ(8)
				if(finalJamoUnicodeIndex >= 9 && finalJamoUnicodeIndex <= 15) valueArr.push(String.fromCharCode(MedialValue + 8));
				
				//ㅄ (18) -> add ㅂ(17)
				if(finalJamoUnicodeIndex == 18) valueArr.push(String.fromCharCode(MedialValue + 17));
	
				//ㅆ (20) -> add ㅅ(19)
				if(finalJamoUnicodeIndex == 20) valueArr.push(String.fromCharCode(MedialValue + 19));
				
				valueArr.push(_oneCharacterStr);
			}
		}else if(unicode >= 32 && unicode <= 126) { // !"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}~
			if(unicode == 32){ //" "
				valueArr.push(" ");
			}else if(unicode == 92){ //\
				valueArr.push(String.fromCharCode(unicode));
			}else{
				valueArr.push(String.fromCharCode(unicode));
			}
		}else{
			valueArr.push(String.fromCharCode(unicode));
		}
		return valueArr;
	};
	
	/**
	 * String 내의 특정 문자열을 변환하여 출력.
	 *
	 * @static
	 * @method replaceStr
	 * @param {String} _targetStr target string
	 * @param {String} _findStr find string
	 * @param {String} _changeStr change string
	 * @return {String} Returns string
	 * @example
	var testStr = "     test입니다.     test.";
	console.log(StringUtil.replaceStr(testStr, "tes", "nex"));
	 */
	StringUtil.replaceStr = function(_targetStr, _findStr, _changeStr) {
		return _targetStr.split(_findStr).join(_changeStr);
	};
	
	/**
	 * String 내의 모든 공백 문자열 삭제
	 *
	 * @static
	 * @method removeWhiteSpaceStr
	 * @param {String} _targetStr target string
	 * @return {String} Returns string
	 * @example
	var testStr = "      test      입     니다.     ";
	console.log(StringUtil.removeWhiteSpaceStr(testStr));
	 */
	StringUtil.removeWhiteSpaceStr = function(_targetStr) {
		return _targetStr.split(" ").join("");
	};
	
	/**
	 * String의 length가 특정한 숫자보다 길 경우, String을 특정한 숫자까지만 표기. String의 마지막 글자 이후 _cutAddStr String의 추가 가능
	 *
	 * @static
	 * @method cutStrByIndex
	 * @param {String} _str target string
	 * @param {Number} _cutStringIndex cut string index
	 * @param {String} _cutAddStr add string
	 * @return {String} Returns string
	 * @example
	console.log(StringUtil.cutStrByIndex("dragmove", 3, "_javascript")); //dra_javascript
	 */
	StringUtil.cutStrByIndex = function(_str, _cutStringIndex, _cutAddStr) {
		var tempStr = _str;
		if (_str.length > _cutStringIndex) tempStr = _str.substr(0, _cutStringIndex) + _cutAddStr;
		return tempStr;
	};
	
	/**
	 * int type param value를 ','를 이용한 금액 표기 형태로 변경 출력
	 *
	 * @static
	 * @method numberToPriceStr
	 * @param {Number} _intTypeValue int type value
	 * @param {String} _addStr add string
	 * @return {String} Returns string
	 * @example
	var cost = 300000000000000000;
	console.log(StringUtil.numberToPriceStr(cost)); //300,000,000,000,000,000
	 */
	StringUtil.numberToPriceStr = function(_intTypeValue, _addStr) {
		var addStr = ",";
		if(_addStr != undefined) addStr = _addStr;
	
		var arr = String(_intTypeValue).split(""); 
		var tlen = arr.length; 
		var clen = Math.ceil(tlen / 3); 
		for (var i=1; i<clen; i++) arr.splice(tlen - i * 3, 0, addStr); 
		return arr.join("");
	};
	
	/**
	 * 문자열 좌측 부분의 공백 문자 제거
	 *
	 * @static
	 * @method leftTrim
	 * @param {String} _str
	 * @return {String} Returns string
	 * @example
	var trimTargetStr = "      dragmove      javascript      ";
	console.log(StringUtil.leftTrim(trimTargetStr)); //dragmove javascript    
	 */
	StringUtil.leftTrim = function(_str) {
		return _str.replace(/^\s+/, "");
	};
	
	/**
	 * 문자열 좌측 부분의 공백 문자 제거
	 *
	 * @static
	 * @method rightTrim
	 * @param {String} _str
	 * @return {String} Returns string
	 * @example
	var trimTargetStr = "      dragmove      javascript      ";
	console.log(StringUtil.rightTrim(trimTargetStr)); //      dragmove      javascript
	 */
	StringUtil.rightTrim = function(_str) {
		return _str.replace(/\s+$/, "");
	};
	
	/**
	 * 문자열 좌,우측의 모든 공백 문자 제거
	 *
	 * @static
	 * @method trim
	 * @param {String} _str
	 * @return {String} Returns string
	 * @example
	var trimTargetStr = "      dragmove      javascript      ";
	console.log(StringUtil.trim(trimTargetStr)); //dragmove      javascript
	 */
	StringUtil.trim = function(_str) {
		return _str.replace(/^\s+/, "").replace(/\s+$/, "");
	};
	
	/**
	 * 문자열의 이메일 유효성 검사
	 *
	 * @static
	 * @method checkEmail
	 * @param {String} _str
	 * @return {String} Returns string
	 * @example
	console.log(StringUtil.checkEmail(_value)); //_str parameter가 유효한 e-mail 주소 String일 경우, true 반환
	 */
	StringUtil.checkEmail = function(_str) {
		if(_str.indexOf("@") < 1){
			//console.log("[StringUtil.checkEmail] '@'문자가 빠지거나 맨 처음에 위치할 수 없습니다.");
			return false;
		}
		if(_str.indexOf(".") < -1){
			//console.log("[StringUtil.checkEmail] '.'문자가 빠지거나 맨 처음에 위치할 수 없습니다.");
			return false;
		}
		if(_str.indexOf("@") != _str.lastIndexOf("@")){
			//console.log("[StringUtil.checkEmail] '@'는 두 개이상 들어갈 수 없습니다.");
			return false;
		}
		if(_str.indexOf(".") - _str.indexOf("@") < 2){
			//console.log("[StringUtil.checkEmail] '.'이 '@'보다 먼저 위치할 수 없으며 '@' 바로 다음에 '.'이 위치할 수 없습니다.");
			return false;
		}
		if(_str.lastIndexOf(".") == _str.length-1){
			//console.log("[StringUtil.checkEmail] 마지막에 '.'이 위치할 수 없습니다.");
			return false;
		}
		
		var lastStrLength = _str.substr(_str.lastIndexOf(".")+1).length;
		if(lastStrLength < 2 || lastStrLength > 4){
			//console.log("[StringUtil.checkEmail] 도메인명의 마지막 문자는 영문 2~4개여야 합니다.");
			return false;
		}
		return true;
		
		//other way
		//return !_str || /^[a-z0-9_+.-]+\@([a-z0-9-]+\.)+[a-z0-9]{2,4}$/i.test(_str);
	};
	
	/**
	 * 문자열의 byte를 반환합니다.
	 *
	 * @static
	 * @method getBytes
	 * @param {String} $str
	 * @return {Number} Returns number
	 * @example
	var testStr = "1234567890"
	console.log("1234567890 : ", StringUtil.getBytes(testStr));
	
	testStr = "dragmove"
	console.log("dragmove : ", StringUtil.getBytes(testStr));
	
	testStr = "김현석"
	console.log("김현석 : ", StringUtil.getBytes(testStr));
	 */
	StringUtil.getBytes = function($str) {
		var str = $str;
		var bytes = 0;
		for(var i=0,max=$str.length; i<max; i++) {
			bytes += (str.charCodeAt(i)>128) ? 2 : 1;
		}
		return bytes;
	};
	
	/**
	 * 문자열의 byte를 반환합니다.
	 * 예를 들어, dog 라는 값은 cat 보다 큽니다. 
	 * 이것은 d가 c 보다 알파벳 상에서 더 뒤에 있기 때문입니다.
	 * 이는 한글을 비교할 때도 마찬가지입니다. 예를 들어, '다'는 '라'보다 작습니다.
	 * 같은 문자열을 대소문자로만 구분하는 경우에는 알파벳 순으로 대문자가 소문자보다 큽니다.
	 * 
	 * 0 : $compareTargetStr과 $otherStr이 100% 일치합니다.
	 * 1 : $compareTargetStr가 문자적으로 더 크다는 의미
	 * -1 : $otherStr가 문자적으로 더 크다는 의미
	 * 
	 * @static
	 * @method getCompareSortOrder
	 * @param {String} $compareTargetStr compare target string
	 * @param {String} $otherStr other string
	 * @return {Number} Returns -1 or 0 or 1
	 * @example
	 */
	StringUtil.getCompareSortOrder = function($compareTargetStr, $otherStr) {
		return $compareTargetStr.localCompare($otherStr);
	};
	
	return StringUtil;
});