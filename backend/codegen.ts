import type { CodegenConfig } from "@graphql-codegen/cli";
import { printSchema } from "graphql";
import { builder } from "./src/schema";

const config: CodegenConfig = {
  overwrite: true,
  schema: printSchema(builder.toSchema({})),
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    "schema.graphql": {
      plugins: ["schema-ast"],
    },
  },
};

export default config;
