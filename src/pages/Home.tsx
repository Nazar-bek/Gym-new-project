import { Button } from "@/components/ui/button";
import { featuredItems, programs } from "@/constants";
import React from "react";
import men from "@/assets/men.png";
import { FaArrowRightLong } from "react-icons/fa6";

import { Card } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { useUserState } from "@/stores/auth.user";
import { CgGym } from "react-icons/cg";
import { LogOut } from "lucide-react";
import { auth } from "@/firebase";
const Home = () => {
  const { user, setUser } = useUserState();
  const navigate = useNavigate()

  const onLogOut = () => {
    auth.signOut().then(() => {
      setUser(null)
          navigate("/auth")
    })

  }
  return (
    <>
      <div className="w-full h-screen flex items-center max-md:justify-center max-md:items-center max-md:flex-col gap-8">
        <div className="max-w-xl ml-60 flex h-full flex-col justify-center">
          <h1 className="text-9xl font-semibold uppercase max-sm:text-[20px]">
            WorkOut With Me
          </h1>
          <p className="text-muted-foreground">
            A huge selection of health and fitness content, healthy recipies and
            transformation stories to help you get fit and stay fit!{" "}
          </p>
          {user ? (
            <div className="flex gap-2">
              <Link to={"/dashboard"}>
              <Button className="w-fit mt-6 font-bold h-12">
                <span>Go to gym</span>
                <CgGym className="h-5 w-5 ml-2 "/>
              </Button>
              </Link>
              <Button variant={"destructive"} onClick={() => onLogOut()} className="w-fit mt-6 font-bold h-12">
                <span>LogOut</span>
                <LogOut  className="h-5 w-5 ml-2 "/>
              </Button>
            </div>
          ) : (
            <Link to={"/auth"}>
              <Button className="w-fit mt-6 font-bold h-12" size={"lg"}>
                Join Now
              </Button>
            </Link>
          )}

          <div className="mt-24">
            <p className="text-muted-foreground">AS FEATURED IN</p>
            <div className="flex items-center gap-4 mt-2">
              {featuredItems.map((Item, index) => (
                <Item key={index} className="w-12 h-12" />
              ))}
            </div>
          </div>
        </div>
        <img src={men} alt="Men Image" className="w-1/4" />
      </div>
      <div className="container max-w-5xl mx-auto">
        <h1 className="text-4xl">Not sure where to start?</h1>
        <p className="mt-2 text-muted-foreground">
          Programs offer day-to-day guidance on an interactive calendar to keep
          you on a track.
        </p>
        <div className="grid grid-cols-3 gap-4 my-8 max-md:grid-cols-2 max-sm:grid-cols-1">
          {programs.map((item) => (
            <Card
              key={item.title}
              className="p-8 relative cursor-pointer group"
            >
              <h3>{item.title}</h3>
              <p className="text-sm text-muted-foreground mt-2">{item.descr}</p>
              <Button
                size={"icon"}
                variant={"ghost"}
                className="absolute top-1/2 right-2 group-hover:translate-x-1 transition-transform"
              >
                <FaArrowRightLong />
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
