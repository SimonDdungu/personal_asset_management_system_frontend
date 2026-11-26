"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { genderOptions } from "@/src/constants/auth/gender";
import { signUpFormTypes, signUpSchema } from "@/src/validation/auth/signup_Validation";
import { useCreateUser } from "@/src/hooks/auth/useUser";
import { BlueButton, SelectInput, TextInput } from "@/src/components/ui";
import { PasswordInput } from "@/src/components/ui/input/PasswordInput";
import { useAuth } from "@/src/context/auth/AuthContext";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";



export default function SignUpForm() {
  const { mutateAsync: createUser, isPending } = useCreateUser();
  const { setUser } = useAuth();
  const [showErrorMessage, setErrorMessage] = useState<string>("")
  const router = useRouter();

  const methods = useForm<signUpFormTypes>({
    resolver: zodResolver(signUpSchema), defaultValues: {
      // firstName: "simon",
      // lastName: "james",
      // email: "james@gmail.com",
      // phoneNumber: "",
      // gender: "MALE",
      // password: "Simon#123",
      // confirmPassword: "Simon#123",
    }, reValidateMode: "onChange"
  });

  const { register, handleSubmit, control, formState: { errors } } = methods;

  const onSubmit = async(data: signUpFormTypes) => {
      if (isPending) return;

      setErrorMessage("")

      try {
        const { confirmPassword, ...userData } = data;

        const response = await createUser(userData);

        console.log("created user: ", response)

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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-lg rounded-2xl border bg-white p-8 shadow-sm">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Create an account
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Fill in your details to get started.
          </p>
        </div>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-1 mb-5">
            <div className="flex flex-row gap-x-3">
              <TextInput
                label="First name"
                name="firstName"
                placeholder="Enter first name"
                register={register}
                required={true}
                error={errors}
              />

              <TextInput
                label="Last name"
                name="lastName"
                placeholder="Enter last name"
                register={register}
                required={true}
                error={errors}
              />
            </div>

            <TextInput
              label="Email address"
              name="email"
              placeholder="Enter email address"
              register={register}
              required={true}
              error={errors}
            />

            <div className="flex flex-row gap-x-3">
              <SelectInput
                label="Gender"
                name="gender"
                placeholder="Select gender"
                options={genderOptions}
                control={control}
                register={register}
                required={true}
                error={errors}
              />

              <TextInput
                label="Phone number (optional)"
                name="phoneNumber"
                placeholder="Enter phone number"
                register={register}
                error={errors}
              />
            </div>
            
            <div className="flex flex-row gap-x-3">
              <PasswordInput
                name="password"
                label="Password"
                required={true}
                placeholder="Enter your password"
              />

              <PasswordInput
                name="confirmPassword"
                label="Confirm Password"
                required={true}
                placeholder="Confirm your password"
              />
            </div>
            
            <div className="mt-4">
              <BlueButton label="Sign Up" width="w-full" justify="justify-center" padding="py-2"/>
            </div>
          </form>
        </FormProvider>
         <p className="text-xs">Already have an account? <Link href={"/login"} className="text-blue-600 underline">Login</Link></p>
      </div>
    </div>
  );
}