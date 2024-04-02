import React, { useState } from "react";
import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableCaption,
} from "./ui/table";
import axios from "axios";
import AnnouncementActionButton from "./AnnouncementActionButton";

const AnnouncementTable = () => {
  const [announcements, setAnnouncements] = useState([]);

  axios
    .get("https://announsync.onrender.com/api/getAllAnnouncements")
    .then((response) => {
      if (Array.isArray(response.data.announcements)) {
        setAnnouncements(response.data.announcements);
      } else {
        console.error("Error fetching announcements", response.data);
      }
    })
    .catch((error) => {
      console.error(error);
    });

  return (
    <div className="pt-5 pb-28 px-5">
      {announcements.length === 0 ? (
        <p className="text-center italic text-gray-500">
          No further announcements
        </p>
      ) : (
        <div>
          <Table>
            <TableCaption>List of Announcements</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="font-bold text-gray-700">
                  Announcement ID
                </TableHead>
                <TableHead className="font-bold text-gray-700">Title</TableHead>
                <TableHead className="font-bold text-gray-700">
                  Description
                </TableHead>
                <TableHead className="font-bold text-gray-700">
                  Posted By
                </TableHead>
                <TableHead className="font-bold text-gray-700">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {announcements.map((announcement) => (
                <TableRow key={announcement._id}>
                  <TableCell className="italic text-gray-500">
                    {announcement._id}
                  </TableCell>
                  <TableCell className="italic text-gray-500 max-w-md truncate">
                    {announcement.title}
                  </TableCell>
                  <TableCell className=" italic text-gray-500 max-w-lg truncate">
                    {announcement.description}
                  </TableCell>
                  <TableCell className="italic text-gray-500">
                    {announcement.postedBy}
                  </TableCell>
                  <TableCell>
                    <AnnouncementActionButton
                      announcementId={announcement._id}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default AnnouncementTable;
