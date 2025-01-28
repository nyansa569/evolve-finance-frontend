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

function PasswordReset() {
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
          Reset Password
        </h1>
        <Form {...form}>
          <form
            className="sign-form"
            style={{
              height: "19rem",
            }}
          >
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
                  <FormLabel className="form-label">New password</FormLabel>
                  <div className="">
                    <FormControl>
                      <Input
                        placeholder="password"
                        {...field}
                        className="signinput"
                        type="password"
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <br />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="form-input">
                  <FormLabel className="form-label">Confirm password</FormLabel>
                  <div className="">
                    <FormControl>
                      <Input
                        placeholder="password"
                        {...field}
                        className="signinput"
                        type="password"
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <br />
            <Button className="sign-button">Submit</Button>
          </form>
        </Form>
      </section>
    </div>
  );
}

export default PasswordReset;
