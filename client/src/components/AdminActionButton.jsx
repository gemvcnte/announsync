import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { IconUserEdit, IconHttpDelete, IconDots } from "@tabler/icons-react";
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

const AdminActionButton = ({ userId }) => {
  const [admins, setAdmins] = useState([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  // const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const deleteData = async () => {
    try {
      await axios.delete(
        `http://localhost:5000/api/admin/deleteAdmin/${userId}`,
      );
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/admin/getAllAdmins",
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteUser = () => {
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    setIsDeleteDialogOpen(false);
    deleteData(userId);
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
          {admins.map((admin) => (
            <DropdownMenuLabel>{admin.fullName}</DropdownMenuLabel>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <div onClick={handleDeleteUser}>
              <DropdownMenuItem className="gap-5" closeOnClick={false}>
                <IconHttpDelete />
                Delete User
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
              Are you sure you want to delete this user?
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

export default AdminActionButton;
