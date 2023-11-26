import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import localForage from "localforage";

// icons
import HidePassword from "../assets/icon/hide.svg";
import ShowPassowrd from "../assets/icon/show.svg";
import Spinner from "../assets/icon/infinite-spinner.svg";
import Layout from "./Layout";
import { useAuth } from "../contexts/AuthContext";

const UserSchema = z.object({
  username: z.string({ required_error: "Username is required" }),
  password: z.string({ required_error: "Password is required" }),
});

type UserLogin = z.infer<typeof UserSchema>;
const apiBaseUrl = import.meta.env.VITE_API_URL;

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserLogin>({
    resolver: zodResolver(UserSchema),
  });

  const onLogin: SubmitHandler<UserLogin> = async ({ username, password }) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${apiBaseUrl}/login`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (response.status === 401 || response.status === 404) {
        const result = await response.text();
        return toast.error(result);
      }

      if (response.status === 200) {
        const result = await response.json();
        toast.success(result.message);
        localForage.setItem("token", result.token);
        navigate("/home");
        // AuthProvider的狀態需要更新
        login();
      }
      // 清空表單和預設隱藏密碼
      reset();
      setShowPassword(false);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout className="login">
      <form className="form sign-up" onSubmit={handleSubmit(onLogin)}>
        <p className="subtitle">Welcome back to</p>
        <h1 className="title">Inoveltown</h1>
        <div className="form-group">
          <div className="form-control">
            <label>Username</label>
            <input
              {...register("username", { required: true })}
              autoComplete="username"
            />
            {errors.username && (
              <div className="error">{errors.username.message}</div>
            )}
          </div>

          <div className="form-control">
            <label>Password</label>
            <div className="form-input password-verify">
              <input
                {...register("password", { required: true })}
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
              />

              <div
                onClick={handleShowPassword}
                className={`password ${showPassword ? "show" : "hide"}`}
              >
                {showPassword ? (
                  <img
                    width={20}
                    height={20}
                    src={ShowPassowrd}
                    alt="Show password"
                  />
                ) : (
                  <img
                    width={20}
                    height={20}
                    src={HidePassword}
                    alt="hide password"
                  />
                )}
              </div>
            </div>
            {errors.password && (
              <div className="error">{errors.password.message}</div>
            )}
          </div>
          <button className="btn-primary">
            {isLoading ? (
              <div className="spinner">
                <img src={Spinner} width={30} height={30} alt="Loading" />{" "}
                Loading
              </div>
            ) : (
              "Loign"
            )}
          </button>
        </div>
        <div>
          <a href="/register" className="notice">
            Do not have an account?
          </a>
        </div>
      </form>
      <Toaster
        position="top-right"
        gutter={8}
        reverseOrder={false}
        toastOptions={{
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />
    </Layout>
  );
};

export default Login;
