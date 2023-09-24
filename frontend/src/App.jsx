import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/NavBar";
import AppRoutes from "./routes/AppRoutes";
import { UserProvider } from "./contexts/userContext";
import AddProductComponent from "./components/AddProductComponent";

function App() {
  return (
    <>
      <UserProvider>
        <NavBar />
        <AppRoutes />
        <AddProductComponent />
      </UserProvider>
    </>
  );
}

export default App;
