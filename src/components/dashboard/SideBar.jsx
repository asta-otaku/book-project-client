import React from "react";
import { Sidebar } from "flowbite-react";
import {
  HiArrowSmRight,
  HiChartPie,
  HiOutlineCloudUpload,
  HiTable,
} from "react-icons/hi";

import toast, { Toaster } from "react-hot-toast";
// import axios from "axios";
// import { CONSTANT } from "../../util";

function SideBar({ name }) {
  const handleLogout = async () => {
    localStorage.removeItem("token");
    toast.success("Sign out Successfully");
    setTimeout(() => window.location.reload(), 2000);
    // try {
    //   const res = await axios.post(`${CONSTANT.BASE_URL}/users/logout`);
    //   if (res.status === 200) {
    //     toast.success("Sign out Successfully");
    //     localStorage.removeItem("token");
    //     window.location.href = "/login";
    //   } else {
    //     toast.error("Failed to sign out");
    //   }
    // } catch (error) {
    //   console.log(error);
    //   toast.error("Failed to sign out");
    // }
  };
  return (
    <Sidebar
      aria-label="Sidebar with content separator example"
      className="md:h-screen"
    >
      <Toaster />
      <Sidebar.Logo href="/">
        <p>{name}</p>
      </Sidebar.Logo>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="/admin/dashboard" icon={HiChartPie}>
            Dashboard
          </Sidebar.Item>
          <Sidebar.Item
            href="/admin/dashboard/upload"
            icon={HiOutlineCloudUpload}
          >
            Upload Book
          </Sidebar.Item>
          <Sidebar.Item href="/login" icon={HiArrowSmRight}>
            Sign In
          </Sidebar.Item>
          <Sidebar.Item icon={HiTable}>
            <button onClick={handleLogout}>Log out</button>
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

export default SideBar;
