"use client";
import Modal from ".";
import React from "react";
import axios from "axios";
import Button from "../Button";
import Heading from "../Heading";
import Input from "../inputs/Input";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

const RegisterModal: React.FC = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post("/api/register", data)
      .then(() => {
        toast.success("Success!");
        registerModal.onClose();
        loginModal.onOpen();
      })
      .catch((error) => toast.error(error.message))
      .finally(() => setIsLoading(false));
  };

  const toggle = React.useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [loginModal, registerModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to Airbnb" subtitle="Create an account!" center />
      <Input
        required
        id="email"
        type="email"
        label="Email"
        maxLength={64}
        errors={errors}
        register={register}
        disabled={isLoading}
      />
      <Input
        required
        id="name"
        label="Name"
        maxLength={254}
        errors={errors}
        register={register}
        disabled={isLoading}
      />
      <Input
        required
        id="password"
        type="password"
        label="Password"
        errors={errors}
        register={register}
        disabled={isLoading}
      />
    </div>
  );

  const footerContent = (
    <div className="mt-3 flex flex-col gap-4">
      <hr />
      <Button
        outline
        icon={FcGoogle}
        onClick={() => signIn("google")}
        label="Continue with Google"
      />
      <Button
        outline
        onClick={() => signIn("github")}
        icon={AiFillGithub}
        label="Continue with Github"
      />
      <div className="mt-4 text-center font-light text-neutral-500">
        <div className="flex flex-row items-center justify-center gap-2">
          <div className="">Already have an account?</div>
          <div
            role="link"
            title="Log in"
            onClick={toggle}
            className="cursor-pointer text-neutral-800 hover:underline"
          >
            Log in
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      title="Register"
      body={bodyContent}
      disabled={isLoading}
      actionLabel="Continue"
      footer={footerContent}
      isOpen={registerModal.isOpen}
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
    />
  );
};

export default RegisterModal;
