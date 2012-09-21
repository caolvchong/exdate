var xdate = require('../lib/xdate');

/**--------------------------------------------
 * 实例1：闰年检查
 * --------------------------------------------*/
console.log(xdate.isLeap(2012));
console.log(xdate.isLeap(2013));

/**--------------------------------------------
 * 实例2：日期字符串合法性检查
 * --------------------------------------------*/
console.log(xdate.check('2012-12-25'));
console.log(xdate.check('2012-1-25'));
console.log(xdate.check('2012-01-25'));
console.log(xdate.check('2012-12-25', 'yyyy/MM/dd'));
console.log(xdate.check('2012/12/25', 'yyyy/MM/dd'));

/**--------------------------------------------
 * 实例3：日期大小比较
 * --------------------------------------------*/
console.log(xdate.compare(new Date(2012, 3, 11), new Date(2012, 4, 11)));

/**--------------------------------------------
 * 实例4：日期字符串大小比较
 * --------------------------------------------*/
console.log(xdate.stringCompare('2012-3-11', 'yyyy-M-dd', '2012/04/11', 'yyyy/MM/dd'));

/**--------------------------------------------
 * 实例5：字符串转日期对象
 * --------------------------------------------*/
console.log(xdate.stringToDate('2012-03-11'));
console.log(xdate.stringToDate('2012/04/11', 'yyyy/MM/dd'));

/**--------------------------------------------
 * 实例6：日期格式化成字符串输出
 * --------------------------------------------*/
console.log(xdate.format(new Date()));
console.log(xdate.format(new Date(), 'yyyy/MM/dd HH:mm:ss'));

/**--------------------------------------------
 * 实例7：日期基准距离计算
 * --------------------------------------------*/
console.log(xdate.distance(new Date(), 25));
console.log(xdate.distance(new Date(), -2, 'M'));
console.log(xdate.distance(new Date(), 3, 'y'));
