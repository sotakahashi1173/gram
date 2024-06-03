import { GraphQLClient } from "graphql-request";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
} from "@tanstack/react-query";
import { graphql } from "./gql/gql";
import { InputUser } from "./gql/graphql";
import UsersList from "./components/User/List";
import User from "./components/User";

const graphQlClient = new GraphQLClient("http://localhost:3000/graphql");

const createUserQuery = graphql(`
  mutation Mutation($input: InputUser!) {
    createUser(input: $input) {
      name
    }
  }
`);

export const useCreateUser = () => {
  const mutationKey = ["graphql", "create", "input"];
  return useMutation<InputUser, unknown, InputUser>({
    mutationKey,
    mutationFn: async (param) => {
      const response = await graphQlClient.request(createUserQuery, {
        input: param,
      });
      return response.createUser;
    },
  });
};

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <User />
      <UsersList />
    </QueryClientProvider>
  );
}

export default App;
