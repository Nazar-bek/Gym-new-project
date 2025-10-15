import { useAuthState } from "@/stores/auth.store";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import Social from "./Social";
import { useForm } from "react-hook-form";
import { loginSchema } from "@/lib/validation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { RiAlertLine } from "react-icons/ri";
import FillLoading from "../shared/FillLoading";

const Login = () => {
  const [isLoading, setIsloading] = useState(false);
  const [isError, setIsError] = useState("");
  const navigate = useNavigate();

  const { setAuth } = useAuthState();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    const { email, password } = values;
     setIsloading(true)
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      console.log(res);
      navigate("/");
    } catch (error) {
      const result = error as Error;
      setIsError(result.message);
    } finally {
      setIsloading(false);
    }
  };
  return (
    <div className="flex flex-col ">
      {
        isLoading && <FillLoading/> 
      }
      <h2 className="font-bold text-xl ">Login</h2>
      <p className="text-muted-foreground">
        Don't have an account?{" "}
        <span
          className="text-blue-500 cursor-pointer hover:underline"
          onClick={() => setAuth("register")}
        >
          Sign Up
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
                  <Input
                    placeholder="example@gmail.com"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="******"
                    type="password"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="mt-2">
            <Button type="submit" disabled={isLoading} className="h-12 w-full">
              Submit
            </Button>
          </div>
        </form>
      </Form>
      <Social />
    </div>
  );
};

export default Login;
