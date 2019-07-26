const {exec} = require('../db/mysql');


/**
 * 博客列表
 * @param author
 * @param keyword
 * @returns {Promise<T | never>}
 */
const getList = async (author, keyword) => {


    let sql = `select * from blogs where 1=1 `;
    if (author) {
        sql += `and author='${author}' `
    }
    if (keyword) {
        sql += `and title like '%${keyword}%' `
    }
    sql += `order by createtime desc;`;

    // 返回 promise
    // return exec(sql).then(row => {
    //     return row;
    // })
    return await exec(sql);

};

/**
 * 博客详情
 * @param id
 * @returns {Promise<any> | *}
 */
const getDetail = async (id) => {

    let sql = ` select * from blogs where id = '${id}' `;

    // 返回 promise

    return await exec(sql).then(row => {
        return row[0];
    })
};


/**
 * 新建博客
 * @param blogData
 * @returns {{id: number}}
 */
const newBlog = async (blogData) => {
    // blogData  是一个博客  对象  包含title content 属性
    const {title, content, author, createTime = Date.now()} = blogData;

    let sql = ` insert into blogs (title,content,createTime,author) values('${title}','${content}',${createTime},'${author}');`;

    return await exec(sql).then(insertData => {
        return {
            id: insertData.insertId
        }
    });
};


const updateBlog = async (id, blogData) => {
    const {title, content} = blogData;

    let sql = ` update blogs set title='${title}', content='${content}' where id=${id}`;


    const updateData = await exec(sql);

    if (updateData.affectedRows > 0) {
        return true;
    } else {
        return true;
    }
};
const delBlog = async (id, author) => {
    let sql = ` delete from blogs where id='${id}' and author='${author}'`;

    return await exec(sql).then(delData => {
        if (delData.affectedRows > 0) {
            return true;
        } else {
            return true;
        }
    });
};

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
};
