/**
 * init redis client
 */
const redis = require('redis');
const config = require('../config/config');


const { port, host, password, totalRetryTime, maxAttempt } = config.redis;

const redisClient = redis.createClient({
    host,
    port,
    string_numbers: true,
    // detect_buffers?: true;
    auth_pass: password,
    password,
    retry_strategy: (options) => {
        if (options.error && options.error.code === 'ECONNREFUSED') {
            // End reconnecting on a specific error and flush all commands with
            // a individual error
            return new Error('The server refused the connection');
        }
        if (options.total_retry_time > totalRetryTime) {
            // End reconnecting after a specific timeout and flush all commands
            // with a individual error
            return new Error('Retry time exhausted');
        }
        if (options.attempt > maxAttempt) {
            // End reconnecting with built in error
            return undefined;
        }
        // reconnect after
        return Math.min(options.attempt * 100, 3000);
    },
});

/* eslint-disable */
redisClient.on('error', (error) => {
    console.error(error);
});

redisClient.on('ready', () => {
    console.log(`redis is ready on ${host}:${port}`);
});

redisClient.on('connect', () => {
    console.log(`redis is connected on ${host}:${port}`);
});

module.exports = { redisClient };
