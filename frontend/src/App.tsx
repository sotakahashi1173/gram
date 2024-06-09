import UsersList from "./components/User/List";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./gql/client";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UsersList />
    </QueryClientProvider>
  );
}

export default App;
