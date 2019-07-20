const getList = (author, keyword) => {
    //返回数据
    return [
        {
            id: '1',
            title: '标题A',
            content: '内容A',
            createTime: 1563618762987,
            author: 'zhangsan'
        },
        {
            id: '2',
            title: '标题B',
            content: '内容B',
            createTime: 1563618712987,
            author: 'lisi'
        },
        {
            id: '3',
            title: '标题C',
            content: '内容C',
            createTime: 1563618662987,
            author: 'wangwu'
        }
    ]
};

const getDetail = (id) => {
    //返回数据
    return [
        {
            id: '1',
            title: '标题A',
            content: '内容A',
            createTime: 1563618762987,
            author: 'zhangsan'
        }
    ]
};

module.exports = {
    getList,
    getDetail
};