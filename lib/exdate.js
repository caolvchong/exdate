/**
 * date lib
 *
 * 日期格式说明
 * -------------|--------------------|-----------------------
 * Field        | Full Form          | Short Form
 * -------------|--------------------|-----------------------
 * Year         | yyyy (4 digits)    | yy (2 digits), y (2 or 4 digits)
 * Month        | MMM (name or abbr.)| MM (2 digits), M (1 or 2 digits)| NNN (abbr)
 * Day of Month | dd (2 digits)      | d (1 or 2 digits)
 * Day of Week  | EE (name)          | E (abbr)
 * Hour (1-12)  | hh (2 digits)      | h (1 or 2 digits)
 * Hour (0-23)  | HH (2 digits)      | H (1 or 2 digits)
 * Hour (0-11)  | KK (2 digits)      | K (1 or 2 digits)
 * Hour (1-24)  | kk (2 digits)      | k (1 or 2 digits)
 * Minute       | mm (2 digits)      | m (1 or 2 digits)
 * Second       | ss (2 digits)      | s (1 or 2 digits)
 * AM/PM        | a                  |
 * -------------|--------------------|-----------------------
 */

// 月份的英文,前12个是全拼,后面12个是简写
var MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
// 星期的英文,前7个是全拼,后面7个是简写
var DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
/**
 * 给1位数字前加0
 * @param {Integer} x
 * @return {String} 处理好后的字符串
 */
var leftZero = function(x) {
    return (x < 0 || x > 9 ? '' : '0') + x
};

/**
 * 从str这个字符串中的i位置(包含,从0开始算)到max的字符串中获取从左边最长的字符串
 * @param {String} str 需要处理的字符串
 * @param {Integer} i
 * @param {Integer} min
 * @param {Integer} max
 */
var getLeftNum = function(str, i, min, max) {
    for(var x = max; x >= min; x--) {
        var token = str.substring(i, i + x);
        if(token.length < min) {
            return null;
        }
        if(/^\d+$/.test(token)) {
            return token;
        }
    }
    return null;
};

var r = {
    /**
     * 判断是否是闰年
     * @param {Integer} year
     * @return {Boolean} true 是闰年 false 不是闰年
     */
    isLeap: function(year) {
        return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
    },
    /**
     * 检测是否是一个符合格式的日期字符串
     * @param {String} val 日期字符串
     * @param {String} pattern 日期格式
     * @return {Boolean} true 是符合格式的日期字符串 false 不是
     */
    check: function(val, pattern) {
        var date = r.stringToDate(val, pattern);
        return date != 0;
    },
    /**
     * 比较两个日期的前后顺序
     * @param {Date} date1 起始日期
     * @param {Date} date2 结束日期
     * @return {Integer}
     *         -1    起始日期 > 结束日期
     *         0    起始日期 = 结束日期
     *         1    起始日期 < 结束日期
     */
    compare: function(date1, date2) {
        var t1 = date1.getTime(), t2 = date2.getTime();
        return t1 > t2 ? -1 : t1 < t2 ? 1 : 0;
    },
    /**
     * 比较两个日期字符串的前后顺序
     * @param {String} string1 起始日期字符串
     * @param {String} pattern1 起始日期格式
     * @param {String} string2 结束日期字符串
     * @param {String} pattern2 结束日期格式
     * @return {Integer}
     *         -1    起始日期 > 结束日期
     *         0    起始日期 = 结束日期
     *         1    起始日期 < 结束日期
     */
    stringCompare: function(string1, pattern1, string2, pattern2) {
        var date1 = r.stringToDate(string1, pattern1), date2 = r.stringToDate(string2, pattern2);
        return r.compare(date1, date2);
    },
    /**
     * 字符串转化为日期对象
     * @param {String} val 日期字符串
     * @param {String} pattern 对应的日期格式
     * @return {Date} 日期对象,如果不能正确解析该字符串,返回0
     */
    stringToDate: function(val, pattern) {
        // 输入日期字符串
        val = val + '';
        // 日期格式
        pattern = pattern || 'yyyy-MM-dd';
        var i_val = 0, i_pattern = 0, c = '', token = '', token2 = '', x, y, year = 1970, month = 1, date = 1, hh = 0, mm = 0, ss = 0, ampm = '';
        while(i_pattern < pattern.length) {
            // 挨个取字符,直到取到不一样的,形成token
            c = pattern.charAt(i_pattern);
            token = '';
            while((pattern.charAt(i_pattern) == c) && (i_pattern < pattern.length)) {
                token += pattern.charAt(i_pattern++);
            }
            if(token == 'yyyy' || token == 'yy' || token == 'y') { // 年
                if(token == 'yyyy') {
                    x = 4;
                    y = 4;
                }
                if(token == 'yy') {
                    x = 2;
                    y = 2;
                }
                if(token == 'y') {
                    x = 2;
                    y = 4;
                }
                // 取得val中的年
                year = getLeftNum(val, i_val, x, y);
                if(year == null) {
                    return 0;
                }
                i_val += year.length;
                if(year.length == 2) {
                    if(year > 70) {
                        year = 1900 + (year - 0);
                    } else {
                        year = 2000 + (year - 0);
                    }
                }
            } else if(token == 'MMM' || token == 'NNN') { // 英文月
                month = 0;
                for(var i = 0; i < MONTH_NAMES.length; i++) {
                    var month_name = MONTH_NAMES[i];
                    if(val.substring(i_val, i_val + month_name.length).toLowerCase() == month_name.toLowerCase()) {
                        if(token == 'MMM' || (token == 'NNN' && i > 11)) {
                            month = i + 1;
                            if(month > 12) {
                                month -= 12;
                            }
                            i_val += month_name.length;
                            break;
                        }
                    }
                }
                if((month < 1) || (month > 12)) {
                    return 0;
                }
            } else if(token == 'EE' || token == 'E') { // 星期
                for(var i = 0; i < DAY_NAMES.length; i++) {
                    var day_name = DAY_NAMES[i];
                    if(val.substring(i_val, i_val + day_name.length).toLowerCase() == day_name.toLowerCase()) {
                        i_val += day_name.length;
                        break;
                    }
                }
            } else if(token == 'MM' || token == 'M') { // 数字月
                month = getLeftNum(val, i_val, token.length, 2);
                if(month == null || (month < 1) || (month > 12)) {
                    return 0;
                }
                i_val += month.length;
            } else if(token == 'dd' || token == 'd') { // 号数
                date = getLeftNum(val, i_val, token.length, 2);
                if(date == null || (date < 1) || (date > 31)) {
                    return 0;
                }
                i_val += date.length;
            } else if(token == 'hh' || token == 'h') { // 小时(12小时制)
                hh = getLeftNum(val, i_val, token.length, 2);
                if(hh == null || (hh < 1) || (hh > 12)) {
                    return 0;
                }
                i_val += hh.length;
            } else if(token == 'HH' || token == 'H') { // 小时(24小时制)
                hh = getLeftNum(val, i_val, token.length, 2);
                if(hh == null || (hh < 0) || (hh > 23)) {
                    return 0;
                }
                i_val += hh.length;
            } else if(token == 'KK' || token == 'K') { // 小时(12小时制,12 = 0)
                hh = getLeftNum(val, i_val, token.length, 2);
                if(hh == null || (hh < 0) || (hh > 11)) {
                    return 0;
                }
                i_val += hh.length;
            } else if(token == 'kk' || token == 'k') { // 小时(24小时制,24 = 0)
                hh = getLeftNum(val, i_val, token.length, 2);
                if(hh == null || (hh < 1) || (hh > 24)) {
                    return 0;
                }
                i_val += hh.length;
                hh--;
            } else if(token == 'mm' || token == 'm') { // 分钟
                mm = getLeftNum(val, i_val, token.length, 2);
                if(mm == null || (mm < 0) || (mm > 59)) {
                    return 0;
                }
                i_val += mm.length;
            } else if(token == 'ss' || token == 's') { // 秒
                ss = getLeftNum(val, i_val, token.length, 2);
                if(ss == null || (ss < 0) || (ss > 59)) {
                    return 0;
                }
                i_val += ss.length;
            } else if(token == 'a') { // 早上/下午
                if(val.substring(i_val, i_val + 2).toLowerCase() == 'am') {
                    ampm = 'AM';
                } else if(val.substring(i_val, i_val + 2).toLowerCase() == 'pm') {
                    ampm = 'PM';
                } else {
                    return 0;
                }
                i_val += 2;
            } else {
                if(val.substring(i_val, i_val + token.length) != token) {
                    return 0;
                } else {
                    i_val += token.length;
                }
            }
        }
        // 已经匹配完,而后面还有字符串,说明输入格式有问题
        if(i_val != val.length) {
            return 0;
        }
        // 验证月份天数的合法性
        if(month == 2) { // 2月
            if(r.isLeap(year)) { // 闰年
                if(date > 29) {
                    return 0;
                }
            } else { // 非闰年
                if(date > 28) {
                    return 0;
                }
            }
        }
        if((month == 4) || (month == 6) || (month == 9) || (month == 11)) { // 4,6,9,11 是30天
            if(date > 30) {
                return 0;
            }
        }
        // 维护hh 24小时的格式
        if(hh < 12 && ampm == 'PM') {
            hh = hh - 0 + 12;
        } else if(hh > 11 && ampm == 'AM') {
            hh -= 12;
        }
        return new Date(year, month - 1, date, hh, mm, ss);
    },
    /**
     * 格式化日期,将日期对象按照需要的格式输出
     * @param {Date} date 需要格式化输出的日期对象
     * @param {String} pattern 格式化字符串
     * @return {String} 格式化后的字符串
     */
    format: function(date, pattern) {
        pattern = pattern || 'yyyy-MM-dd';
        var result = '', i_pattern = 0, c = '', token = '', y = date.getYear() + '', M = date.getMonth() + 1, d = date.getDate(), E = date.getDay(), H = date.getHours(), m = date.getMinutes(), s = date.getSeconds(), yyyy, yy, MMM, MM, dd, hh, h, mm, ss, ampm, HH, H, KK, K, kk, k, value = {};
        if(y.length < 4) {
            y = '' + (y - 0 + 1900);
        }
        value['y'] = '' + y;
        value['yyyy'] = y;
        value['yy'] = y.substring(2, 4);
        value['M'] = M;
        value['MM'] = leftZero(M);
        value['MMM'] = MONTH_NAMES[M - 1];
        value['NNN'] = MONTH_NAMES[M + 11];
        value['d'] = d;
        value['dd'] = leftZero(d);
        value['E'] = DAY_NAMES[E + 7];
        value['EE'] = DAY_NAMES[E];
        value['H'] = H;
        value['HH'] = leftZero(H);
        if(H == 0) {
            value['h'] = 12;
        } else if(H > 12) {
            value['h'] = H - 12;
        } else {
            value['h'] = H;
        }
        value['hh'] = leftZero(value['h']);
        if(H > 11) {
            value['K'] = H - 12;
        } else {
            value['K'] = H;
        }
        value['k'] = H + 1;
        value['KK'] = leftZero(value['K']);
        value['kk'] = leftZero(value['k']);
        if(H > 11) {
            value['a'] = 'PM';
        } else {
            value['a'] = 'AM';
        }
        value['m'] = m;
        value['mm'] = leftZero(m);
        value['s'] = s;
        value['ss'] = leftZero(s);
        while(i_pattern < pattern.length) {
            c = pattern.charAt(i_pattern);
            token = '';
            while((pattern.charAt(i_pattern) == c) && (i_pattern < pattern.length)) {
                token += pattern.charAt(i_pattern++);
            }
            if(value[token] != null) { // 获取对应token的值
                result = result + value[token];
            } else { // 将其他字符串跟上,比如分隔符
                result = result + token;
            }
        }
        return result;
    },
    /**
     * 距离给定的date的n个时间的日期
     * @param {Date} date 基准日期
     * @param {Integer} n n个时间
     * @param {String} unit 时间单位,默认天，具体单位分别是：y年，q季度，M月，h时，m分，s秒，w周，其他都是天
     * @return {Date} 日期对象
     */
    distance: function(date, n, unit) {
        var t = 0;
        if(unit == 'y') { //年
            var strArr = r.format(date, 'yyyy-MM-dd HH:mm:ss').split('-');
            var year = strArr[0] - 0 + n;
            return r.stringToDate(year + '-' + strArr[1] + '-' + strArr[2], 'yyyy-MM-dd HH:mm:ss');
        } else if(unit == 'q' || unit == 'M') { // 季度/月
            if(unit == 'q') {
                n *= 3;
            }
            var tm = n % 12;
            var ty = (n - tm) / 12;
            var strArr = r.format(date, 'yyyy-MM-dd HH:mm:ss').split('-');
            var year = strArr[0] - 0 + ty;
            var month = strArr[1] - 0 + tm;
            var tt = strArr[2].split(' ');
            var day = tt[0];
            if(month <= 0) {
                month += 12;
                year -= 1;
            } else if(month > 12) {
                month -= 12;
                year += 1;
            }
            if(month == 2) {
                if(r.isLeap(year)) {
                    day = day > 29 ? 29 : day;
                } else {
                    day = day > 28 ? 28 : day;
                }
            } else if(month == 4 || month == 6 || month == 9 || month == 11) {
                day = day > 30 ? 30 : day;
            } else {
                day = day > 31 ? 31 : day;
            }
            return r.stringToDate(year + '-' + leftZero(month) + '-' + day + ' ' + tt[1], 'yyyy-MM-dd HH:mm:ss');
        } else if(unit == 'h') { // 时
            t = 3600 * 1000 * n;
        } else if(unit == 'm') { // 分钟
            t = 60 * 1000 * n;
        } else if(unit == 's') { // 秒
            t = 1000 * n;
        } else if(unit == 'w') { // 周
            t = 7 * 24 * 3600 * 1000 * n;
        } else { // 天
            t = 24 * 3600 * 1000 * n;
        }
        return new Date(date.getTime() + t);
    },
    /**
     * 和当前时间比较, 返回更亲和的格式,如下:
     * 1小时之内: 显示 x秒前/x分钟前
     * 今天之内: 显示 今天 x时x分
     * 今年之内: 显示 x月x日 x时x分
     * 今年之前: 显示 x年x月x日 x时x分
     * @param date
     */
    xformat: function(date, i18n) {
        var nowDate = new Date();
        var now = +nowDate;
        var prev = +date;
        var second = Math.ceil((now - prev) / 1000);
        var result = '';
        if(second <= 60) {
            result = second + '秒前';
        } else {
            var minute = Math.floor(second / 60);
            if(minute <= 60) {
                result = minute + '分钟前';
            } else {
                var thisDate = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate(), 0, 0, 0);
                if(r.compare(thisDate, date) == -1) { // 比今天零点早，即今天之前
                    var year = nowDate.getFullYear();
                    var thisYear = new Date(year, 1, 1, 0, 0, 0);
                    if(r.compare(thisYear, date) == -1) { // 比今年1月1号零点早，即今年之前
                        result = r.format(date, 'yyyy-M-d HH:mm');
                    } else {
                        result = r.format(date, 'M-d HH:mm');
                    }
                } else {
                    result = '今天 ' + r.format(date, 'HH:mm');
                }
            }
        }
        return result;
    }
};

module.exports = r;