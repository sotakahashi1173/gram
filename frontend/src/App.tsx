import UsersList from "./components/User/List";
import User from "./components/User/Register";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./gql/client";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <User />
      <UsersList />
    </QueryClientProvider>
  );
}

export default App;
