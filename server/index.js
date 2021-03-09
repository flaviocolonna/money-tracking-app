const fastify = require('fastify')({
    logger: true,
});
fastify.register(require('fastify-cors'), {
    origin: '*',
});
fastify.register(require('./api'), { prefix: '/api' });
fastify.listen(9000, function (err, address) {
    if (err) {
        throw err;
    }
    fastify.log.info(`Server started on ${address}`);
});
