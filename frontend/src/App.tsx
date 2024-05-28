import request from "graphql-request";
import { useQuery } from "@tanstack/react-query";
import { graphql } from "./gql/gql";

const usersDocument = graphql(`
  query usersQuery($frist: Int) {
    users(first: $first) {
      edges {
        node {
          ...User
        }
      }
    }
  }
`);

function App() {
  const { data } = useQuery(["Users"], async () =>
    request("http://localhost:3000/graphql", usersDocument)
  );

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
