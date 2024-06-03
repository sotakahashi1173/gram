import { useQuery } from "@tanstack/react-query";
import { graphql } from "@/gql/gql";
import { request } from "graphql-request";
import { UsersQuery } from "@/gql/graphql";

const usersQueryDocument = graphql(`
  query Users {
    Users {
      id
      name
    }
  }
`);

function UsersList() {
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
      <h1>Users</h1>
      <ul>{data?.Users.map((user) => <li key={user.id}>{user.name}</li>)}</ul>
    </div>
  );
}

export default UsersList;
