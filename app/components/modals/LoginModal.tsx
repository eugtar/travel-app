"use client";
import Modal from ".";
import React from "react";
import Button from "../Button";
import Heading from "../Heading";
import Input from "../inputs/Input";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { AiFillGithub } from "react-icons/ai";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

const LoginModal: React.FC = () => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    signIn("credentials", { ...data, redirect: false }).then((res) => {
      setIsLoading(false);

      if (res?.ok) {
        toast.success("Logged in");
        router.refresh();
        loginModal.onClose();
      }
      if (res?.error) toast.error(res.error);
    });
  };

  const toggle = React.useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome back" subtitle="Login to your account!" center />
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
    <div
      className="
        mt-3
        flex
        flex-col
        gap-4
      "
    >
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
          <div className="">First time using Airbnb?</div>
          <div
            role="link"
            title="Create an account"
            onClick={toggle}
            className="cursor-pointer text-neutral-800 hover:underline"
          >
            Create an account
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      title="Login"
      body={bodyContent}
      disabled={isLoading}
      actionLabel="Continue"
      footer={footerContent}
      isOpen={loginModal.isOpen}
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
    />
  );
};

export default LoginModal;
