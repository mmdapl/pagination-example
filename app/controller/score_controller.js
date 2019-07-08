'use strict';
/**
 * @author Taylor
 * @copyright Rong姐姐好漂亮
 * 
 */
const Controller = require('egg').Controller;
//  成绩表的控制器，接口的具体实现
class ScoreController extends Controller {
  // 成绩信息的插入
  async insertScore(){
    // 获取待插入的成绩信息，利用get请求
   const {subjectName,subjectScore,stuId}=this.ctx.query;
   // 获取当前时间的13位时间戳，用作成绩表中的成绩主键信息；
   const id=(new Date()).getTime();
   // 利用sequelize插入
   //另外一种方式：采用捕获异常的方式来判断是否插入成功，
    try {
        const score=await this.ctx.model.TblScoreInfo.create({
          id:id,
          subject_name:subjectName,
          subject_score:subjectScore,
          stu_id:stuId
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
    } catch (error) {
      //如果出现插入异常，也会导致插入失败，即捕获抛出信息
      //插入失败
      this.ctx.body={
        code:1,
        message:'学生信息插入失败',
        data:error
      }
    }
  }
}

module.exports = ScoreController;
