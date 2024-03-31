import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const Login = () => {
  const [password, setPassword] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!emailAddress || !password) {
      setError("All fields are required.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/auth/login", {
        emailAddress: emailAddress,
        password: password,
      });

      if (response.status === 200) {
        console.log(response.data);
        navigate("/admin/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setError("Invalid Email address or Password");
      } else {
        setError("An error has been occurred. Please try again later.");
      }

      console.error(error);
    }
  };
  return (
    <div className="flex items-center min-h-screen px-4 sm:px-6 bg-gray-100 ">
      <div className="w-full max-w-md mx-auto space-y-8">
        <form className="space-y-4" onSubmit={handleLogin}>
          <div className="space-y-2">
            <h1 className="text-4xl font-extrabold">Login</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Welcome back admin, Enter your email and password to continue
            </p>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="emailAddress">Email</Label>
              <Input
                id="emailAddress"
                placeholder="Email Address"
                required
                type="email"
                name="emailAddress"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                placeholder="Password"
                required
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </div>
        </form>
        <div className="cursor-default text-center text-sm space-x-1">
          <p className="text-gray-500 dark:text-gray-400">
            Don't have an account?
          </p>
          <p className="pt-2 underline">Contact a nearby admin</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
