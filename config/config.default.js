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
    // 注意修改数据库配置
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'pagination_test',
  };
  // 配置egg-view-ejs

  config.view = {
    mapping: {'.html': 'ejs'} //左边写成.html后缀，会自动渲染.html文件
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
