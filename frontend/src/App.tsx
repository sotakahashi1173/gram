import { GraphQLClient } from "graphql-request";
import { graphql } from "./gql/";
import { User } from "./gql/graphql";
import { UsersQuery } from "./gql/graphql";

const usersDocument = graphql(
  `
    query GetUser($id: ID!) {
      user(id: $id) {
        name
      }
    }
  `
);

const client = new GraphQLClient("http://localhost:3000/graphql");

async function fetchUsers(id: string): Promise<UsersQuery["user"]> {
  const { users } = await client.request<UsersQuery>(usersDocument);
  return users;
}

async function App() {
  return (
    <div>
      {users.map((user: User) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}

export default App;
