import { useUserState } from "@/stores/auth.user";
import { LogOut, LucideLoader2} from "lucide-react";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { useNavigate } from "react-router-dom";
import { auth } from "@/firebase";
import {CgGym} from "react-icons/cg"
const UserBox = () => {
  const { user , setUser} = useUserState();
  console.log(user);
  if (!user) return <LucideLoader2 className="animate-spin" />;

  const navigate = useNavigate()

  const onLogOut = () => {
    auth.signOut().then(() => {
      setUser(null)
          navigate("/auth")
    })

  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar  className="cursor-pointer uppercase">
          <AvatarImage src={user.photoURL!} />
          <AvatarFallback>{user.email![0]}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-80"
        align="start"
        alignOffset={11}
        forceMount
      >
        <div className="flex flex-col space-y-4 p-2">
          <p className="text-xs font-medium leading-none text-muted-foreground">
            {user.email}
          </p>
          <div className="flex items-center gap-x-2">
            <div className="rounded-md bg-secondary p-1">
              <Avatar className="uppercase">
                <AvatarImage src={user.photoURL!} />
                <AvatarFallback>{user.email![0]}</AvatarFallback>
              </Avatar>  
            </div>
            <div className="space-y-1">
              <p className="line-clamp-1 text-sm">
                {user.displayName ?? user.email}
              </p>
            </div>
          </div>
        </div>
        <DropdownMenuSeparator/> 
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer">
            <CgGym className="w-4 h-4 mr-1"/> Gym  
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => onLogOut()} className="cursor-pointer bg-destructive">
            <LogOut className="w-4 h-4 mr-1"/> Logout
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
      
    </DropdownMenu>
  );
};

export default UserBox;
