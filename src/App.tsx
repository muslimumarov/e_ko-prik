import Navbar from "./layouts/base/navbar/Navbar.tsx";
import Route from "./router.tsx";
import { useLocation } from "react-router-dom";
import { Login } from "./layouts/auth/login/Login.tsx";

const App: React.FC = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  if (isLoginPage) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <Login />
      </div>
    );
  }

  return (
    <>
      <Route />
    </>
  );
};

export default App;
