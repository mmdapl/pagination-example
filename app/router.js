'use strict';

/**
 * @param {Egg.Application} app - egg application
 * @author Taylor
 * @copyright Rong姐姐好漂亮
 * 
 */
module.exports = app => {
  const { router, controller } = app;

  router.get('/', controller.home.index);
  // 学生信息插入
  router.get('/insertStu',controller.studentController.insertStu)
  // 成绩信息的插入
  router.get('/insertScore',controller.scoreController.insertScore)
  // 成绩表和学生表联合查询，真分页接口，一页一页的查
  // 方法一
  router.get('/query_true_one',controller.studentController.queryPaginationOne);
  // 方法二(sequelize联合查询重点，待完善)
  router.get('/query_true_two',controller.studentController.queryPaginationTwo);
  
  // 成绩表和学生表联合查询，假分页接口，一次性全部查（不推荐，只是简单提供一下处理思路）
  router.get('/query_false_one',controller.studentController.queryAllOne);
};
