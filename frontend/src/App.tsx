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
    Users {
      id
      name
    }
  }
`);

const queryClient = new QueryClient();

function Users() {
  const { data } = useQuery<UsersQuery>({
    queryKey: ["Users"],
    queryFn: async () => {
      const { Users } = await request(
        "http://localhost:3000/graphql",
        usersQueryDocument
      );
      return { Users }; // Fix: Wrap the user object in an object with the key "Users"
    },
  });
  return (
    <div>
      {data && data.Users.map((user) => <div key={user.id}>{user.name}</div>)}
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Users />
    </QueryClientProvider>
  );
}

export default App;
