const {exec} = require('../db/mysql');


/**
 * 博客列表
 * @param author
 * @param keyword
 * @returns {Promise<T | never>}
 */
const getList = (author, keyword) => {


    let sql = `select * from blogs where 1=1 `;
    if (author) {
        sql += `and author='${author}' `
    }
    if (keyword) {
        sql += `and title like '%${keyword}%' `
    }
    sql += `order by createtime desc;`;

    // 返回 promise
    return exec(sql).then(row => {
        return row;
    })

};

/**
 * 博客详情
 * @param id
 * @returns {Promise<any> | *}
 */
const getDetail = (id) => {

    let sql = ` select * from blogs where id = '${id}' `;

    // 返回 promise
    return exec(sql)
};


/**
 * 新建博客
 * @param blogData
 * @returns {{id: number}}
 */
const newBlog = (blogData) => {
    // blogData  是一个博客  对象  包含title content 属性
    const {title, content, author, createTime = Date.now()} = blogData;

    let sql = ` insert into blogs (title,content,createTime,author) values('${title}','${content}',${createTime},'${author}');`;

    return exec(sql).then(insertData => {
        return {
            id: insertData.insertId
        }
    });
};


const updateBlog = (id, blogData) => {
    const {title, content} = blogData;

    let sql = ` update blogs set title='${title}', content='${content}' where id=${id}`;

    // id  更新博客的id
    // blogData  是一个博客  对象  包含title content 属性
    return exec(sql).then(updateData => {
        if (updateData.affectedRows > 0) {
            return true;
        } else {
            return true;
        }
    });
};
const delBlog = (id,author) => {
    let  sql = ` delete from blogs where id='${id}' and author='${author}'`;

    return exec(sql).then(delData => {
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