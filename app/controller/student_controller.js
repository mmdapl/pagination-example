'use strict';

/**
 * @author Taylor
 * @copyright Rong姐姐好漂亮
 * 
 */
const Controller = require('egg').Controller;
const sequelize = require('Sequelize');
// 学生表的控制器，学生信息接口的逻辑处理
class StudentController extends Controller {
    // 学生信息的插入
    async insertStu() {
        // 获取待插入的学生信息，利用get请求
        const stuName = this.ctx.query.student_name;
        console.log(stuName);

        // 获取当前时间的13位时间戳，用作学生表中的学生主键信息；
        const stuId = (new Date()).getTime();
        // 利用sequelize插入
        const student = await this.ctx.model.TblStudentInfo.create({
            stu_id: stuId,
            stu_name: stuName,
        });
        // 通过student的返回结果来判断是否插入成功
        if (student.stu_id != undefined) {
            this.ctx.body = {
                code: 0,
                message: '学生信息插入成功',
                data: student
            }
        } else {
            //插入失败
            this.ctx.body = {
                code: 1,
                message: '学生信息插入失败',
                data: ''
            }
        }
    }
    // 单独查询学生表中的学生ID,即：获取所有ID
    async queryStuID() {
        // 用sequelize提供的方法，findAll查找
        const backData = await this.ctx.model.TblStudentInfo.findAll({
            //只查询id列;
            attributes: ['stu_id']
        });
        //判空
        if (backData != undefined) {
            //查询出结果
            this.ctx.body = {
                code: 0,
                message: '查询学生所有的ID信息',
                data: backData
            }
        } else {
            //查询失败
            this.ctx.body = {
                code: 1,
                message: '查询学生所有的ID信息',
                data: ''
            }
        }
    }
    // 两表联合查询，方法一：自定义sql查询语句
    async queryPaginationOne() {
        //获取查询的起始位置，和一页显示的数据；
        let {
            offsetIndex,
            limitIndex
        } = this.ctx.query;
        // 处理参数
        if (offsetIndex < 0) {
            offsetIndex = 0
        }
        //定义学生成绩信息的总记录数,左连接；
        const queryCountSql = "SELECT count(tbl_stu_info.stu_id) as 'count' from tbl_stu_info LEFT JOIN tbl_score_info on tbl_stu_info.stu_id=tbl_score_info.stu_id ";
        // 定义分页查询的SQL
        const queryPaginationSql = "SELECT tbl_stu_info.stu_id,tbl_stu_info.stu_name,tbl_score_info.subject_name,tbl_score_info.subject_score " +
            "from tbl_stu_info LEFT JOIN tbl_score_info on tbl_stu_info.stu_id=tbl_score_info.stu_id order by tbl_stu_info.stu_name desc limit " +
            offsetIndex + " , " + limitIndex;
        //获取两表联合起来的总记录数
        const countResult = await this.app.model.query(queryCountSql);
        //获取某一页展示的数据
        const result = await this.app.model.query(queryPaginationSql);
        console.log(countResult);
        console.log(result)
        //判断结构
        if (countResult.length != 0 && result.length != 0) {
            this.ctx.body = {
                code: 0,
                message: '自定义SQL查询的分页数据',
                data: {
                    total: countResult[0][0].count,
                    rows: result[0],
                }
            }
        } else {
            this.ctx.body = {
                code: 1,
                message: '无法通过自定义SQL查询分页数据',
                data: ''
            }
        }
    }
    // 两表联合查询 方法二：用sequelize中提供的联合查询，已封装
    async queryPaginationTwo() {
        //获取查询的起始位置，和一页显示的数据；
        let {
            offsetIndex,
            limitIndex
        } = this.ctx.query;
        // 处理参数
        offsetIndex = parseInt(offsetIndex) || 1;
        limitIndex = parseInt(limitIndex) || 5;

        //查询问题，待完成;(已解决)
        //association:this.ctx.model.TblScoreInfo.belongsTo(this.ctx.model.TblScoreInfo
        // 应该是student表调用findAndCountAll()方法，与score表连接，所以，在belongsTo()中，应该处理好score model的主外键关联

        const result = await this.ctx.model.TblStudentInfo.findAndCountAll({
            order: [
                ['stu_name', 'desc']
            ],
            limit: limitIndex,
            offset: offsetIndex,
            include: [{
                association: this.ctx.model.TblScoreInfo.belongsTo(this.ctx.model.TblScoreInfo, {
                    foreignKey: 'stu_id',
                    targetKey: 'stu_id'
                }),
                // 设置结果列字段
                attributes: [
                    ['subject_name', 'subject_name'],
                    ['subject_score', 'subject_score'],
                ]
            }],
            // 设置结果列字段
            attributes: [
                ['stu_id', 'stu_id'],
                ['stu_name', 'stu_name'],
            ]
        });
        if (result != undefined) {
            //查询成功
            this.ctx.body = {
                code: 0,
                message: 'sequelize联表查询分页数据',
                data: {
                    total: result.count,
                    rows: result.rows
                }
            }
        } else {
            //查询失败
            this.ctx.body = {
                code: 1,
                message: 'sequelize联表查询分页数据出错',
                data: ''
            }
        }

    }

    // 两表联合查询,查询全部，自定义sql查询语句(可用于Bootstrap-table前端分页)
    async queryAllOne() {
        // 直接关联表来查询
        const result = await this.ctx.model.TblStudentInfo.findAndCountAll({
            order: [
                ['stu_name', 'desc']
            ],
            // 查询所有
            //  limit:-1,
            //  offset:1,
            include: [{
                association: this.ctx.model.TblScoreInfo.belongsTo(this.ctx.model.TblScoreInfo, {
                    foreignKey: 'stu_id',
                    targetKey: 'stu_id',
                }),
                // 设置结果列字段
                attributes: [
                    ['subject_name', 'subject_name'],
                    ['subject_score', 'subject_score'],
                ]
            }],
            // 设置结果列字段
            attributes: [
                ['stu_id', 'stu_id'],
                ['stu_name', 'stu_name'],
            ]
        });
        //判断结果
        if (result != undefined) {
            this.ctx.body = {
                code: 0,
                message: '自定义SQL查询的全部数据',
                data: {
                    total: result.count,
                    rows: result.rows
                }
            }
        } else {
            this.ctx.body = {
                code: 1,
                message: '无法通过自定义SQL查询全部数据',
                data: ''
            }
        }
    }
}

module.exports = StudentController;