'use strict';

/** @type Egg.EggPlugin */
// module.exports = {
//   // had enabled by egg
//   // static: {
//   //   enable: true,
//   // }
// };


// 数据库配置
exports.sequelize = {
  enable: true,
  package: 'egg-sequelize',
};
// ejs配置
exports.ejs = {
  enable: true,
  package: 'egg-view-ejs',
};