// 对应学生表的model定义js文件
'use strict';
/**
 * @author Taylor
 * @copyright Rong姐姐好漂亮
 * 
 */
module.exports = app => {
  // => 箭头函数
  // 曲构函数赋值，获取数据类型
  const { BIGINT, STRING } = app.Sequelize;
  // 定义学生模型
  const student = app.model.define('student', {
    id: {
      type: BIGINT,
      primaryKey: true, // 主键
    },
    stu_name: STRING, // 学生姓名
  }, {
    tableName: 'tbl_stu_info', //  对应数据库中的tbl_stu_info表
    freezeTableName: false,
    timestamps: false,
  });

  // 将student对象返回
  return student;
};
