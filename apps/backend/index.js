"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const fastify = (0, fastify_1.default)();
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
