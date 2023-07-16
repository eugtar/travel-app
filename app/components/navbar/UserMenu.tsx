"use client";
import React from "react";
import Avatar from "../Avatar";
import MenuItem from "./MenuItem";
import { TSafeUser } from "@/app/types";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { AiOutlineMenu } from "react-icons/ai";
import { HiOutlineLogout } from "react-icons/hi";
import useUserMenu from "@/app/hooks/useUserMenu";
import useRentModal from "@/app/hooks/useRentModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";

interface IUserMenuProps {
  currentUser?: TSafeUser | null;
}

const UserMenu = React.forwardRef<HTMLDivElement, IUserMenuProps>(
  function UserMenu({ currentUser }, ref) {
    const router = useRouter();
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();
    const rentModal = useRentModal();
    const userMenu = useUserMenu();

    const toggleOpen = React.useCallback(() => {
      if (userMenu.isOpen) return userMenu.onClose();
      return userMenu.onOpen();
    }, [userMenu]);

    const onRent = React.useCallback(() => {
      if (!currentUser) return loginModal.onOpen();
      return rentModal.onOpen();
    }, [currentUser, loginModal, rentModal]);

    return (
      <div className="relative">
        <div
          className="
          flex
          flex-row
          items-center
          gap-3
        "
        >
          <div
            role="button"
            title="Airbnb your home"
            onClick={onRent}
            className="
            hidden
            cursor-pointer
            rounded-full
            px-4
            py-3
            text-sm
            font-semibold
            transition
            hover:bg-neutral-100
            md:block
          "
          >
            Airbnb your home
          </div>
          <div
            ref={ref}
            title="Menu"
            role="button"
            onClick={toggleOpen}
            className="
            flex
            cursor-pointer
            flex-row
            items-center
            gap-3
            rounded-full
            border-[1px]
            border-neutral-200
            p-4
            transition
            hover:shadow-md
            md:px-2
            md:py-1
          "
          >
            <AiOutlineMenu />
            <div
              className="
               hidden
               md:block
            "
            >
              <Avatar src={currentUser?.image} />
            </div>
          </div>
        </div>
        {userMenu.isOpen ? (
          <div
            className="
            absolute
            right-0
            top-12
            z-10
            w-[40vw]
            overflow-hidden
            rounded-xl
            bg-primary_light
            text-sm
            shadow-md
            md:w-3/4
          "
          >
            <div
              className="
              flex
              cursor-pointer
              flex-col
            "
            >
              {currentUser ? (
                <>
                  <MenuItem
                    label="My trips"
                    onClick={() => router.push("/trips")}
                  />
                  <MenuItem
                    label="My favorites"
                    onClick={() => router.push("/favorites")}
                  />
                  <MenuItem
                    label="My reservations"
                    onClick={() => router.push("/reservations")}
                  />
                  <MenuItem
                    label="My Properties"
                    onClick={() => router.push("/properties")}
                  />
                  <MenuItem label="Airbnb my home" onClick={onRent} />
                  <hr />
                  <MenuItem
                    label="Logout"
                    icon={HiOutlineLogout}
                    onClick={() => signOut()}
                  />
                </>
              ) : (
                <>
                  <MenuItem
                    label="Login"
                    onClick={() => {
                      loginModal.onOpen();
                      toggleOpen();
                    }}
                  />
                  <MenuItem
                    label="Sign up"
                    onClick={() => {
                      registerModal.onOpen();
                      toggleOpen();
                    }}
                  />
                </>
              )}
            </div>
          </div>
        ) : null}
      </div>
    );
  }
);

export default UserMenu;
