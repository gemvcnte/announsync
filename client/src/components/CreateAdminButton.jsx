import React, { useState, useEffect } from "react";
import axios from "axios";

import {
  Dialog,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
  DialogContent,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const CreateAdminButton = () => {
  const [fullName, setFullName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    generateUserName();
  }, [fullName]);

  const generateUserName = () => {
    const [firstName = "", lastName = ""] = fullName.split(" ");
    const generatedUserName = `${firstName.charAt(0).toLowerCase()}${lastName.charAt(0).toLowerCase()}`;
    setUserName(generatedUserName);
  };

  const createAdmin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/createAdmin",
        {
          fullName,
          emailAddress,
          password,
          userName,
        },
      );

      console.log(response.data.admins);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="w-full flex justify-end px-5 pt-10 pb-5">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Create Admin</Button>
          </DialogTrigger>
          <DialogContent className="min-h-[500px] sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create an Admin User</DialogTitle>
              <DialogDescription className="italic">
                Click <span className="font-bold">Continue</span> to create.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="fullName" className="italic text-right">
                  Full Name:
                </Label>
                <Input
                  type="text"
                  placeholder="Ex. Pola Marzan"
                  id="fullName"
                  onChange={(e) => setFullName(e.target.value)}
                  value={fullName}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="emailAddress" className="text-right italic">
                  Email Address:
                </Label>
                <Input
                  type="email"
                  placeholder="Ex. polamarzan@gmail.com"
                  id="emailAddress"
                  onChange={(e) => setEmailAddress(e.target.value)}
                  value={emailAddress}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="password" className="text-right italic">
                  Password:
                </Label>
                <Input
                  placeholder="••••••••"
                  type="password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  className="col-span-3"
                  min={8}
                  max={16}
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={createAdmin} type="submit">
                Create
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default CreateAdminButton;
