import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import "./auth.css";
import React from "react";
import { useForm } from "react-hook-form";
import logo from "../../assets/pngg 1.png"; 

function SigninPage() {
  const form = useForm({
    defaultValues: {
      name: "",
    },
  });
  return (
    <div className="signin-container">
      <section className="inner-signin">
        <h2 className="sign-heading">Login</h2>
        <Form {...form}>
          <form className="sign-form">
          <img src={logo} alt="Logo" className="logo-image" style={{position:"absolute", opacity:"0.1"}}/>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="form-input">
                  <FormLabel className="form-label">Email</FormLabel>
                  <div className="">
                    <FormControl>
                      <Input
                        placeholder="email"
                        {...field}
                        className="signinput"
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="form-input">
                  <FormLabel className="form-label">Password</FormLabel>
                  <div className="">
                    <FormControl>
                      <Input
                        placeholder="password"
                        {...field}
                        className="signinput"
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <p className="forgotten-pass">forgotten password?</p>

            <Button className="sign-button">sign in</Button>
          </form>
        </Form>
      </section>
    </div>
  );
}

export default SigninPage;
