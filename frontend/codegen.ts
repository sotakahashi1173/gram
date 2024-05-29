import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  generates: {
    "./src/gql/": {
      schema: "../backend/schema.graphql",
      documents: ["./src/**/*.{ts,tsx}"],
      preset: "client",
    },
  },
};

export default config;
