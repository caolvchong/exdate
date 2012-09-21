var exdate = require('../lib/exdate');

/**--------------------------------------------
 * 实例1：闰年检查
 * --------------------------------------------*/
console.log(exdate.isLeap(2012));
console.log(exdate.isLeap(2013));

/**--------------------------------------------
 * 实例2：日期字符串合法性检查
 * --------------------------------------------*/
console.log(exdate.check('2012-12-25'));
console.log(exdate.check('2012-1-25'));
console.log(exdate.check('2012-01-25'));
console.log(exdate.check('2012-12-25', 'yyyy/MM/dd'));
console.log(exdate.check('2012/12/25', 'yyyy/MM/dd'));

/**--------------------------------------------
 * 实例3：日期大小比较
 * --------------------------------------------*/
console.log(exdate.compare(new Date(2012, 3, 11), new Date(2012, 4, 11)));

/**--------------------------------------------
 * 实例4：日期字符串大小比较
 * --------------------------------------------*/
console.log(exdate.stringCompare('2012-3-11', 'yyyy-M-dd', '2012/04/11', 'yyyy/MM/dd'));

/**--------------------------------------------
 * 实例5：字符串转日期对象
 * --------------------------------------------*/
console.log(exdate.stringToDate('2012-03-11'));
console.log(exdate.stringToDate('2012/04/11', 'yyyy/MM/dd'));

/**--------------------------------------------
 * 实例6：日期格式化成字符串输出
 * --------------------------------------------*/
console.log(exdate.format(new Date()));
console.log(exdate.format(new Date(), 'yyyy/MM/dd HH:mm:ss'));

/**--------------------------------------------
 * 实例7：日期基准距离计算
 * --------------------------------------------*/
console.log(exdate.distance(new Date(), 25));
console.log(exdate.distance(new Date(), -2, 'M'));
console.log(exdate.distance(new Date(), 3, 'y'));

/**--------------------------------------------
 * 实例8：日期对象更友好展示
 * --------------------------------------------*/
console.log(exdate.xformat(new Date(new Date - 10 * 1000))); // 10秒前
console.log(exdate.xformat(new Date(new Date - 12 * 60 * 1000))); // 12分钟前
console.log(exdate.xformat(new Date(new Date - 65 * 60 * 1000))); // 65分钟前
console.log(exdate.xformat(new Date(new Date - 24 * 60 * 60 * 1000))); // 1天前
console.log(exdate.xformat(new Date(new Date - 5 * 24 * 60 * 60 * 1000))); // 5天前
console.log(exdate.xformat(new Date(new Date - 366 * 24 * 60 * 60 * 1000))); // 366天前
