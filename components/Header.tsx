"use client";
import React from "react";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import BreadCrumbs from "./BreadCrumbs";

const Header = () => {
  const { user } = useUser();

  return (
    <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div>
        <h1 className="text-2xl">
          {user ? user?.firstName + "'s" + " space" : ""}
        </h1>
      </div>
      <div>
        <BreadCrumbs />
      </div>
      <div>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
};

export default Header;
