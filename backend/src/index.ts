import { schema } from "./schema";
import { createServer } from "node:http";

import { createYoga } from "graphql-yoga";
import { prisma } from "./infra/documentDB";
import { useCookies } from "@whatwg-node/server-plugin-cookies";

import { jwtVerify, parseID } from "./utils";

const CookieKeys = {
  authToken: "authToken",
};

const yoga = createYoga({
  schema: schema,
  plugins: [useCookies()],
  context: async (ctx) => {
    // const authToken =
    //   ctx.request.headers.get("Authorization")?.split(" ")?.[1] ||
    //   (await ctx.request.cookieStore?.get(CookieKeys.authToken))?.value;
    // if (!authToken) {
    //   return { ...ctx };
    // }
    // const auth = jwtVerify(authToken);
    // const user = await prisma.user.findUnique({
    //   // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    //   where: { id: parseID(auth.sub!) },
    // });
    const user = undefined;
    return { ...ctx, prisma, user };
  },
});

const server = createServer(yoga);

const port = process.env.PORT || "3000";

server.listen(port, () => {
  console.info(
    `Server is running on http://localhost:${port}${yoga.graphqlEndpoint}`
  );
});
