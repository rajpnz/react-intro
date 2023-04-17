import logo from './logo.svg';
import './App.css';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TransportSelector from "./public-transport/TransportSelector";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            cacheTime: Infinity,
        },
    },
});

function App() {
  return (
    <div className="App">
        <QueryClientProvider client={queryClient}>
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
          </header>
            <div></div>
            <div>
                <TransportSelector />
            </div>
        </QueryClientProvider>
    </div>
  );
}

export default App;
