import { Button } from "@/components/ui/button";
import {
  Form,
  // FormControl,
  // FormField,
  // FormItem,
  // FormLabel,
  // FormMessage,
} from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
import "./auth.css";
// import React from "react";
import { useForm } from "react-hook-form";
import logo from "../../assets/pngg 1.png";
import iconSuccess from "../../assets/offline_pin.png";

function PasswordChangeSuccess() {
  const form = useForm({
    defaultValues: {
      name: "",
    },
  });
  return (
    <div className="signin-container">
      <section className="inner-signin">
        <Form {...form}>
          <form
            className="sign-form"
            style={{
              height: "21rem",
            }}
          >
            <img
              src={logo}
              alt="Logo"
              className="logo-image"
              style={{ position: "absolute", opacity: "0.1" }}
            />
            <br />
            <img
              src={iconSuccess}
              alt="Logo"
              className="logo-image"
              style={{ width: "300px", margin: "auto" }}
            />
            <p
              style={{
                textAlign: "center",
                fontWeight:'100',
                fontSize:"1.2rem"
              }}
            >
              Password Changed{" "}
            </p>
            <p
              style={{
                textAlign: "center",
                fontWeight:'100',
                fontSize:"1.2rem"
              }}
            >
              Successfully
            </p>

            <br />

            <Button className="sign-button">Sign in</Button>
          </form>
        </Form>
      </section>
    </div>
  );
}

export default PasswordChangeSuccess;
