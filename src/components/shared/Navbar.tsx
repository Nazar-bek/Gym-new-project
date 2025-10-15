import { navLinks } from "@/constants";
import React from "react";
import { Button } from "../ui/button";
import { ModeToggle } from "./mode-toggle";
import { Link } from "react-router-dom";
import { auth } from "@/firebase";
import { useUserState } from "@/stores/auth.user";
import UserBox from "./UserBox";

const Navbar = () => {
  const { user } = useUserState();
  return (
    <div className="w-full h-[10vh] border-b fixed inset-0 z-50 bg-background">
      <div className="container max-w-6xl mx-auto h-full flex justify-between items-center">
        <Link to={"/"}>
          <h1 className="text-2xl  font-bold uppercase">workout</h1>
        </Link>
        <div className="flex items-center gap-3 ">
          {navLinks.map((nav) => (
            <a
              href={nav.path}
              key={nav.label}
              className="font-medium hover:underline"
            >
              {nav.label}
            </a>
          ))}
          <ModeToggle />
          {user ? (
            <>
            <UserBox/>
            </>
          ) : (
            <Link to={"/auth"}>
              <Button variant={"secondary"}>Join Free</Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
