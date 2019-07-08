'use strict';
/**
 * @author Taylor
 * @copyright Rong姐姐好漂亮
 * 
 */

const Controller = require('egg').Controller;
class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hello, B站的朋友';
  }
}

module.exports = HomeController;
