import { GraphQLClient } from "graphql-request";
import { QueryClient } from "@tanstack/react-query";

export const graphQlClient = new GraphQLClient("http://localhost:3000/graphql");
export const queryClient = new QueryClient();
