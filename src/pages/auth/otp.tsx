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

function OTPscreen() {
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
          OTP Verification
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
                  <FormLabel className="form-label">
                    <p
                      style={{
                        textAlign: "center",
                       
                      }}
                    >
                      Enter verification code sent to your email
                    </p>
                  </FormLabel>
                  <br />
                  <div className="">
                    <FormControl>
                      <Input
                        placeholder="enter 6 digit code"
                        {...field}
                        className="signinput"
                        type="password"
                        style={{
                          textAlign: "center",
                        }}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <br />

            <Button className="sign-button">Verify</Button>
          </form>
        </Form>
      </section>
    </div>
  );
}

export default OTPscreen;
