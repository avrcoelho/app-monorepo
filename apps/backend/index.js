"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const fastify = (0, fastify_1.default)();
let items = [];
fastify.register(Promise.resolve().then(() => __importStar(require("@fastify/swagger"))));
fastify.register(Promise.resolve().then(() => __importStar(require("@fastify/swagger-ui"))), {
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
fastify.put("/test", {
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
}, (_, reply) => {
    reply.send(items);
});
fastify.post("/", {}, function (reqest, reply) {
    const item = reqest.body;
    items.push(item);
    reply.send(item);
});
fastify.delete("/:itemId", function (reqest, reply) {
    const params = reqest.params;
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
