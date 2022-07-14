const fastify = require('fastify')({
    logger: true,
});
fastify.register(require('@fastify/cors'), {
    origin: '*',
});
fastify.register(require('./api'), { prefix: '/api' });
const startServer = async () => {
    try {
        await fastify.listen({ port: 9000 });
        fastify.log.info('Server started on 9000');
    } catch (e) {
        fastify.log.error(e);
        process.exit(1);
    }
};
startServer();
