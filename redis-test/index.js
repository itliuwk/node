const redis = require('redis');

const redisClient = redis.createClient(6379, '127.0.0.1');

redisClient.on('err', err => {
    console.log(err);
});

redisClient.set('myname', 'liuwk1', redis.print);

redisClient.get('myname', (err, data) => {
    if (err) {
        console.error(err);
        return
    }
    console.log(data);

    redisClient.quit();
});