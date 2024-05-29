import { request, gql } from "graphql-request";
import { useQuery } from "@tanstack/react-query";
import { User } from "./gql/graphql";

interface UserQuery {
  users: {
    id: string;
    name: string;
  }[];
}

const usersDocument = gql`
  query Users {
    users {
      id
      name
    }
  }
`;

function App() {
  const { data } = useQuery<UserQuery>({
    queryKey: ["users"],
    queryFn: async () =>
      request(
        "http://localhost:3000/graphql",
        usersDocument,
        // variables are type-checked too!
        { first: 10 }
      ),
  });

  return (
    <div>
      {data?.users.map((user: User) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}

export default App;
