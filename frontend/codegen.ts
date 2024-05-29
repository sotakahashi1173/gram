import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:3000/graphql",
  documents: ["!src/gql/**/*"],
  generates: {
    "./src/gql/": {
      preset: "client",
      config: {
        documentMode: "string",
      },
      plugins: ["typescript", "typescript-operations"],
    },
  },
};

export default config;
