import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { loginEmailPassword, singupEmailPassword } from "../API/Auth";
import { useNavigate } from "react-router-dom";
import { AuthError } from "firebase/auth";

interface SignupFormValues {
  email: string;
  password: string;
}

// Define validation schema with Yup
const validationSchema = Yup.object().shape({
  email: Yup.string().required("Email is required").email("Email is not valid"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

const SignupForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: yupResolver(validationSchema),
  });
  const navigate = useNavigate();

  const [type, setType] = useState<"login" | "signup">("signup");
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: SignupFormValues) => {
    setIsSubmitting(true);
    setSubmitError("")
    try {
      if (type === "login") {
        await loginEmailPassword(data.email, data.password);
        navigate("/");
      } else {
        await singupEmailPassword(data.email, data.password);
      }
    } catch (err) {
      const error = err as AuthError;
      if (error.code == "auth/invalid-credential") {
        setSubmitError("Wrong Email or Password, Try Again!");
      }else if (error.code == "auth/email-already-in-use" ) {
        setSubmitError("This Email is already, Try to login instead!")
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {type === "login" ? "Log In" : "Sign Up"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              className={`mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              {...register("email")}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              className={`mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              {...register("password")}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>
          <p className="my-3 text-sm text-red-500">{submitError}</p>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            {isSubmitting ? "loading ..." : type === "login" ? "Log In" : "Sign Up"}
          </button>
        </form>
        {/* Toggle Button */}
        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={() => {
                setType(type === "login" ? "signup" : "login")
                setSubmitError('')
            }}
            className="text-blue-500 hover:underline focus:outline-none"
          >
            {type === "login"
              ? "Don't have an account? Sign Up"
              : "Already have an account? Log In"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
