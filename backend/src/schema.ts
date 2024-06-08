import { builder } from "./gql/builder";
import "./gql/schema/user/get";
import "./gql/schema/user/post";

export const schema = builder.toSchema();
