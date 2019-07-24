const {getList, getDetail, newBlog, updateBlog, delBlog} = require('../controller/blog');
const {SuccessModel, ErrorModel} = require('../model/resModel');

//统一的登录验证函数

const loginCheck = (req) => {
    if (!req.session.username) {
        return Promise.resolve(new ErrorModel('尚未登录'));
    }

};

const handleBlogRouter = (req, res) => {
    const method = req.method;
    const id = req.query.id || '';
    const loginCheckResult = loginCheck(req);


    //  获取博客列表
    if (method === 'GET' && req.path === '/api/blog/list') {
        const author = req.query.author || '';
        const keyword = req.query.keyword || '';
        // const listData = getList(author, keyword);
        // return new SuccessModel(listData);
        const result = getList(author, keyword);
        return result.then(listData => {
            return new SuccessModel(listData);
        })
    }


    //  获取博客详情
    if (method === 'GET' && req.path === '/api/blog/detail') {

        // const data = getDetail(id);
        // return new SuccessModel(data);

        const result = getDetail(id);

        return result.then(data => {
            return new SuccessModel(data)
        })
    }

    //   新建一篇博客
    if (method === 'POST' && req.path === '/api/blog/new') {


        if (loginCheckResult) {
            return loginCheck(req);
        }
        req.body.author = req.session.username;
        const result = newBlog(req.body);

        return result.then(data => {
            return new SuccessModel(data)
        })


    }


    //   更新博客
    if (method === 'POST' && req.path === '/api/blog/update') {
        if (loginCheckResult) {
            return loginCheck(req);
        }


        let result = updateBlog(id, req.body);
        return result.then(val => {
            if (val) {
                return new SuccessModel()
            } else {
                return new ErrorModel('更新博客失败');
            }
        })
    }


    //   删除博客
    if (method === 'POST' && req.path === '/api/blog/delete') {

        if (loginCheckResult) {
            return loginCheck(req);
        }

        req.body.author = req.session.username;
        let result = delBlog(id, author);
        return result.then(val => {
            if (val) {
                return new SuccessModel()
            } else {
                return new ErrorModel('删除博客失败');
            }
        })
    }

};

module.exports = handleBlogRouter;