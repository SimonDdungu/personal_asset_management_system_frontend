"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { genderOptions } from "@/src/constants/auth/gender";
import { signUpFormTypes, signUpSchema } from "@/src/validation/auth/signup_Validation";
import { useCreateUser, useLogin } from "@/src/hooks/auth/useUser";
import { BlueButton, SelectInput, TextInput } from "@/src/components/ui";
import { PasswordInput } from "@/src/components/ui/input/PasswordInput";
import { useAuth } from "@/src/context/auth/AuthContext";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { loginFormTypes, loginSchema } from "@/src/validation/auth/login_Validation";
import FullScreenLoadingSpinner from "@/src/components/ui/loading_state/FullScreenLoadingSpinner";
import Link from "next/link";



export default function LoginForm() {
  const { mutateAsync: loginUser, isPending, error: LoginError } = useLogin();
  const { setUser } = useAuth();
  const [showErrorMessage, setErrorMessage] = useState<string>("")
  const router = useRouter();

  const methods = useForm<loginFormTypes>({
    resolver: zodResolver(loginSchema), defaultValues: {
      email: "james@gmail.com",
      password: "Simon#123",
    },
  });

  const { register, handleSubmit, control } = methods;

  const onSubmit = async(data: loginFormTypes) => {
      if (isPending) return;

      setErrorMessage("")

      try {
        const response = await loginUser(data);

        console.log("login user: ", response)

        setUser(response.user);

        router.push("/");

    } catch (error) {
      if (axios.isAxiosError(error)) {
        const backendMessage = error.response?.data?.message;

        setErrorMessage(typeof backendMessage === "string" ? backendMessage : "Something went wrong. Please try again.");
      } else {
        setErrorMessage("Something went wrong. Please try again.");
      }
        console.error("Registration failed:", error);
    }
  };

  const Errormessage = axios.isAxiosError(LoginError) ? LoginError.response?.data?.message : undefined;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10 relative">
      {isPending && <FullScreenLoadingSpinner bg_color="bg-black/50"/>}
      <div className="w-full max-w-lg rounded-2xl border bg-white p-8 shadow-sm">
        <div className="pb-6 relative text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Login
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Keep track of your assets and portfolio
          </p>

          {Errormessage && <span className="text-xs absolute bottom-1 text-red-600 left-0 right-0">{Errormessage}</span>}
        </div>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mb-5">
            <TextInput
              label="Email address"
              name="email"
              placeholder="Enter email address"
              register={register}
            />

            
            <PasswordInput
              name="password"
              label="Password"
              placeholder="Enter your password"
            />

            <BlueButton label="Login" width="w-full" justify="justify-center" padding="py-2" disabled={isPending}/>
          </form>
        </FormProvider>
          <p className="text-xs">Don't have an account? <Link href={"/signup"} className="text-blue-600 underline">Create an account</Link></p>
      </div>
    </div>
  );
}