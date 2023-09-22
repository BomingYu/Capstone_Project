import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/NavBar";
import AppRoutes from "./routes/AppRoutes";
import { UserProvider } from "./contexts/userContext";

function App() {
  return (
    <>
      <UserProvider>
        <NavBar />
        <AppRoutes />
      </UserProvider>
    </>
  );
}

export default App;
