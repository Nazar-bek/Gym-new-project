import { useAuthState } from "@/stores/auth.store";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { useForm } from "react-hook-form";
import  { registerSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import {createUserWithEmailAndPassword} from "firebase/auth"
import { auth } from "@/firebase";
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { RiAlertLine } from "react-icons/ri";
import FillLoading from "../shared/FillLoading";
import { useUserState } from "@/stores/auth.user";
const Register = () => {
  const [isLoading, setIsloading] = useState(false)
  const [isError, setIsError] = useState("")
  const { setAuth } = useAuthState();
  const navigate = useNavigate()
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: ""
    },
  });
    const {setUser} = useUserState()
   const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    setIsloading(true)
      const {email, password} = values
      try {
        const res = await createUserWithEmailAndPassword(auth, email, password)
        setUser(res.user)
        navigate("/")
      } catch (error) {
        const result = error as Error
        setIsError(result.message)
      }finally{
        setIsloading(false)
      }
    };


  return (
    <div className="flex flex-col">
      {
        isLoading && <FillLoading/> 
      }
      <h2 className="font-bold text-xl ">Register</h2>
      <p>
        Already have an account?{" "}
        <span
          className="text-blue-500 cursor-pointer hover:underline"
          onClick={() => setAuth("login")}
        >
          Sign In
        </span>
      </p>
      <Separator className="my-3" />
       {isError && (
        <Alert className="mb-3" variant="destructive">
          <AlertTitle>The Error!</AlertTitle>
          <RiAlertLine/>
          <AlertDescription>
            {isError}
          </AlertDescription>
        </Alert>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input placeholder="example@gmail.com" disabled={isLoading} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <div className="grid grid-cols-2 gap-4 justify-center">
            <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="******" type="password" disabled={isLoading} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input placeholder="******" disabled={isLoading} type="password" {...field} />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
           </div>
          <div className="mt-8">
            <Button type="submit" className="h-12 w-full" disabled={isLoading}>Register</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Register;
