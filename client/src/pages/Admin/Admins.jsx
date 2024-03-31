import React, { useState } from "react";
import AdminNav from "@/components/AdminNavbar";
import CreateAdminButton from "@/components/CreateAdminButton";
import AdminTable from "@/components/AdminTable";
const Admins = () => {
  return (
    <div>
      <AdminNav />
      <CreateAdminButton />
      <AdminTable />
    </div>
  );
};

export default Admins;
