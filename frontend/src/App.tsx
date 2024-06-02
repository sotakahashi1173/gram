import { GraphQLClient, request } from "graphql-request";
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
  useMutation,
} from "@tanstack/react-query";
import { graphql } from "./gql/gql";
import { InputUser } from "./gql/graphql";
import { UsersQuery } from "./gql/graphql";
import { useState, useCallback } from "react";
import Input from "./components/parts/Input";
import styled from "@emotion/styled";
import Button from "./components/parts/Button";

const usersQueryDocument = graphql(`
  query Users {
    Users {
      id
      name
    }
  }
`);

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

const Users = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const handleInputChange = useCallback((value: string) => {
    setInputValue(value);
  }, []);
  const createUser = useCreateUser();

  const handleClick = () => {
    createUser.mutate({ name: inputValue });
  };

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
      <Container>
        <Title>ユーザー情報</Title>
        <Input
          value={inputValue}
          label="ユーザー名"
          onChange={handleInputChange}
        />
        <Button
          variant="primary"
          label="登録"
          onClick={() => {
            handleClick();
          }}
        />
      </Container>
    </div>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Users />
    </QueryClientProvider>
  );
}

const Container = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "flex-start",
  padding: "20px",
  boxSizing: "border-box",
});

const Title = styled.h1({
  fontSize: "24px",
  marginBottom: "20px",
  color: "#333",
});

export default App;
