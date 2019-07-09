'use strict';
/**
 * @author Taylor
 * @copyright Rong姐姐好漂亮
 * 
 */

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    //this.ctx.body = 'hello, B站的朋友';
    //定向跳转
    //this.ctx.body=0;
    await this.ctx.redirect('index.html')

  }
}

module.exports = HomeController;