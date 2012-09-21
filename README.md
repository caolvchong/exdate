#便捷的javascript date 处理工具

##目的
javascript 日期对象格式化，字符串转日期对象，日期格式检查，日期比较以及日期间隔的工具

##安装
1. 安装node，参见：https://github.com/joyent/node

2. 安装npm，参见：https://github.com/isaacs/npm

3. 安装xdate

     $ npm install xdate

##日期格式说明
Field        | Full Form          | Short Form
-------------|:------------------:|-----------------------:
Year         | yyyy (4 digits)    | yy (2 digits), y (2 or 4 digits)
Month        | MMM (name or abbr.)| MM (2 digits), M (1 or 2 digits)| NNN (abbr)
Day of Month | dd (2 digits)      | d (1 or 2 digits)
Day of Week  | EE (name)          | E (abbr)
Hour (1-12)  | hh (2 digits)      | h (1 or 2 digits)
Hour (0-23)  | HH (2 digits)      | H (1 or 2 digits)
Hour (0-11)  | KK (2 digits)      | K (1 or 2 digits)
Hour (1-24)  | kk (2 digits)      | k (1 or 2 digits)
Minute       | mm (2 digits)      | m (1 or 2 digits)
Second       | ss (2 digits)      | s (1 or 2 digits)
AM/PM        | a                  |

##API
### xdate.isLeap(year) 判断是否是闰年
    * @param {Integer} year
    * @return {Boolean} true 是闰年 false 不是闰年

### xdate.check(val, pattern) 检测是否是一个符合格式的日期字符串
    * @param {String} val 日期字符串
    * @param {String} pattern 日期格式, 可省略, 默认值 yyyy-MM-dd
    * @return {Boolean} true 是符合格式的日期字符串 false 不是

### xdate.compare(date1, date2) 比较两个日期的前后顺序
    * @param {Date} date1 起始日期
    * @param {Date} date2 结束日期
    * @return {Integer} -1 起始日期 > 结束日期; 0 起始日期 = 结束日期; 1 起始日期 < 结束日期

### xdate.stringCompare(string1, pattern1, string2, pattern2) 比较两个日期字符串的前后顺序
    * @param {String} string1 起始日期字符串
    * @param {String} pattern1 起始日期格式
    * @param {String} string2 结束日期字符串
    * @param {String} pattern2 结束日期格式
    * @return {Integer} -1 起始日期 > 结束日期; 0 起始日期 = 结束日期; 1 起始日期 < 结束日期

### xdate.stringToDate(val, pattern) 字符串转化为日期对象
    * @param {String} val 日期字符串
    * @param {String} pattern 对应的日期格式, 可省略, 默认值 yyyy-MM-dd
    * @return {Date} 日期对象,如果不能正确解析该字符串,返回0

### xdate.format(date, pattern) 格式化日期,将日期对象按照需要的格式输出
    * @param {Date} date 需要格式化输出的日期对象
    * @param {String} pattern 格式化字符串, 可省略, 默认值 yyyy-MM-dd
    * @return {String} 格式化后的字符串

### xdate.distance(date, n, unit) 距离给定的date的n个时间的日期
    * @param {Date} date 基准日期
    * @param {Integer} n n个时间
    * @param {String} unit 时间单位,默认天，具体单位分别是：y年，q季度，M月，h时，m分，s秒，w周，其他都是天
    * @return {Date} 日期对象

详细的使用参看sample中的例子