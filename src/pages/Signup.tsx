import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import Layout from "./Layout";

// icons
import HidePassword from "../assets/icon/hide.svg?react";
import ShowPassowrd from "../assets/icon/show.svg?react";
import Spinner from "../assets/icon/infinite-spinner.svg";

const UserSchema = z
  .object({
    username: z
      .string()
      .min(2, { message: "Username must be at least 2 characters" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number" }),
    repeatPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number" }),
  })
  .refine(
    (values) => {
      return values.password === values.repeatPassword;
    },
    { message: "Password must match!", path: ["repeatPassword"] }
  );

type UserSignup = z.infer<typeof UserSchema>;

const Signup = () => {
  const apiBaseUrl = import.meta.env.VITE_API_URL;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserSignup>({
    resolver: zodResolver(UserSchema),
  });

  const [showPassword, setShowPassowrd] = useState(false);
  const [showRepeatPassword, setShowRepeatPassowrd] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<UserSignup> = async ({
    username,
    password,
  }) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${apiBaseUrl}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const result = await response.text();

      if (response.status === 200) {
        toast.success(result);
      }

      if (response.status === 400) {
        toast.error(result);
      }

      if (response.status === 500) {
        toast.error(result);
      }

      // clear inputs
      reset();
      // hide password
      setShowPassowrd(false);
      setShowRepeatPassowrd(false);
    } catch (error) {
      console.error("Error: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleShowPassword = () => {
    setShowPassowrd((prev) => !prev);
  };

  const handleShowRepeatPassword = () => {
    setShowRepeatPassowrd((prev) => !prev);
  };
  return (
    <Layout className="signup">
      <form className="form sign-up" onSubmit={handleSubmit(onSubmit)}>
        <p className="subtitle">Welcome to</p>
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
                {showPassword ? <ShowPassowrd /> : <HidePassword />}
              </div>
            </div>
            {errors.password && (
              <div className="error">{errors.password.message}</div>
            )}
          </div>
          <div className="form-control">
            <label>Repeat password</label>
            <div className="form-input password-verify">
              <input
                {...register("repeatPassword", { required: true })}
                type={showRepeatPassword ? "text" : "password"}
                autoComplete="new-password"
              />

              <div
                onClick={handleShowRepeatPassword}
                className={`password ${showRepeatPassword ? "show" : "hide"}`}
              >
                {showRepeatPassword ? <ShowPassowrd /> : <HidePassword />}
              </div>
            </div>
            {errors.repeatPassword && (
              <div className="error">{errors.repeatPassword.message}</div>
            )}
          </div>
          <button className="btn-primary">
            {isLoading ? (
              <div className="spinner">
                <img src={Spinner} width={30} height={30} alt="Loading" />{" "}
                Loading
              </div>
            ) : (
              "Sign up"
            )}
          </button>
        </div>
        <div>
          <a href="/" className="notice">
            Already have an account?
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

export default Signup;
