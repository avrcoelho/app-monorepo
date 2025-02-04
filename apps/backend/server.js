import Fastify from "fastify";

const fastify = Fastify();

fastify.get("/", function (_, reply) {
  reply.send({ hello: "world" });
});

fastify.listen({ port: 3030 }, function (err) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log("Server listening at http://localhost:3030");
});
