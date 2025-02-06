export default {
  items: {
    output: {
      mode: "tags-split",
      target: "src/petstore.ts",
      schemas: "src/model",
      client: "react-query",
      mock: true,
    },
    input: {
      target: "http://localhost:3030/documentation/json",
    },
  },
};
