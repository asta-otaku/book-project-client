import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import { CONSTANT } from "../../util";
import axios from "axios";

function DashboardLayout() {
  const [name, setName] = useState(null);
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(`${CONSTANT.BASE_URL}/users/user-info`, {
          withCredentials: true,
        });
        const { name } = res.data.userInfo;
        setName(name);
      } catch (error) {
        if (error.response.status === 403) {
          window.location.href = "/login";
        }
        console.log(error);
      }
    };
    getUser();
  }, []);
  return (
    <div className="flex gap-4 flex-col md:flex-row max-w-screen-2xl mx-auto">
      <SideBar name={name} />
      <Outlet />
    </div>
  );
}

export default DashboardLayout;
