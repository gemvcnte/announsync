import React, { useState } from "react";
import AdminNav from "@/components/AdminNavbar";

import AnnouncementTable from "@/components/AnnouncementTable";
import CreateAnnouncementButton from "@/components/CreateAnnouncementButton";

const Announcements = () => {
  return (
    <div>
      <AdminNav />
      <CreateAnnouncementButton />
      <AnnouncementTable />
    </div>
  );
};

export default Announcements;
