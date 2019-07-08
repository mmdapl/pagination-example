/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1562555811087_3887';

  // add your middleware config here
  config.middleware = [];

  // 配置mysql数据库
  config.sequelize = {
    dialect: 'mysql',
    host: '142vip.cn',
    port: 3306,
    username: 'Taylor',
    password: 'Taylor2237221210',
    database: 'pagination_test',
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
