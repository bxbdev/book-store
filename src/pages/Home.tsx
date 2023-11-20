import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";

const Home = () => {
  const { isAuth, isLoading, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) return navigate("/");
  }, [isAuth]);

  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  if (isAuth) {
    return (
      <div>
        <h1>Home</h1>
        <button onClick={logout} className="btn-primary">
          Logout
        </button>
      </div>
    );
  }
};

export default Home;
