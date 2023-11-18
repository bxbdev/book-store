import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";

// icons
import HidePassword from "./assets/hide.svg";
import ShowPassowrd from "./assets/show.svg";

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
  const onSubmit: SubmitHandler<UserSignup> = async ({
    username,
    password,
  }) => {
    try {
      const response = await fetch(`${apiBaseUrl}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.text();
      console.log(result);

      // clear inputs
      reset();
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const [showPassword, setShowPassowrd] = useState(false);
  const [showRepeatPassword, setShowRepeatPassowrd] = useState(false);

  const handleShowPassword = () => {
    setShowPassowrd((prev) => !prev);
  };

  const handleShowRepeatPassword = () => {
    setShowRepeatPassowrd((prev) => !prev);
  };
  return (
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
              {showRepeatPassword ? (
                <img
                  src={ShowPassowrd}
                  width={20}
                  height={20}
                  alt="Show password"
                />
              ) : (
                <img
                  src={HidePassword}
                  width={20}
                  height={20}
                  alt="hide password"
                />
              )}
            </div>
          </div>
          {errors.repeatPassword && (
            <div className="error">{errors.repeatPassword.message}</div>
          )}
        </div>
        <button className="btn-primary">Sign up</button>
      </div>
    </form>
  );
};

export default Signup;
