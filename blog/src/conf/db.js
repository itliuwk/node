const env = process.env.NODE_ENV;   // 环境参数

let MYSQL_CONF;

if (env === 'dev') {
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: '101207302das',
        port: '3308',
        database: 'myblog'
    }
}

if (env === 'production') {
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: '101207302das',
        port: '3308',
        database: 'myblog'
    }
}

module.exports = {
    MYSQL_CONF
};