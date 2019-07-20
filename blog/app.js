const queryString = require('querystring');

const handleBlogRouter = require('./src/router/blog');
const handleUserRouter = require('./src/router/user');


// 用于处理 post data
const getPostData = (req) => {
    return new promise((resolve, reject) => {
        if (req.method !== 'POST') {
            resolve({});
            return;
        }

        if (req.headers['content-type'] !== 'application/json') {
            resolve({});
            return;
        }

        let postData = '';
        req.on('data', chunk => {
            postData += chunk.toString();
        });

        req.on('end', () => {
            if (!postData) {
                resolve({});
                return;
            } else {
                resolve(JSON.parse(postData));
            }
        })


    })
};

let serverHandle = (req, res) => {
    res.setHeader('Content-type', 'application/json');


    // 处理 path
    const url = req.url;
    req.path = url.split('?')[0];


    //解析 query

    req.query = queryString.parse(url.split('?')[0]);

    //处理 post data

    getPostData(req).then(postData => {
        req.body = postData;

        // 处理blog 路由
        const blogData = handleBlogRouter(req, res);

        if (blogData) {
            res.end(JSON.stringify(blogData));
            return;
        }


        // 处理user 路由
        const userData = handleUserRouter(req, res);

        if (userData) {
            res.end(JSON.stringify(userData));
            return;
        }

        //  未命中路由， 返回404

        res.writeHead(404, 'Content-type', 'text/plain');
        res.write('404 Not Found\n');
        res.end()
    });


};


module.exports = serverHandle;