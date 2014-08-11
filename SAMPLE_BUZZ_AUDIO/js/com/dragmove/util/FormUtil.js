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
	 * FormUtil
	 * @class FormUtil
	 * @constructor
	 */
	var FormUtil = exports;
	
	/**
	 * javascript input placeholder custom setting. 
	 *
	 * @static
	 * @method setCustomPlaceholder
	 * @param {jQuery input DOM array} $inputsSetPlaceholderAttr
	 * @return {Void}
	 * @example
	<!-- DOM -->
	<body>
		<div class="formContainer">
			<form id="form" method="post" action="">
				<fieldset class="registrationContentsFieldset">
					<legend>
						fieldset registrationContents
					</legend>
					<strong class="emailTitle">주민등록번호</strong>
					<div class="registrationContentsContainer">
						<input class="inputText registration_1" type="text" name="registration_1" maxlength="6" title="주민등록번호 앞자리" placeholder="앞자리"/>
						-
						<input class="inputText registration_2" type="text" name="registration_2" maxlength="7" title="주민등록번호 뒷자리" placeholder="뒷자리"/>
					</div>
				</fieldset>
			</form>
		</div>
	</body>
	
	<!-- CSS -->
	input::-webkit-input-placeholder {
		color:#f00;
	}
	input::-moz-placeholder {
		color:#f00;
	}
	input[placeholder], [placeholder], *[placeholder] {
		color:#f00;
	}
	
	<!-- JS -->
	var $inputs = $("input");
	FormUtil.setCustomPlaceholder($inputs);
	 */
	FormUtil.setCustomPlaceholder = function($inputsSetPlaceholderAttr) {
		$inputsSetPlaceholderAttr.each(function() {
			var input = $(this);
			$(input).val(input.attr('placeholder'));

			$(input).focus(function() {
				if(input.val() == input.attr('placeholder')) {
					input.val('');
				}
			});

			$(input).blur(function() {
				if(input.val() == '' || input.val() == input.attr('placeholder')) {
					input.val(input.attr('placeholder'));
				}
			});
		});
	}
	
	return FormUtil;
});