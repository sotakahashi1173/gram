import { useMutation } from "@tanstack/react-query";
import { graphql } from "../gql";
import { InputUser } from "../graphql";
import { graphQlClient, queryClient } from "../client";

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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Users"] });
    },
  });
};
