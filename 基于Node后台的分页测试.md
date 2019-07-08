# 基于Node后台的分页测试

 1.新建项目文件夹pagination-test

```javascript
//采用cmd命令新建文件夹
mkdir pagination-test
//当然也可以直接通过鼠标右键新建pagination-test文件夹
```

2.进入pagination-test文件夹，初始化基本的egg结构

```javascript
// 为方便快速开发，使用阿里的egg框架，当然原生的也可以，常见的还有koa、express等；
// 切换目录，用cd指令
cd pagination-test
//进入到pagination-test目录中，构建基本egg项目结构(基本要求：已经安装npm或者cnpm)
npm init egg --type=simple
```

3.基本执行过程（这里是通过VS Code终端来执行cmd指令，原理一样）；

![1562556274385](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1562556274385.png)

4.基本egg结构如下（只配置基本路由router）：

![1562556321405](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1562556321405.png)

5.虽然项目项目后台接口比较简单，但是仍然采用MVC的模式

```javascript
//egg中仍然后MVC三层模式，即:controller、model、view(可以通过ejs等模板来渲染)
// egg中基本的路由配置，即：初始化配置
'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
};
```

6.先启动默认效果，预览一下

```javascript
//可以通过指令启动egg服务，
      - cd C:\Users\Administrator\Desktop\pagination-test 
      - npm install 
      - npm start / npm run dev / npm test
//controller中的简单的接口实现
'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    // 接口相应
    ctx.body = 'hello, B站的朋友';
  }
}
module.exports = HomeController;
```

![1562556949544](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1562556949544.png)

7.基本的egg开发结构已经构建，完成数据库表的字段的基本定义；

````mysql
/*
 Navicat MySQL Data Transfer

 Source Server         : 服务器
 Source Server Type    : MySQL
 Source Server Version : 50726
 Source Host           : XXXXXXXX
 Source Schema         : pagination_test

 Target Server Type    : MySQL
 Target Server Version : 50726
 File Encoding         : 65001

 Date: 08/07/2019 11:37:10
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for tbl_score_info 学生成绩表
-- ----------------------------
DROP TABLE IF EXISTS `tbl_score_info`;
CREATE TABLE `tbl_score_info`  (
  `id` bigint(20) NOT NULL COMMENT '成绩ID，主键',
  `subject_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '学科名称',
  `subject_score` int(255) NOT NULL COMMENT '成绩得分',
  `stu_id` bigint(20) NOT NULL COMMENT '学生ID，tbl_stu_info表的外键',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for tbl_stu_info  学生信息表
-- ----------------------------
DROP TABLE IF EXISTS `tbl_stu_info`;
CREATE TABLE `tbl_stu_info`  (
  `stu_id` bigint(20) NOT NULL COMMENT '学生ID',
  `stu_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '学生姓名',
  PRIMARY KEY (`stu_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
-- 预计在分页的时候会实现多表的联合查询（这里只演示两个表）
````

8.分别在app文件夹下面创建好model、controller、view、service(在MVC架构中，可以省略这层)文件夹，构建基础目录

![1562557484479](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1562557484479.png)

9.利用egg中的sequelize模块来设置好基本的连接池参数和model层中的数据库表的模型，[sequelize API文档](https://eggjs.org/zh-cn/tutorials/sequelize.html)；

````javascript
// 安装sequelize模块
npm install --save egg-sequelize mysql2
//在 config/plugin.js 中引入 egg-sequelize 插件
exports.sequelize = {
  enable: true,
  package: 'egg-sequelize',
};
//在 config/config.default.js 中编写 sequelize 配置
config.sequelize = {
  dialect: 'mysql',
  host: '127.0.0.1', // 数据库地址
  port: 3306, // 端口号
  username:'Taylor', // 用户名
  password:'Taylor2237221210' // 密码
  database: 'egg-sequelize-doc-default',
};
````

![1562558089948](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1562558089948.png)

10.演示的Demo中有tbl_score_info(成绩表)、tbl_stu_info(学生信息表)，对应着两个表的model，按照分层的思路，应该有着对应的controller和model（可以生路service的部分）

![1562577850098](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1562577850098.png)

11.路由接口，定义controller中的基本查询，插入方法

```javascript
'use strict';

/**
 * @author Taylor
 * @copyright Rong姐姐好漂亮
 * 
 */
const Controller = require('egg').Controller;
// 学生表的控制器，学生信息接口的逻辑处理
class StudentController extends Controller {
  // 学生信息的插入
  async insertStu(){
      // 获取待插入的学生信息，利用get请求
     const stuName=this.ctx.query.student_name;
     console.log(stuName);
     
     // 获取当前时间的13位时间戳，用作学生表中的学生主键信息；
     const stuId=(new Date()).getTime();
     // 利用sequelize插入
     const student=await this.ctx.model.TblStudentInfo.create({
         stu_id:stuId,
         stu_name:stuName,
     });
     // 通过student的返回结果来判断是否插入成功
     if(student.stu_id != undefined){
         this.ctx.body={
             code:0,
             message:'学生信息插入成功',
             data:student
         }
     }else{
         //插入失败
         this.ctx.body={
            code:1,
            message:'学生信息插入失败',
            data:''
        }
     }
  }
  // 两表联合查询，方法一：自定义sql查询语句
  async queryPaginationOne(){
      //获取查询的起始位置，和一页显示的数据；
      let {offsetIndex,limitIndex} =this.ctx.query;
      // 处理参数
      if(!offsetIndex>0){
        offsetIndex=0
      }
      if(!limitIndex<30){
        limitIndex=30
      }
      //定义学生成绩信息的总记录数,左连接；
      const queryCountSql="SELECT count(tbl_stu_info.stu_id) as 'count' from tbl_stu_info LEFT JOIN tbl_score_info on tbl_stu_info.stu_id=tbl_score_info.stu_id ";
      // 定义分页查询的SQL
      const queryPaginationSql="SELECT tbl_stu_info.stu_id,tbl_stu_info.stu_name,tbl_score_info.subject_name,tbl_score_info.subject_score "+
                                "from tbl_stu_info LEFT JOIN tbl_score_info on tbl_stu_info.stu_id=tbl_score_info.stu_id order by tbl_stu_info.stu_name desc limit "+
                                offsetIndex + " , "+limitIndex;
      //获取两表联合起来的总记录数
      const countResult= await this.app.model.query(queryCountSql);
      //获取某一页展示的数据
      const result=await this.app.model.query(queryPaginationSql);
      console.log(countResult);
      console.log(result)      
      //判断结构
      if(countResult.length!=0&&result.length!=0){
          this.ctx.body={
              code:0,
              message:'自定义SQL查询的分页数据',
              data:{
                  total:countResult[0][0].count,
                  rows:result[0],
              }
          }
      }else{
        this.ctx.body={
            code:1,
            message:'无法通过自定义SQL查询分页数据',
            data:''
        }
      }
    }
  // 两表联合查询 方法二：用sequelize中提供的联合查询，已封装
  async queryPaginationTwo(){
    //获取查询的起始位置，和一页显示的数据；
    let {offsetIndex,limitIndex} =this.ctx.query;
    // 处理参数
    if(!offsetIndex>0){
        offsetIndex=0
    }
    if(!limitIndex<30){
        limitIndex=30
    }
    const score = this.ctx.model.TblScoreInfo;
    const student =this.ctx.model.TblStudentInfo;
    //查询问题，待完成；
    const result= await this.ctx.model.TblStudentInfo.findAndCountAll({
        order:[['stu_name','desc']],
        limit:30,
        offset:0,
        include:[{
            association:score.belongsTo(student,{
                foreignKey:'id',
                targetKey:'id'
            })
        }]
    });
    this.ctx.body=result
  }

  // 两表联合查询,查询全部，自定义sql查询语句
  async queryAllOne(){
    //定义学生成绩信息的总记录数,左连接；
    const queryCountSql="SELECT count(tbl_stu_info.stu_id) as 'count' from tbl_stu_info LEFT JOIN tbl_score_info on tbl_stu_info.stu_id=tbl_score_info.stu_id ";
    // 定义分页查询的SQL
    const queryPaginationSql="SELECT tbl_stu_info.stu_id,tbl_stu_info.stu_name,tbl_score_info.subject_name,tbl_score_info.subject_score "+
                              "from tbl_stu_info LEFT JOIN tbl_score_info on tbl_stu_info.stu_id=tbl_score_info.stu_id order by tbl_stu_info.stu_name desc "
    //获取两表联合起来的总记录数
    const countResult= await this.app.model.query(queryCountSql);
    //获取某一页展示的数据
    const result=await this.app.model.query(queryPaginationSql);
    console.log(countResult);
    console.log(result)      
    //判断结构
    if(countResult.length!=0&&result.length!=0){
        this.ctx.body={
            code:0,
            message:'自定义SQL查询的全部数据',
            data:{
                total:countResult[0][0].count,
                rows:result[0],
            }
        }
    }else{
      this.ctx.body={
          code:1,
          message:'无法通过自定义SQL查询全部数据',
          data:''
      }
    }
  }
}
module.exports = StudentController;

```

```json
//简单的查询结构，
{
    "code":0,
    "message":"自定义SQL查询的全部数据",
    "data":{
        "total":6,
        "rows":[
            {
                "stu_id":1562565758824,
                "stu_name":"张三",
                "subject_name":"英语",
                "subject_score":99
            },
            {
                "stu_id":1562565758824,
                "stu_name":"张三",
                "subject_name":"语文",
                "subject_score":98
            },
            {
                "stu_id":1562565758824,
                "stu_name":"张三",
                "subject_name":"数学",
                "subject_score":88
            },
            {
                "stu_id":1562565559665,
                "stu_name":"Bilibili",
                "subject_name":"英语",
                "subject_score":99
            },
            {
                "stu_id":1562565559665,
                "stu_name":"Bilibili",
                "subject_name":"数学",
                "subject_score":88
            },
            {
                "stu_id":1562565559665,
                "stu_name":"Bilibili",
                "subject_name":"语文",
                "subject_score":98
            }
        ]
    }
}
```

**特别说明**

为了同时演示自定义分页和利用Bootstrap-table控件分页，我将接口data部分的返回json数据格式同时约束如下（即：Bootstrap-table控件要求的格式）：

```javascript
// 为了适配boostrap-table的后台分页，所以分页的格式定义为如下：
{
    rows:data, //存放的是后台返回的数据

    total:total //存放的是总的数据条数

}
```

13.配置egg-view-ejs模板渲染，实现接口路由的时候，能够渲染view视图中的模板

```javascript
// cmd 安装命令
npm install egg-view-ejs
// 在config/plugin.js中配置
exports.ejs={
    enable:true,
    package:'egg-view-ejs'
}
// 在config/config.default.js中配置
config.view={
    mapping:{
        //配置模板引擎的后缀html
        '.hmtl':'ejs'
    }
}
```

![1562579035468](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1562579035468.png)

12.前端页面采用Bootstrap的简单样式

