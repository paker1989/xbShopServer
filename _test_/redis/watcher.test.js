const redis = require('redis');

const clients = {
    watcher: redis.createClient(),
    modifier: redis.createClient(),
};

clients.watcher.watch('foo', function (watchError) {
    if (watchError) throw watchError;

    // if you comment out the next line, the transaction will work
    clients.modifier.set('foo', Math.random(), (setError) => {
        if (setError) throw err;
    });

    // using a setTimeout here to ensure that the MULTI/EXEC will come after the SET.
    // Normally, you would use a callback to ensure order, but I want the above SET command
    // to be easily comment-out-able.
    setTimeout(function () {
        clients.watcher
            .multi()
            .set('foo', 'bar')
            .set('hello', 'world')
            .exec((multiExecError, results) => {
                if (multiExecError) throw multiExecError;

                if (results === null) {
                    console.log('transaction aborted because results were null');
                } else {
                    console.log('transaction worked and returned', results);
                }

                clients.watcher.quit();
                clients.modifier.quit();
            });
    }, 1000);
});
