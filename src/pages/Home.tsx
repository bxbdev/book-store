import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";

const Home = () => {
  const { isAuth, isLoading } = useAuth();
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
      <div className="content">
        <h1>Home</h1>
      </div>
    );
  }
};

export default Home;
