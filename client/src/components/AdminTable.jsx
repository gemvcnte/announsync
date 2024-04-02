import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  TableHeader,
  Table,
  TableCaption,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
} from "./ui/table";

import AdminActionButton from "./AdminActionButton";
const AdminTable = () => {
  const [admins, setAdmins] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    axios
      .get("https://announsync.onrender.com/api/getAllAdmins")
      .then((response) => {
        if (Array.isArray(response.data.admins)) {
          setAdmins(response.data.admins);
        } else {
          console.error(error);
        }
      })
      .catch((error) => {
        console.error("Error", error);
      });
  });

  return (
    <div>
      <div className="py-10 px-5">
        {admins.length === 0 ? (
          <p className="text-center italic text-gray-500">No Admins Yet</p>
        ) : (
          <div className="">
            <Table>
              <TableCaption>List of Admins</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-bold text-gray-700">
                    Admin ID
                  </TableHead>
                  <TableHead className="font-bold text-gray-700">
                    Username
                  </TableHead>
                  <TableHead className="font-bold text-gray-700">
                    Full Name
                  </TableHead>
                  <TableHead className="font-bold text-gray-700">
                    Email Address
                  </TableHead>
                  <TableHead className="font-bold text-gray-700">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {admins.map((admin) => (
                  <TableRow key={admin._id}>
                    <TableCell className="text-gray-500 italic">
                      {admin._id}
                    </TableCell>
                    <TableCell className="text-gray-500 italic">
                      {admin.userName}
                    </TableCell>
                    <TableCell className="text-gray-500 italic">
                      {admin.fullName}
                    </TableCell>
                    <TableCell className="text-gray-500 italic">
                      {admin.emailAddress}
                    </TableCell>
                    <TableCell>
                      <AdminActionButton userId={admin._id} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminTable;
