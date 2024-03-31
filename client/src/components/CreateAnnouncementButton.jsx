import React, { useState } from "react";
import axios from "axios";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  Dialog,
  DialogTitle,
  DialogFooter,
  DialogHeader,
  DialogContent,
  DialogTrigger,
  DialogDescription,
} from "./ui/dialog";

const CreateAnnouncementButton = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const createAnnouncement = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/createAnnouncement",
        {
          title,
          description,
        },
      );
      console.log(response.data.announcements);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="w-full flex justify-end px-5 pt-10 pb-5">
        <Dialog>
          <DialogTrigger asChild>
            {/* <div><Skeleton /></div> */}
            <Button variant="outline">Create Announcement</Button>
          </DialogTrigger>
          <DialogContent className="min-h-[500px] sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create an Announcement</DialogTitle>
              <DialogDescription className="italic">
                Click <span className="font-bold">Post</span> to create.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="italic text-right">
                  Title:
                </Label>
                <Input
                  maxLength={60}
                  type="text"
                  placeholder="Ex. ITE 335 Quiz"
                  id="title"
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  value={title}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right italic">
                  Description:
                </Label>
                <Input
                  maxLength={255}
                  type="text"
                  required
                  placeholder="Ex. Tomorrow we are going to have a quiz"
                  id="description"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={createAnnouncement} type="submit">
                Post
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default CreateAnnouncementButton;
