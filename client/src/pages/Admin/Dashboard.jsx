import React, { useEffect, useState } from "react";
import AdminNav from "@/components/AdminNavbar";
import AdminTable from "@/components/AdminTable";
import AnnouncementTable from "@/components/AnnouncementTable";

const Dashboard = () => {
  return (
    <div>
      <AdminNav />
      <AdminTable />
      <AnnouncementTable />
    </div>
  );
};

export default Dashboard;
