import "./App.scss";
import Spinner from "./assets/infinite-spinner.svg";
import Login from "./pages/Login";
import Layout from "./pages/Layout";
import { useAuth } from "./contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const env = import.meta.env.VITE_APP_ENV;

const App = () => {
  const { isAuth, isLoading } = useAuth();
  const navigate = useNavigate();

  if (env === "local") {
    console.log("current environment is local");
  }

  if (env === "production") {
    console.log("current environment is production");
  }

  useEffect(() => {
    if (isAuth) navigate("/Home");
  }, [isAuth, navigate]);

  if (isLoading) {
    return (
      <Layout>
        <img style={{ width: "50vw" }} src={Spinner} alt="Loading" />
      </Layout>
    );
  }

  if (!isAuth) {
    return <Login />;
  }
};

export default App;
