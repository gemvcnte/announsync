import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { IconHttpDelete, IconDots } from "@tabler/icons-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogDescription,
} from "./ui/alert-dialog";

const AnnouncementActionButton = ({ announcementId }) => {
  const [announcements, setAnnouncements] = useState([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  // const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const deleteData = async () => {
    try {
      await axios.delete(
        `http://localhost:5000/api/deleteAnnouncement/${announcementId}`,
      );
    } catch (error) {
      console.error("Error deleting announcement:", error);
    }
  };
  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get(
  //       "http://localhost:5000/admin/getAllAdmins",
  //     );
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  const handleDeleteAnnouncement = () => {
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    setIsDeleteDialogOpen(false);
    deleteData(announcementId);
  };

  const handleCancelDelete = () => {
    setIsDeleteDialogOpen(false);
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="bg-transparent" variant="secondary">
            <IconDots />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[w-32]">
          {/* {announcements.map((announcement) => ( */}
          {/*   <DropdownMenuLabel>{announcement.fullName}</DropdownMenuLabel> */}
          {/* ))} */}
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <div onClick={handleDeleteAnnouncement}>
              <DropdownMenuItem className="gap-5" closeOnClick={false}>
                <IconHttpDelete />
                Delete Announcement
              </DropdownMenuItem>
            </div>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogDescription>
              Are you sure you want to delete this announcement?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleConfirmDelete}>
              Delete
            </AlertDialogAction>
            <AlertDialogAction onClick={handleCancelDelete}>
              Cancel
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
export default AnnouncementActionButton;
