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
import * as z from "zod";

function SignupPage() {
  const form = useForm({
    defaultValues: {
      name: "",
      password: z.string().min(6),
      terms: z.boolean(),
    },
  });

  return (
    <div className="signin-container">
      <section className="inner-signin">
        <h2 className="sign-heading">Sign Up</h2>

        <Form {...form}>
          <form className="sign-form">
            <img
              src={logo}
              alt="Logo"
              className="logo-image"
              style={{ position: "absolute", opacity: "0.1", height:"330px" }}
            />
            <div className="user-names">
              {" "}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="form-input">
                    <FormLabel className="form-label">First Name</FormLabel>
                    <div className="">
                      <FormControl>
                        <Input
                          placeholder="first name"
                          {...field}
                          className="signinput nameinput"
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />{" "}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="form-input">
                    <FormLabel className="form-label">Last Name</FormLabel>
                    <div className="">
                      <FormControl>
                        <Input
                          placeholder="last name"
                          {...field}
                          className="signinput nameinput"
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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
            {/* <FormField
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
            /> */}
            <p className="pass-text">Must be 8 characters</p>
            <div className="terms-conditions">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="form-input">
                    <div className="flex items-center gap-2">
                      <FormControl>
                        <input
                          type="checkbox"
                          checked={!!field.value}
                          onChange={(e) => field.onChange(e.target.checked)}
                          className="w-4 h-4"
                        />
                      </FormControl>
                      <FormLabel className="form-label">
                        I agree with the terms and conditions
                      </FormLabel>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button className="sign-button">Sign up</Button>
          </form>
        </Form>
      </section>
    </div>
  );
}

export default SignupPage;
