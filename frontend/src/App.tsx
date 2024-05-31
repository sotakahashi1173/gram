import { request } from "graphql-request";
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { graphql } from "./gql/gql";
import { UsersQuery } from "./gql/graphql";

const usersQueryDocument = graphql(`
  query Users {
    user {
      id
      name
    }
  }
`);

const queryClient = new QueryClient();

function Users() {
  const { data } = useQuery<UsersQuery>({
    queryKey: ["users"],
    queryFn: async () => {
      const { user } = await request(
        "http://localhost:3000/graphql",
        usersQueryDocument
      );
      return { user }; // Fix: Wrap the user object in an object with the key "user"
    },
  });
  return <div>{data && data.user.name}</div>;
}

function App() {
  const Hello = "Hello, world!";
  return (
    <QueryClientProvider client={queryClient}>
      <Users />
      {Hello}
    </QueryClientProvider>
  );
}

export default App;
