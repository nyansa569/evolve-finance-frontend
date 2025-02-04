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

function ForgotPasswordPage() {
  const form = useForm({
    defaultValues: {
      name: "",
    },
  });
  return (
    <div className="signin-container">
      <section className="inner-signin">
        <h1
          className=""
          style={{
            textAlign: "center",
            fontSize: "1.8rem",
          }}
        >
          Forgot Password
        </h1>
        <Form {...form}>
          <form className="sign-form" style={{
            height:"14rem"
          }}>
            <img
              src={logo}
              alt="Logo"
              className="logo-image"
              style={{ position: "absolute", opacity: "0.1" }}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="form-input">
                  <FormLabel className="form-label" style={{
                    textAlign:"center"
                  }}>Enter your email address to reset password</FormLabel>
                  <div className="">
                    <FormControl>
                      <Input
                        placeholder="username@gmail.com"
                        {...field}
                        className="signinput"
                        style={{
                          textAlign:"center"
                        }}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="sign-button">Submit</Button>
          </form>
        </Form>
      </section>
    </div>
  );
}

export default ForgotPasswordPage;
