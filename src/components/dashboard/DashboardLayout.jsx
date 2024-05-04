import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import { CONSTANT } from "../../util";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function DashboardLayout() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login", { replace: true });
    }
    const getUser = async () => {
      try {
        const res = await axios.get(`${CONSTANT.BASE_URL}/users/user-info`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data.data.user);
      } catch (error) {
        if (error.response.status === 403) {
          navigate("/login", { replace: true });
        }
        console.log(error);
      }
    };
    getUser();
  }, []);
  return (
    <div className="flex gap-4 flex-col md:flex-row max-w-screen-2xl mx-auto">
      <SideBar user={user} />
      <Outlet />
    </div>
  );
}

export default DashboardLayout;
