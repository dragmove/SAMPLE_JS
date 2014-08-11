var dragmove;
if(!dragmove) dragmove = {};
if(!dragmove.data) dragmove.data = {};
if(!dragmove.data.LanguageData) dragmove.data.LanguageData = {};
if(!dragmove.data.DateData) dragmove.data.DateData = {};

var LanguageDataDM;
var DateDataDM;

if(!LanguageDataDM) {
	LanguageDataDM = dragmove.data.LanguageData;
}else{
	throw new Error("LanguageDataDM already exists");
}

if(!DateDataDM) {
	DateDataDM = dragmove.data.DateData;
}else{
	throw new Error("DateDataDM already exists");
}


/*
korean hangul 초성 - ["ㄱ","ㄲ","ㄴ","ㄷ","ㄸ","ㄹ","ㅁ","ㅂ","ㅃ","ㅅ","ㅆ","ㅇ","ㅈ","ㅉ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"];
korean hangul 중성 - ["ㅏ","ㅐ","ㅑ","ㅒ","ㅓ","ㅔ","ㅕ","ㅖ","ㅗ","ㅘ","ㅙ","ㅚ","ㅛ","ㅜ","ㅝ","ㅞ","ㅟ","ㅠ","ㅡ","ㅢ","ㅣ"];
korean hangul 종성 - [" ","ㄱ","ㄲ","ㄳ","ㄴ","ㄵ","ㄶ","ㄷ","ㄹ","ㄺ","ㄻ","ㄼ","ㄽ","ㄾ","ㄿ","ㅀ","ㅁ","ㅂ","ㅄ","ㅅ","ㅆ","ㅇ","ㅈ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"];
*/
dragmove.data.LanguageData.INITIAL_JAMO_KOR = ["ㄱ","ㄲ","ㄴ","ㄷ","ㄸ","ㄹ","ㅁ","ㅂ","ㅃ","ㅅ","ㅆ","ㅇ","ㅈ","ㅉ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"];
dragmove.data.LanguageData.MEDIAL_JAMO_KOR = ["ㅏ","ㅐ","ㅑ","ㅒ","ㅓ","ㅔ","ㅕ","ㅖ","ㅗ","ㅘ","ㅙ","ㅚ","ㅛ","ㅜ","ㅝ","ㅞ","ㅟ","ㅠ","ㅡ","ㅢ","ㅣ"];
dragmove.data.LanguageData.FINAL_JAMO_KOR = [" ","ㄱ","ㄲ","ㄳ","ㄴ","ㄵ","ㄶ","ㄷ","ㄹ","ㄺ","ㄻ","ㄼ","ㄽ","ㄾ","ㄿ","ㅀ","ㅁ","ㅂ","ㅄ","ㅅ","ㅆ","ㅇ","ㅈ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"];

dragmove.data.DateData.DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
dragmove.data.DateData.DAYS_ABBREVIATED = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
dragmove.data.DateData.DAYS_KOR = ["일", "월", "화", "수", "목", "금", "토"];
dragmove.data.DateData.MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
dragmove.data.DateData.MONTHS_ABBREVIATED = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
dragmove.data.DateData.DAYSINMONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
dragmove.data.DateData.MIN_TO_SEC = 60;
dragmove.data.DateData.HOUR_TO_SEC = 3600; //60 * 60
dragmove.data.DateData.DAY_TO_SEC = 86400; //60 * 60 * 24