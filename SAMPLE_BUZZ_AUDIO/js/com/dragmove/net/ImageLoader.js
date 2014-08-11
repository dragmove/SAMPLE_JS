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
	 * ImageLoader
	 * @class ImageLoader
	 * @constructor
	 * 
	 * @example
	<!-- DOM -->
	<div class="container">
		<img class="sequence_1" src="img/seq_1.png" alt="" />
		<img class="sequence_2" src="img/seq_2.png" alt="" />
		<img class="sequence_3" src="img/seq_3.png" alt="" />
		<img class="sequence_4" src="img/seq_4.png" alt="" />
		<img class="sequence_5" src="img/seq_5.png" alt="" />
		<img class="sequence_6" src="img/seq_6.png" alt="" />
		<img class="sequence_7" src="img/seq_7.png" alt="" />
		<img class="sequence_8" src="img/seq_8.png" alt="" />
		<img class="sequence_9" src="img/seq_9.png" alt="" />
		<img class="sequence_10" src="img/seq_10.png" alt="" />
	</div>
	
	<!-- JS -->
	var _imageLoader;
	var _$container;
	
	$(document).ready(function() {
		init();
	});
	
	function init() {
		_$container = $(".container");
		
		_imageLoader = new ImageLoader();
		$(_imageLoader).bind(_imageLoader.LOAD_COMPLETE, imageLoaderHandler);
		$(_imageLoader).bind(_imageLoader.LOAD_PER_COMPLETE, imageLoaderHandler);
		$(_imageLoader).bind(_imageLoader.LOAD_ERROR, imageLoaderHandler);
		_imageLoader.init();
		
		var imgArr = $("img", _$container);
		var _img;
		for(var i=0, max=imgArr.length; i<max; i++) {
			_img = imgArr[i];
			_imageLoader.addURL(_img.src);
		}
		_imageLoader.start();
	}
	
	function imageLoaderHandler($evt) {
		switch($evt.type) {
			case _imageLoader.LOAD_COMPLETE :
				console.log("LOAD_COMPLETE");
				console.log(_imageLoader.getPercentageLoaded());
				console.log(_imageLoader.getFinished());
				console.log(_imageLoader.getLoadFailNum());
				console.log(_imageLoader.getLoadSuccessNum());
				
				//
				console.log(_imageLoader.getImageURLArr());
				console.log(_imageLoader.getLoadedImageArr());
			break;
			
			case _imageLoader.LOAD_PER_COMPLETE :
				console.log("LOAD_PER_COMPLETE");
				console.log(_imageLoader.getPercentageLoaded());
			break;
			
			case _imageLoader.LOAD_ERROR :
				console.log("LOAD_ERROR");
				console.log(_imageLoader.getPercentageLoaded());
			break;
		}
	}
	 */
	var ImageLoader = function() {
		var _this = this;
		
		/*
		 * Event
		 */
		_this.LOAD_COMPLETE = "ImageLoader_LOAD_COMPLETE";
		_this.LOAD_PER_COMPLETE = "ImageLoader_LOAD_PER_COMPLETE";
		_this.LOAD_ERROR = "ImageLoader_LOAD_ERROR";
		
		/**
		 * get MovieClip instance play finished
		 *
		 * @method getFinished
		 * @return {Boolean} Returns true or false
		 */
		_this.getFinished = function() {
			return isFinished;
		};
		
		/**
		 * get fail Number load image 
		 *
		 * @method getLoadFailNum
		 * @return {Number} Returns Number
		 */
		_this.getLoadFailNum = function() {
			return loadFailNum;
		};
		
		/**
		 * get success Number load image 
		 *
		 * @method getLoadSuccessNum
		 * @return {Number} Returns Number
		 */
		_this.getLoadSuccessNum = function() {
			return loadSuccessNum;
		};
		
		/**
		 * get Array include images url
		 *
		 * @method getImageURLArr
		 * @return {Array} Returns Array
		 */
		_this.getImageURLArr = function() {
			return imgURLArr;
		};
		
		/**
		 * get Array include loaded images 
		 *
		 * @method getLoadedImageArr
		 * @return {Array} Returns Array
		 */
		_this.getLoadedImageArr = function() {
			return loadedImgArr;
		};
		
		/**
		 * get percentage Number(0 ~ 1) 
		 *
		 * @method getPercentageLoaded
		 * @return {Number} Returns Number(0 ~ 1)
		 */
		_this.getPercentageLoaded = function() {
			return percentageLoaded;
		};
		
		var isLoading = false;
		var isFinished = false;
		
		var loadedImgArr;
		var imgArr;
		var imgURLArr;
		
		var loadingIndex = 0;
		var loadFailNum = 0;
		var loadSuccessNum = 0;
		var loadCompleteNum = 0;
		
		var percentageLoaded = 0;
		
		/**
		 * init ImageLoader instance
		 *
		 * @method init
		 * @return {Void}
		 */
		_this.init = function() {
			loadedImgArr = [];
			imgArr = [];
			imgURLArr = [];
		};
		
		/**
		 * add image url
		 *
		 * @method addURL
		 * @param {String} $imageURL image src string
		 * @return {Void}
		 */
		_this.addURL = function($imageURL) {
			imgURLArr.push($imageURL);
		};
		
		/**
		 * start load images
		 *
		 * @method start
		 * @return {Void}
		 */
		_this.start = function() {
			if(isLoading) return;
			isLoading = true;
			isFinished = false;
			loadNext();
		};
		
		/**
		 * destroy ImageLoader instance
		 *
		 * @method destroy
		 * @return {Void}
		 */
		_this.destroy = function() {
			if(isLoading) {
				var _img;
				for(var i=0, max=imgArr.length; i<max; i++) {
					_img = imgArr[i];
					if(_img) {
						_img.onload = null;
						_img.onerror = null;
					}
					_img = null;
				}
			}
			
			isLoading = false;
			isFinished = false;
			
			loadedImgArr = null;
			imgArr = null;
			imgURLArr = null;
			
			loadingIndex = 0;
			loadFailNum = 0;
			loadSuccessNum = 0;
			loadCompleteNum = 0;
			
			percentageLoaded = 0;
		};
		
		function loadNext() {
			if(loadingIndex >= imgURLArr.length) {
				isLoading = false;
				isFinished = true;
				
				var paramObj = {
					type:_this.LOAD_COMPLETE
				};
				$(_this).trigger(paramObj);
				return;
			}
			
			var _image = document.createElement("img");
			_image.onload = loadCompleteHandler;
			_image.onerror = loadErrorHandler;
			_image.src = imgURLArr[loadingIndex];
			imgArr.push(_image);
		}
		
		function loadCompleteHandler($evt) {
			$evt = ($evt) ? $evt : window.event;
			var _img = $evt.target;
			if(_img) loadedImgArr.push(_img);
			
			var paramObj = {
				type:_this.LOAD_PER_COMPLETE
			};
			$(_this).trigger(paramObj);
			
			loadingIndex++;
			loadSuccessNum++;
			loadCompleteNum++;
			
			percentageLoaded = loadCompleteNum / imgURLArr.length;
			loadNext();
		}
		
		function loadErrorHandler() {
			loadedImgArr.push(null);
			
			var paramObj = {
				type:_this.LOAD_ERROR
			};
			$(_this).trigger(paramObj);
			
			loadingIndex++;
			loadFailNum++;
			loadCompleteNum++;
			
			percentageLoaded = loadCompleteNum / imgURLArr.length;
			loadNext();
		}
		
		return _this;
	};
	
	return ImageLoader;
});
