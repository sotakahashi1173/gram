import type { CodegenConfig } from "@graphql-codegen/cli";
import { printSchema } from "graphql";
import { builder } from "./src/schema";

const config: CodegenConfig = {
  overwrite: true,
  schema: printSchema(builder.toSchema({})),
  generates: {
    "../frontend/graphql/generated/graphql.ts": {
      plugins: ["typescript", "typescript-resolvers"],
    },
  },
};

export default config;
