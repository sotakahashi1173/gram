import { builder } from "./gql/builder";
import { writeFileSync } from "fs";
import { printSchema, lexicographicSortSchema } from "graphql";

export const schema = builder.toSchema();

const schemaAsString = printSchema(lexicographicSortSchema(schema));
writeFileSync("../schema.graphql", schemaAsString);
