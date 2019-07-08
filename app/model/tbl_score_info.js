// 对应成绩表的model定义js文件
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
  const score = app.model.define('score', {
    stu_id: {
      type: BIGINT,
      primaryKey: true, // 主键，成绩ID
    },
    subject_name: STRING, // 科目
    subject_score: STRING, // 成绩分数
    stu_id: BIGINT, // 学生ID
  }, {
    tableName: 'tbl_score_info', //  对应数据库中的tbl_score_info表
    freezeTableName: false,
    timestamps: false,
  });

  // 将成绩score对象返回
  return score;
};
