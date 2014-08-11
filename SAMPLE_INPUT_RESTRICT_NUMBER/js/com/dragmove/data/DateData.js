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
	 * DateData
	 * @class DateData
	 * @constructor
	 */
	var DateData = exports;
	
	/**
	* English days
	* 
	* @property DateData.DAYS
	* @type {Array}
	* @default ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	*/
	DateData.DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	
	/**
	* English abbreviated days
	* 
	* @property DateData.DAYS_ABBREVIATED
	* @type {Array}
	* @default ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
	*/
	DateData.DAYS_ABBREVIATED = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
	
	/**
	* Korean days
	* 
	* @property DateData.DAYS_KOR
	* @type {Array}
	* @default ["일", "월", "화", "수", "목", "금", "토"];
	*/
	DateData.DAYS_KOR = ["일", "월", "화", "수", "목", "금", "토"];
	
	/**
	* English months
	* 
	* @property DateData.MONTHS
	* @type {Array}
	* @default ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	*/
	DateData.MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	
	/**
	* English abbreviated months
	* 
	* @property DateData.MONTHS_ABBREVIATED
	* @type {Array}
	* @default ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	*/
	DateData.MONTHS_ABBREVIATED = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	
	/**
	* Days in month
	* 
	* @property DateData.DAYSINMONTH
	* @type {Array}
	* @default [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	*/
	DateData.DAYSINMONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	
	/**
	* 1 Minute to Sec unit - 60 Sec
	* 
	* @property DateData.MIN_TO_SEC
	* @type {Number}
	* @default 60
	*/
	DateData.MIN_TO_SEC = 60;
	
	/**
	* 1 Hour to Sec unit - 360 Sec 
	* 
	* @property DateData.HOUR_TO_SEC
	* @type {Number}
	* @default 86400 (60 * 60)
	*/
	DateData.HOUR_TO_SEC = 3600; //60 * 60
	
	/**
	* 1 Day to Sec unit - 8640 Sec
	* 
	* @property DateData.DAY_TO_SEC
	* @type {Number}
	* @default 86400 (60 * 60 * 24)
	*/
	DateData.DAY_TO_SEC = 86400; //60 * 60 * 24
	
	return DateData;
});