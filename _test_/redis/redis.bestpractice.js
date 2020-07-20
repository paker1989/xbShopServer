const Promisify = require('util').promisify;
const redis = require('redis');
const client = redis.createClient();

const getAsync = Promisify(client.get).bind(client);

client.on('error', (error) => {
    console.log(error);
});

client.hmset('keyss', 'xuss', 'bin', 'xin', 'xiu', redis.print);
client
    .multi()
    .hlen('keyss')
    .hgetall('keyss')
    .exec((err, replis) => {
        console.log(replis);
        console.log('MULTI got ' + replis.length + ' replies');
        replis.forEach(function (reply, index) {
            console.log('REPLY  @ index ' + index + ': ' + reply.toString());
        });
    });

const getProduct = async (opts) => {
    const res = await getAsync(opts.key);
    return opts.cb(res);
};

ArticleHelper.prototype.getArticleIDs() = function () {
    var that = this;
    var promise = ArticleMySQLHelper.getIDs().then(function (artis) {
        if (artis.length == 0) {
            return null;
        }
        var _ = [];
        artis.forEach(function (arti) {
            // 以上代码中我们用 zadd 方法添加 id 时，统一 score=1，这样有序集合就只会根据 id 大小来排序。
            _.push(redis.zaddAsync(that.ArticleIDSet, [1, arti.ID]));
        });
        return Q.all(_);
    });
    return promise;
};

ArticleHelper.prototype.getArticleList = function (offset, size) {
    var that = this;
    var promise = redis.zrevrangeAsync([that.ArticleIDSet, offset, offset + size - 1]).then(function (res) {
        var _ = [];
        res.forEach(function (id) {
            _.push(that.getArticle(id));
        });
        return;
        Q.all(_);
    });
    return promise;
};

/**
 * 一个评论组将共享一个有序集合键，我们将评论组的第一条也就是评论在有序集合中设置 score=1，
 * 而接下来的回复 score 依次递增，这样，评论组在有序集合中就可以顺序读取出来正常显示了。
 * 当有一条新的评论或者回复时，我们需要将其写入关系型数据库，同时设置该评论 Redis 缓存过期。
 * @param {*} id
 */
ArticleHelper.prototype.getComment = function (id) {
    var that = this;
    var promise = redis.zrangeAsync(that.CommentIDPrefix + id, [0, -1]).then(function (res) {
        if (res == null) {
            var p = ArticleMySQLHelper.getComments(id).then(function (cmmts) {
                var _ = [];
                cmmts.forEach(function (cmmt) {
                    _.push(redis.zaddAsync(that.CommentIDPrefix + id, [cmmt.index, cmmt.body]));
                });
                return Q.all(_);
            });
            return p;
        } else {
            return Q.resolve(res);
        }
    });
    return promise;
};

ArticleHelper.prototype.addComment = function (id, comment) {
    var that = this;
    var promise = ArticleMySQLHelper.saveComment(id, comment).then(function (res) {
        return redis.expireAsync(that.ArticleIDPrefix + id, [0]);
    });
    return promise;
};

/**
 * 随着存储的文章数量不断上升并且接近 Redis 设定的内存上限时，
 * 我们就需要考虑下一定的策略将部分文章清理出缓存了。在我们的缓存中，
 * 存在文章 id 集合，文章集合，评论组集合，其中文章 id 集合不应该被过期销毁，
 * 而文章集合和评论组集合都可以被过期删除。因此，我们设置 Redis 的工作模式为 LRU，
 * 子工作模式为 volatile-lru，这种模式需要将所有文章和评论组键值对都设置过期时间，
 * 而过期时间的颗粒度可以自由选择，但是不建议太短，因为设置太短的过期时间加重了数据库的读压力，
 * 这里我们选择 2 小时过期时间。因此，我们需要将 getArticle 方法做如下修改：
 * @param {*} id 
 */
ArticleHelper.prototype.getArticleExpire = function (id) {
    var that = this;
    var promise = redis.hgetallAsync(that.ArticleIDPrefix + id).then(function (res) {
        if (res == null) {
            return ArticleMySQLHelper.getOne(id).then(function (article) {
                return redis
                    .hmsetAsync(that.ArticleIDPrefix + id, article)
                    .then(function (res) {
                        return redis.expireAsync(that.ArticleIDPrefix + id, 3600 * 2);
                    })
                    .then(function () {
                        return Q.resolve(article);
                    });
            });
        } else {
            return Q.resolve(res);
        }
    });
    return promise;
};
