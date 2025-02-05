import Fastify from "fastify";
import { Item } from "./types";

const fastify = Fastify();

let items: Item[] = [];

fastify.register(import("@fastify/swagger"));

fastify.register(import("@fastify/swagger-ui"), {
  routePrefix: "/documentation",
  uiConfig: {
    docExpansion: "full",
    deepLinking: false,
  },
  uiHooks: {
    onRequest: function (request, reply, next) {
      next();
    },
    preHandler: function (request, reply, next) {
      next();
    },
  },
  staticCSP: true,
  transformStaticCSP: (header) => header,
  transformSpecification: (swaggerObject, request, reply) => {
    return swaggerObject;
  },
  transformSpecificationClone: true,
});

fastify.get(
  "/",
  {
    schema: {
      description: "Get items",
      tags: ["item"],
      summary: "qwerty",
      response: {
        201: {
          description: "Successful response",
          type: "object",
          properties: {
            id: { type: "number" },
            name: { type: "string" },
          },
        },
      },
    },
  },
  (_, reply) => {
    reply.send(items);
  }
);

fastify.post("/", {}, function (reqest, reply) {
  const item = reqest.body as Item;
  items.push(item);
  reply.send(item);
});

fastify.delete("/:itemId", function (reqest, reply) {
  const params = reqest.params as any;
  items = items.filter((i) => i.id !== Number(params.itemId));
  reply.code(204).send();
});

fastify.listen({ port: 3030 }, function (err) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log("Server listening at http://localhost:3030");
});
