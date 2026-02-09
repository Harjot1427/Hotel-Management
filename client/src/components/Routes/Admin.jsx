import { useState, useEffect } from "react";
import { useAuth } from "../../context/UserContext";
import { Outlet, Navigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../../components/Spinner";

export default function PrivateRoute() {
  const [auth, setauth] = useAuth();
  const [ok, setOk] = useState(false);

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/auth/api/admin-auth`,
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      console.log(res);
      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner />;
}
