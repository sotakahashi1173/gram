import { builder, schema } from "./schema";
import { createServer } from "node:http";
import { createYoga } from "graphql-yoga";
import { prisma } from "./infra/documentDB";
import { useCookies } from "@whatwg-node/server-plugin-cookies";

const yoga = createYoga({
  schema: builder.toSchema(),
  plugins: [useCookies],
  context: (req) => ({
    ...req,
    prisma,
  }),
});

const server = createServer(yoga);

const port = process.env.PORT || "3000";

server.listen(port, () => {
  console.info(
    `Server is running on http://localhost:${port}${yoga.graphqlEndpoint}`
  );
});
