import axios from "axios";
import Router from "next/router";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { mutate } from "swr";
import "react-toastify/dist/ReactToastify.css";

type UserProps = {
  name: string;
  email: string;
  password: string;
};

const SignUp = () => {
  const signUp = async (item: UserProps) => {
    const create = await axios.post("http://localhost:3001/register", item);
    mutate(create);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserProps>();
  const onSubmit: SubmitHandler<UserProps> = async (user) => {
    await signUp(user);
    toast.success("Register success");
    setTimeout(() => {
      Router.push("/signin");
    }, 2000);
  };
  return (
    <div>
      <div className="h-screen bg-gradient-to-br from-blue-600  flex justify-center items-center w-full">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-white px-10 py-8 rounded-xl w-screen shadow-md max-w-sm">
            <div className="space-y-4">
              <h1 className="text-center text-2xl font-semibold text-gray-600">
                Register
              </h1>
              <div>
                <label
                  htmlFor="name"
                  className="block mb-1 text-gray-600 font-semibold"
                >
                  Username
                </label>
                <input
                  {...register("name", { required: true })}
                  type="text"
                  className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
                />
                <p className="text-red-600">
                  {errors.name?.type === "required" &&
                    "Vui lòng điền trường này"}
                </p>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-1 text-gray-600 font-semibold"
                >
                  Email
                </label>
                <input
                  {...register("email", { required: true })}
                  type="email"
                  className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
                />
                <p className="text-red-600">
                  {errors.email?.type === "required" &&
                    "Vui lòng điền trường này"}
                </p>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-1 text-gray-600 font-semibold"
                >
                  Password
                </label>
                <input
                  {...register("password", { required: true })}
                  type="password"
                  className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
                />
                <p className="text-red-600">
                  {errors.password?.type === "required" &&
                    "Vui lòng điền trường này"}
                </p>
              </div>
            </div>
            <button className="mt-4 w-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-indigo-100 py-2 rounded-md text-lg tracking-wide">
              Register
            </button>
          </div>
        </form>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default SignUp;
