import "./App.scss";
import Signup from "./components/Signup";

const App = () => {
  if (import.meta.env.VITE_APP_ENV === "local") {
    console.log("current environment is local");
  }

  if (import.meta.env.VITE_APP_ENV === "production") {
    console.log("current environment is production");
  }
  return (
    <div className="wrap">
      <Signup />
    </div>
  );
};

export default App;
