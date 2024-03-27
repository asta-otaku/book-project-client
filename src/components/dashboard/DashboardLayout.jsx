import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import { CONSTANT } from "../../util";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function DashboardLayout() {
  const [name, setName] = useState(null);
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
        const { name } = res.data.data.user;
        setName(name);
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
      <SideBar name={name} />
      <Outlet />
    </div>
  );
}

export default DashboardLayout;
