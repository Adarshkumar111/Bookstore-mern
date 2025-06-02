import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Optional: Theme logic
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const onSubmit = async (data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };

    await axios
      .post("https://bookstore-backend-go16.onrender.com/user/login", userInfo)
      .then((res) => {
        if (res.data) {
          toast.success("Login Successful");
          document.getElementById("my_modal_3").close();
          localStorage.setItem("Users", JSON.stringify(res.data.user));
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      })
      .catch((err) => {
        if (err.response) {
          toast.error("Error: " + err.response.data.message);
        }
      });
  };

  return (
    <div>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box bg-base-100 text-base-content shadow-xl rounded-lg">
          <form onSubmit={handleSubmit(onSubmit)} method="dialog">
            <Link
              to="/"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => document.getElementById("my_modal_3").close()}
            >
              ✕
            </Link>

            <h3 className="font-bold text-lg">Login</h3>

            <div className="space-y-5 mt-6">
              {/* Email */}
              <div className="space-y-1">
                <label className="text-sm font-medium">Email</label>
                <input
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 input input-bordered"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-1">
                <label className="text-sm font-medium">Password</label>
                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 input input-bordered"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password.message}</p>
                )}
              </div>

              {/* Submit */}
              <div className="flex flex-col items-center gap-3">
                <button
                  type="submit"
                  className="w-full bg-pink-500 text-white py-2 rounded-md hover:bg-pink-600 transition duration-300"
                >
                  Login
                </button>
                <p className="text-sm">
                  Not registered?{" "}
                  <Link
                    to="/signup"
                    className="text-blue-500 hover:underline cursor-pointer"
                  >
                    Sign Up
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default Login;
